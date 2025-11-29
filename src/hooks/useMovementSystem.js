import { useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';
import { getDirectionVector, getDistance, getCenter } from '../utils/collision';

/**
 * Hook que gerencia todo o movimento de entidades
 * Player, Knife, Enemies
 */
export const useMovementSystem = (gameState) => {
  /**
   * Atualiza posição do player baseado em input
   */
  const updatePlayerMovement = useCallback(() => {
    const { player, keys, container } = gameState.current;

    let dx = 0;
    let dy = 0;

    // Processa input
    if (keys.w || keys.ArrowUp) dy -= 1;
    if (keys.s || keys.ArrowDown) dy += 1;
    if (keys.a || keys.ArrowLeft) dx -= 1;
    if (keys.d || keys.ArrowRight) dx += 1;

    // Normaliza movimento diagonal
    if (dx !== 0 || dy !== 0) {
      const length = Math.sqrt(dx * dx + dy * dy);
      dx = (dx / length) * player.speed;
      dy = (dy / length) * player.speed;
    }

    // Aplica movimento
    player.x += dx;
    player.y += dy;

    // Clamp ao container
    player.x = Math.max(0, Math.min(player.x, container.width - player.size));
    player.y = Math.max(0, Math.min(player.y, container.height - player.size));
  }, [gameState]);

  /**
   * Atualiza rotação e posição da faca
   */
  const updateKnifeMovement = useCallback(() => {
    const { knife, player } = gameState.current;

    // Incrementa ângulo para rotação
    knife.angle += GAME_CONFIG.KNIFE.ROTATION_SPEED;

    // Calcula posição orbital ao redor do player
    const playerCenter = getCenter(player);
    knife.x = playerCenter.x + Math.cos(knife.angle) * GAME_CONFIG.KNIFE.ORBIT_RADIUS;
    knife.y = playerCenter.y + Math.sin(knife.angle) * GAME_CONFIG.KNIFE.ORBIT_RADIUS;
  }, [gameState]);

  /**
   * Atualiza posição de um inimigo
   * Escolhe o alvo mais próximo entre player e data center
   */
  const updateEnemyMovement = useCallback((enemy) => {
    const { player, datacenter, container } = gameState.current;

    const playerCenter = getCenter(player);
    const datacenterCenter = getCenter(datacenter);
    const enemyCenter = getCenter(enemy);

    // Calcula distância até cada alvo
    const distToPlayer = getDistance(enemyCenter.x, enemyCenter.y, playerCenter.x, playerCenter.y);
    const distToDatacenter = getDistance(
      enemyCenter.x,
      enemyCenter.y,
      datacenterCenter.x,
      datacenterCenter.y
    );

    // Escolhe o alvo mais próximo
    let targetX, targetY, distToTarget;
    if (distToPlayer <= distToDatacenter) {
      targetX = playerCenter.x;
      targetY = playerCenter.y;
      distToTarget = distToPlayer;
    } else {
      targetX = datacenterCenter.x;
      targetY = datacenterCenter.y;
      distToTarget = distToDatacenter;
    }

    // Calcula direção
    const direction = getDirectionVector(enemyCenter.x, enemyCenter.y, targetX, targetY);

    // Aplica movimento
    enemy.x += direction.dx * GAME_CONFIG.ENEMY.SPEED;
    enemy.y += direction.dy * GAME_CONFIG.ENEMY.SPEED;

    // Clamp ao container (opcional: deixa sair da tela)
    // enemy.x = Math.max(-enemy.size, Math.min(enemy.x, container.width));
    // enemy.y = Math.max(-enemy.size, Math.min(enemy.y, container.height));
  }, [gameState]);

  /**
   * Atualiza movimento de todos os inimigos
   */
  const updateAllEnemyMovement = useCallback(() => {
    const { enemies } = gameState.current;
    enemies.forEach((enemy) => updateEnemyMovement(enemy));
  }, [gameState, updateEnemyMovement]);

  return {
    updatePlayerMovement,
    updateKnifeMovement,
    updateEnemyMovement,
    updateAllEnemyMovement,
  };
};
