import { useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';
import { checkAABBCollision, checkCircleCollision, getDistance } from '../utils/collision';

/**
 * Hook que gerencia toda a lógica de detecção de colisão
 * Inclui: player vs enemies, knife vs enemies, enemies vs datacenter
 */
export const useCollisionDetection = (gameState, setScore, setHealth, setDatacenterHealth, setEnemies, onGameOver) => {
  /**
   * Verifica colisões do player com inimigos
   */
  const checkPlayerCollisions = useCallback(
    (enemies, player) => {
      const enemiesToRemove = [];

      enemies.forEach((enemy, index) => {
        if (checkAABBCollision(player, enemy)) {
          enemiesToRemove.push(index);
          setHealth((h) => {
            const newHealth = Math.max(0, h - GAME_CONFIG.ENEMY.DAMAGE);
            if (newHealth <= 0) onGameOver('player');
            return newHealth;
          });
        }
      });

      return enemiesToRemove;
    },
    [setHealth, onGameOver]
  );

  /**
   * Verifica colisões com o data center
   */
  const checkDatacenterCollisions = useCallback(
    (enemies, datacenter) => {
      enemies.forEach((enemy) => {
        if (checkAABBCollision(datacenter, enemy)) {
          const now = Date.now();
          if (now - enemy.lastDamageToDatacenter > GAME_CONFIG.DATA_CENTER.COLLISION_DAMAGE_INTERVAL) {
            setDatacenterHealth((h) => {
              const newHealth = Math.max(0, h - GAME_CONFIG.ENEMY.DATACENTER_DAMAGE);
              if (newHealth <= 0) onGameOver('datacenter');
              return newHealth;
            });
            enemy.lastDamageToDatacenter = now;
          }
        }
      });
    },
    [setDatacenterHealth, onGameOver]
  );

  /**
   * Verifica colisões da faca com inimigos
   */
  const checkKnifeCollisions = useCallback(
    (enemies, knife) => {
      const enemiesToRemove = [];
      const knifeRadius = GAME_CONFIG.KNIFE.HEIGHT / 2;

      enemies.forEach((enemy, index) => {
        const enemyCenterX = enemy.x + enemy.size / 2;
        const enemyCenterY = enemy.y + enemy.size / 2;
        const enemyRadius = enemy.size / 2;

        if (checkCircleCollision(knife.x, knife.y, enemyCenterX, enemyCenterY, knifeRadius + enemyRadius)) {
          const now = Date.now();

          // Respeita o cooldown de dano
          if (now - enemy.lastDamageTime > GAME_CONFIG.KNIFE.DAMAGE_COOLDOWN) {
            enemy.health -= GAME_CONFIG.KNIFE.DAMAGE;
            enemy.lastDamageTime = now;

            // Se morreu, marca para remover
            if (enemy.health <= 0) {
              enemiesToRemove.push(index);
              setScore((s) => s + 10);

              // 10% de chance de dropar moeda
              if (Math.random() < GAME_CONFIG.MONEY.DROP_CHANCE) {
                gameState.current.moneyDrops.push({
                  id: Date.now() + Math.random(),
                  x: enemyCenterX,
                  y: enemyCenterY,
                  value: GAME_CONFIG.MONEY.VALUE,
                });
              }
            }
          }
        }
      });

      return enemiesToRemove;
    },
    [gameState, setScore]
  );

  /**
   * Executa todas as colisões e retorna inimigos para remover
   */
  const handleAllCollisions = useCallback(
    (enemies, player, knife, datacenter) => {
      // Colisões com player
      const playerHits = checkPlayerCollisions(enemies, player);

      // Colisões com data center
      checkDatacenterCollisions(enemies, datacenter);

      // Colisões com faca
      const knifeHits = checkKnifeCollisions(enemies, knife);

      // Combina índices únicos para remover
      const allHitsSet = new Set([...playerHits, ...knifeHits]);
      const indicesToRemove = Array.from(allHitsSet).sort((a, b) => b - a);

      // Remove inimigos mortos (em ordem decrescente para não quebrar índices)
      if (indicesToRemove.length > 0) {
        indicesToRemove.forEach((index) => {
          enemies.splice(index, 1);
        });
        setEnemies([...enemies]);
      }
    },
    [checkPlayerCollisions, checkDatacenterCollisions, checkKnifeCollisions, setEnemies]
  );

  return {
    handleAllCollisions,
    checkPlayerCollisions,
    checkDatacenterCollisions,
    checkKnifeCollisions,
  };
};
