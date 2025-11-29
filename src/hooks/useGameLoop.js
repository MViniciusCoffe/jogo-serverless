import { useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

// 1. Adicionamos setEnemies nos argumentos
export const useGameLoop = (
  gameState,
  playerRef,
  knifeRef,
  enemiesRef,
  setScore,
  setHealth,
  setDatacenterHealth,
  setMoney,
  setEnemies,
  onGameOver
) => {
  const requestRef = useRef();
  const lastSpawnTime = useRef(0);

  const spawnEnemy = useCallback(() => {
    const state = gameState.current;
    const { container, enemies } = state;

    if (enemies.length >= GAME_CONFIG.ENEMY.MAX_ENEMIES) return;

    const side = Math.floor(Math.random() * 4);
    let x, y;

    switch (side) {
      case 0:
        x = Math.random() * container.width;
        y = -GAME_CONFIG.ENEMY.SIZE;
        break;
      case 1:
        x = container.width;
        y = Math.random() * container.height;
        break;
      case 2:
        x = Math.random() * container.width;
        y = container.height;
        break;
      case 3:
        x = -GAME_CONFIG.ENEMY.SIZE;
        y = Math.random() * container.height;
        break;
      default:
        x = 0;
        y = 0;
    }

    enemies.push({
      id: Date.now() + Math.random(),
      x,
      y,
      size: GAME_CONFIG.ENEMY.SIZE,
      health: GAME_CONFIG.ENEMY.HEALTH,
      lastDamageTime: 0, // Para cooldown de dano da espada
      lastDamageToDatacenter: 0, // Para cooldown de dano ao data center
    });

    // 2. IMPORTANTE: Avisa o React para desenhar o novo inimigo
    setEnemies([...enemies]);
  }, [gameState, setEnemies]);

  const updateGame = useCallback(
    (timestamp) => {
      const state = gameState.current;
      const { player, knife, enemies, keys, container } = state;

      // Spawn logic
      if (timestamp - lastSpawnTime.current > GAME_CONFIG.ENEMY.SPAWN_INTERVAL) {
        spawnEnemy();
        lastSpawnTime.current = timestamp;
      }

      // --- Lógica de Movimento (Player, Knife, Enemies) ---
      // (Mantive a lógica de movimento igual para economizar espaço, ela estava correta)

      let dx = 0;
      let dy = 0;
      if (keys.w || keys.ArrowUp) dy -= 1;
      if (keys.s || keys.ArrowDown) dy += 1;
      if (keys.a || keys.ArrowLeft) dx -= 1;
      if (keys.d || keys.ArrowRight) dx += 1;

      if (dx !== 0 || dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / length) * player.speed;
        dy = (dy / length) * player.speed;
      }
      player.x += dx;
      player.y += dy;
      player.x = Math.max(0, Math.min(player.x, container.width - player.size));
      player.y = Math.max(0, Math.min(player.y, container.height - player.size));

      knife.angle += GAME_CONFIG.KNIFE.ROTATION_SPEED;
      const playerCenterX = player.x + player.size / 2;
      const playerCenterY = player.y + player.size / 2;
      knife.x = playerCenterX + Math.cos(knife.angle) * GAME_CONFIG.KNIFE.ORBIT_RADIUS;
      knife.y = playerCenterY + Math.sin(knife.angle) * GAME_CONFIG.KNIFE.ORBIT_RADIUS;

      // Atualizar posição dos inimigos
      const enemiesToRemove = [];
      enemies.forEach((enemy, index) => {
        const playerCenterX = player.x + player.size / 2;
        const playerCenterY = player.y + player.size / 2;
        const datacenterCenterX = gameState.current.datacenter.x + gameState.current.datacenter.size / 2;
        const datacenterCenterY = gameState.current.datacenter.y + gameState.current.datacenter.size / 2;

        // Calcular distância até o player e data center
        const distToPlayerX = playerCenterX - (enemy.x + enemy.size / 2);
        const distToPlayerY = playerCenterY - (enemy.y + enemy.size / 2);
        const distToPlayer = Math.sqrt(distToPlayerX * distToPlayerX + distToPlayerY * distToPlayerY);

        const distToDatacenterX = datacenterCenterX - (enemy.x + enemy.size / 2);
        const distToDatacenterY = datacenterCenterY - (enemy.y + enemy.size / 2);
        const distToDatacenter = Math.sqrt(
          distToDatacenterX * distToDatacenterX + distToDatacenterY * distToDatacenterY
        );

        // Inimigo escolhe o alvo mais próximo (player ou data center)
        let targetX, targetY, distToTarget;
        if (distToPlayer <= distToDatacenter) {
          targetX = distToPlayerX;
          targetY = distToPlayerY;
          distToTarget = distToPlayer;
        } else {
          targetX = distToDatacenterX;
          targetY = distToDatacenterY;
          distToTarget = distToDatacenter;
        }

        if (distToTarget > 0) {
          enemy.x += (targetX / distToTarget) * GAME_CONFIG.ENEMY.SPEED;
          enemy.y += (targetY / distToTarget) * GAME_CONFIG.ENEMY.SPEED;
        }

        // Colisões com o jogador
        if (
          player.x < enemy.x + enemy.size &&
          player.x + player.size > enemy.x &&
          player.y < enemy.y + enemy.size &&
          player.y + player.size > enemy.y
        ) {
          enemiesToRemove.push(index);
          setHealth((h) => {
            const newHealth = Math.max(0, h - GAME_CONFIG.ENEMY.DAMAGE);
            if (newHealth <= 0) onGameOver('player');
            return newHealth;
          });
        }

        // Colisões com o data center
        const datacenter = gameState.current.datacenter;
        if (
          datacenter.x < enemy.x + enemy.size &&
          datacenter.x + datacenter.size > enemy.x &&
          datacenter.y < enemy.y + enemy.size &&
          datacenter.y + datacenter.size > enemy.y
        ) {
          // Inimigo causa dano ao data center a cada intervalo
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

        // Colisões com a faca
        const knifeRadius = GAME_CONFIG.KNIFE.HEIGHT / 2;
        const enemyCenterX = enemy.x + enemy.size / 2;
        const enemyCenterY = enemy.y + enemy.size / 2;
        const enemyRadius = enemy.size / 2;
        const distX = knife.x - enemyCenterX;
        const distY = knife.y - enemyCenterY;

        if (Math.sqrt(distX * distX + distY * distY) < knifeRadius + enemyRadius) {
          const now = Date.now();
          // Só causa dano se passou o cooldown
          if (now - enemy.lastDamageTime > GAME_CONFIG.KNIFE.DAMAGE_COOLDOWN) {
            enemy.health -= GAME_CONFIG.KNIFE.DAMAGE;
            enemy.lastDamageTime = now;

            if (enemy.health <= 0) {
              enemiesToRemove.push(index);
              setScore((s) => s + 10);

              // 10% de chance de dropar dinheiro
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

      // Remover inimigos mortos (filtrando duplicatas)
      if (enemiesToRemove.length > 0) {
        // Criar um Set com índices únicos
        const uniqueIndices = new Set(enemiesToRemove);
        const sortedIndices = Array.from(uniqueIndices).sort((a, b) => b - a);
        sortedIndices.forEach((index) => {
          enemies.splice(index, 1);
        });
        // 3. IMPORTANTE: Avisa o React que inimigos morreram
        setEnemies([...enemies]);
      }

      // --- LÓGICA DE DINHEIRO ---
      const { moneyDrops } = gameState.current;
      const playerCenterX2 = player.x + player.size / 2;
      const playerCenterY2 = player.y + player.size / 2;

      const moneyToRemove = [];
      moneyDrops.forEach((money, index) => {
        // Coleta automática dentro do raio
        const moneyDx = playerCenterX2 - money.x;
        const moneyDy = playerCenterY2 - money.y;
        const moneyDist = Math.sqrt(moneyDx * moneyDx + moneyDy * moneyDy);

        if (moneyDist < GAME_CONFIG.MONEY.COLLECTION_RADIUS) {
          setMoney((m) => m + money.value);
          moneyToRemove.push(index);
        }
      });

      if (moneyToRemove.length > 0) {
        moneyToRemove.reverse().forEach((index) => {
          moneyDrops.splice(index, 1);
        });
      }

      // --- RENDERIZAÇÃO DIRETA (Sem esperar o React) ---
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${player.x}px, ${player.y}px)`;
      }

      if (knifeRef.current) {
        const angleDeg = (knife.angle * 180) / Math.PI + 90;
        knifeRef.current.style.transform = `translate(${knife.x}px, ${knife.y}px) rotate(${angleDeg}deg)`;
      }

      // Atualiza visual dos inimigos
      enemies.forEach((enemy, index) => {
        if (enemiesRef.current[index]) {
          enemiesRef.current[index].style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
        }
      });

      requestRef.current = requestAnimationFrame(updateGame);
    },
    [
      gameState,
      playerRef,
      knifeRef,
      enemiesRef,
      setScore,
      setHealth,
      setDatacenterHealth,
      setMoney,
      setEnemies,
      spawnEnemy,
      onGameOver,
    ]
  );

  const startLoop = useCallback(() => {
    lastSpawnTime.current = performance.now();
    requestRef.current = requestAnimationFrame(updateGame);
  }, [updateGame]);

  const stopLoop = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, []);

  return { startLoop, stopLoop };
};
