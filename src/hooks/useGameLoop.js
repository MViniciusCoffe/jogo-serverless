import { useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

export const useGameLoop = (gameState, playerRef, knifeRef, enemiesRef, setScore, setHealth, onGameOver) => {
  const requestRef = useRef();
  const lastSpawnTime = useRef(0);

  const spawnEnemy = useCallback(() => {
    const state = gameState.current;
    const { container, enemies } = state;

    if (enemies.length >= GAME_CONFIG.ENEMY.MAX_ENEMIES) return;

    // Spawn em posição aleatória da borda
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;

    switch(side) {
      case 0: // Top
        x = Math.random() * container.width;
        y = -GAME_CONFIG.ENEMY.SIZE;
        break;
      case 1: // Right
        x = container.width;
        y = Math.random() * container.height;
        break;
      case 2: // Bottom
        x = Math.random() * container.width;
        y = container.height;
        break;
      case 3: // Left
        x = -GAME_CONFIG.ENEMY.SIZE;
        y = Math.random() * container.height;
        break;
    }

    enemies.push({
      id: Date.now() + Math.random(),
      x,
      y,
      size: GAME_CONFIG.ENEMY.SIZE,
    });
  }, [gameState]);

  const updateGame = useCallback((timestamp) => {
    const state = gameState.current;
    const { player, knife, enemies, keys, container } = state;

    // Spawn de inimigos
    if (timestamp - lastSpawnTime.current > GAME_CONFIG.ENEMY.SPAWN_INTERVAL) {
      spawnEnemy();
      lastSpawnTime.current = timestamp;
    }

    // 1. Movimento do Jogador
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

    // Limites da Tela
    player.x = Math.max(0, Math.min(player.x, container.width - player.size));
    player.y = Math.max(0, Math.min(player.y, container.height - player.size));

    // 2. Atualizar Rotação da Faca
    knife.angle += GAME_CONFIG.KNIFE.ROTATION_SPEED;

    const playerCenterX = player.x + player.size / 2;
    const playerCenterY = player.y + player.size / 2;
    
    knife.x = playerCenterX + Math.cos(knife.angle) * GAME_CONFIG.KNIFE.ORBIT_RADIUS;
    knife.y = playerCenterY + Math.sin(knife.angle) * GAME_CONFIG.KNIFE.ORBIT_RADIUS;

    // 3. Atualizar Inimigos (perseguem o jogador)
    const enemiesToRemove = [];

    enemies.forEach((enemy, index) => {
      // Direção para o jogador
      const enemyDx = playerCenterX - (enemy.x + enemy.size / 2);
      const enemyDy = playerCenterY - (enemy.y + enemy.size / 2);
      const distance = Math.sqrt(enemyDx * enemyDx + enemyDy * enemyDy);

      if (distance > 0) {
        enemy.x += (enemyDx / distance) * GAME_CONFIG.ENEMY.SPEED;
        enemy.y += (enemyDy / distance) * GAME_CONFIG.ENEMY.SPEED;
      }

      // Colisão Inimigo-Jogador
      if (
        player.x < enemy.x + enemy.size &&
        player.x + player.size > enemy.x &&
        player.y < enemy.y + enemy.size &&
        player.y + player.size > enemy.y
      ) {
        enemiesToRemove.push(index);
        setHealth(h => {
          const newHealth = h - 1;
          if (newHealth <= 0) {
            onGameOver();
          }
          return newHealth;
        });
      }

      // Colisão Faca-Inimigo
      const knifeRadius = GAME_CONFIG.KNIFE.HEIGHT / 2;
      const enemyCenterX = enemy.x + enemy.size / 2;
      const enemyCenterY = enemy.y + enemy.size / 2;
      const enemyRadius = enemy.size / 2;

      const distX = knife.x - enemyCenterX;
      const distY = knife.y - enemyCenterY;
      const knifeDistance = Math.sqrt(distX * distX + distY * distY);

      if (knifeDistance < knifeRadius + enemyRadius) {
        enemiesToRemove.push(index);
        setScore(s => s + 10); // Destruir inimigo vale 10 pontos
      }
    });

    // Remover inimigos marcados (do final para o início)
    enemiesToRemove.reverse().forEach(index => {
      enemies.splice(index, 1);
    });

    // 4. Renderizar
    if (playerRef.current) {
      playerRef.current.style.transform = `translate(${player.x}px, ${player.y}px)`;
    }

    if (knifeRef.current) {
      const angleDeg = (knife.angle * 180 / Math.PI) + 90;
      knifeRef.current.style.transform = `translate(${knife.x}px, ${knife.y}px) rotate(${angleDeg}deg)`;
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, playerRef, knifeRef, setScore, setHealth, spawnEnemy, onGameOver]);

  const startLoop = useCallback(() => {
    lastSpawnTime.current = performance.now();
    requestRef.current = requestAnimationFrame(updateGame);
  }, [updateGame]);

  const stopLoop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  }, []);

  return { startLoop, stopLoop };
};