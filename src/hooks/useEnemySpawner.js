import { useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

/**
 * Hook que gerencia o spawn de inimigos
 * Controla timing e quantidade máxima
 */
export const useEnemySpawner = (gameState, setEnemies) => {
  const lastSpawnTime = useRef(0);

  const spawnEnemy = useCallback(() => {
    const state = gameState.current;
    const { container, enemies } = state;

    // Não spawna se já atingiu o máximo
    if (enemies.length >= GAME_CONFIG.ENEMY.MAX_ENEMIES) return;

    // Escolhe um lado aleatório da tela
    const side = Math.floor(Math.random() * 4);
    let x, y;

    switch (side) {
      case 0: // Topo
        x = Math.random() * container.width;
        y = -GAME_CONFIG.ENEMY.SIZE;
        break;
      case 1: // Direita
        x = container.width;
        y = Math.random() * container.height;
        break;
      case 2: // Embaixo
        x = Math.random() * container.width;
        y = container.height;
        break;
      case 3: // Esquerda
        x = -GAME_CONFIG.ENEMY.SIZE;
        y = Math.random() * container.height;
        break;
      default:
        x = 0;
        y = 0;
    }

    // Tipos de malware (IDs correspondem ao MALWARE_DATABASE no Bestiary)
    const malwareTypes = [
      { type: 1, name: 'Malware' },
      { type: 2, name: 'Ransomware' },
      { type: 3, name: 'Phishing' },
      { type: 4, name: 'Trojan' },
      { type: 5, name: 'Spyware' },
      { type: 6, name: 'Worm' },
    ];

    // Escolhe um tipo aleatório de malware
    const randomMalware = malwareTypes[Math.floor(Math.random() * malwareTypes.length)];

    // Cria novo inimigo
    enemies.push({
      id: Date.now() + Math.random(),
      x,
      y,
      size: GAME_CONFIG.ENEMY.SIZE,
      health: GAME_CONFIG.ENEMY.HEALTH,
      lastDamageTime: 0,
      lastDamageToDatacenter: 0,
      malwareType: randomMalware.type, // Tipo de malware para desbloquear no bestiário
    });

    // Avisa o React para renderizar o novo inimigo
    setEnemies([...enemies]);
  }, [gameState, setEnemies]);

  const checkAndSpawn = useCallback(
    (timestamp) => {
      if (timestamp - lastSpawnTime.current > GAME_CONFIG.ENEMY.SPAWN_INTERVAL) {
        spawnEnemy();
        lastSpawnTime.current = timestamp;
      }
    },
    [spawnEnemy]
  );

  const resetSpawnTime = useCallback(() => {
    lastSpawnTime.current = performance.now();
  }, []);

  return {
    spawnEnemy,
    checkAndSpawn,
    resetSpawnTime,
  };
};
