import { useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

// 1. Adicionamos setEnemies nos argumentos
export const useGameLoop = (gameState, playerRef, knifeRef, enemiesRef, setScore, setHealth, setEnemies, onGameOver) => {
  const requestRef = useRef();
  const lastSpawnTime = useRef(0);

  const spawnEnemy = useCallback(() => {
    const state = gameState.current;
    const { container, enemies } = state;

    if (enemies.length >= GAME_CONFIG.ENEMY.MAX_ENEMIES) return;

    const side = Math.floor(Math.random() * 4);
    let x, y;

    switch(side) {
      case 0: x = Math.random() * container.width; y = -GAME_CONFIG.ENEMY.SIZE; break;
      case 1: x = container.width; y = Math.random() * container.height; break;
      case 2: x = Math.random() * container.width; y = container.height; break;
      case 3: x = -GAME_CONFIG.ENEMY.SIZE; y = Math.random() * container.height; break;
      default: x = 0; y = 0;
    }

    enemies.push({
      id: Date.now() + Math.random(),
      x,
      y,
      size: GAME_CONFIG.ENEMY.SIZE,
    });
    
    // 2. IMPORTANTE: Avisa o React para desenhar o novo inimigo
    setEnemies([...enemies]); 

  }, [gameState, setEnemies]);

  const updateGame = useCallback((timestamp) => {
    const state = gameState.current;
    const { player, knife, enemies, keys, container } = state;

    // Spawn logic
    if (timestamp - lastSpawnTime.current > GAME_CONFIG.ENEMY.SPAWN_INTERVAL) {
      spawnEnemy();
      lastSpawnTime.current = timestamp;
    }

    // --- Lógica de Movimento (Player, Knife, Enemies) ---
    // (Mantive a lógica de movimento igual para economizar espaço, ela estava correta)
    
    let dx = 0; let dy = 0;
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
      const enemyDx = playerCenterX - (enemy.x + enemy.size / 2);
      const enemyDy = playerCenterY - (enemy.y + enemy.size / 2);
      const distance = Math.sqrt(enemyDx * enemyDx + enemyDy * enemyDy);

      if (distance > 0) {
        enemy.x += (enemyDx / distance) * GAME_CONFIG.ENEMY.SPEED;
        enemy.y += (enemyDy / distance) * GAME_CONFIG.ENEMY.SPEED;
      }

      // Colisões
      if (
        player.x < enemy.x + enemy.size && player.x + player.size > enemy.x &&
        player.y < enemy.y + enemy.size && player.y + player.size > enemy.y
      ) {
        enemiesToRemove.push(index);
        setHealth(h => {
          const newHealth = h - 1;
          if (newHealth <= 0) onGameOver();
          return newHealth;
        });
      }

      const knifeRadius = GAME_CONFIG.KNIFE.HEIGHT / 2;
      const enemyCenterX = enemy.x + enemy.size / 2;
      const enemyCenterY = enemy.y + enemy.size / 2;
      const enemyRadius = enemy.size / 2;
      const distX = knife.x - enemyCenterX;
      const distY = knife.y - enemyCenterY;
      
      if (Math.sqrt(distX * distX + distY * distY) < knifeRadius + enemyRadius) {
        enemiesToRemove.push(index);
        setScore(s => s + 10);
      }
    });

    // Remover inimigos mortos
    if (enemiesToRemove.length > 0) {
      enemiesToRemove.reverse().forEach(index => {
        enemies.splice(index, 1);
      });
      // 3. IMPORTANTE: Avisa o React que inimigos morreram
      setEnemies([...enemies]); 
    }

    // --- RENDERIZAÇÃO DIRETA (Sem esperar o React) ---
    if (playerRef.current) {
      playerRef.current.style.transform = `translate(${player.x}px, ${player.y}px)`;
    }

    if (knifeRef.current) {
      const angleDeg = (knife.angle * 180 / Math.PI) + 90;
      knifeRef.current.style.transform = `translate(${knife.x}px, ${knife.y}px) rotate(${angleDeg}deg)`;
    }

    // Atualiza visual dos inimigos
    enemies.forEach((enemy, index) => {
      if (enemiesRef.current[index]) {
        enemiesRef.current[index].style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
      }
    });

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, playerRef, knifeRef, enemiesRef, setScore, setHealth, setEnemies, spawnEnemy, onGameOver]);

  const startLoop = useCallback(() => {
    lastSpawnTime.current = performance.now();
    requestRef.current = requestAnimationFrame(updateGame);
  }, [updateGame]);

  const stopLoop = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, []);

  return { startLoop, stopLoop };
};