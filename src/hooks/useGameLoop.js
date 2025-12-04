import { useRef, useCallback } from 'react';
import { useEnemySpawner } from './useEnemySpawner';
import { useCollisionDetection } from './useCollisionDetection';
import { useMovementSystem } from './useMovementSystem';
import { useMoneySystem } from './useMoneySystem';
import { renderPlayer, renderKnife, renderEnemies } from '../utils/domRenderer';

/**
 * Hook principal do game loop
 * Orquestra todos os sistemas do jogo
 */
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
  addXP,
  getLevelStats,
  onGameOver,
  onEnemyDefeated,
  onWaveChange // Callback para notificar mudança de onda
) => {
  const requestRef = useRef();

  // Inicializa subsistemas
  const { checkAndSpawn, resetSpawnTime, getCurrentWave, getWaveNumber, getWaveTimeRemaining } =
    useEnemySpawner(gameState, setEnemies, onWaveChange);
  const { handleAllCollisions } = useCollisionDetection(
    gameState,
    setScore,
    setHealth,
    setDatacenterHealth,
    setEnemies,
    addXP,
    getLevelStats,
    onGameOver,
    onEnemyDefeated
  );
  const { updatePlayerMovement, updateKnifeMovement, updateAllEnemyMovement } =
    useMovementSystem(gameState);
  const { updateMoneyCollection } = useMoneySystem(gameState, setMoney);

  /**
   * Loop principal do jogo
   * Executa a ~60 FPS
   */
  const updateGame = useCallback(
    (timestamp) => {
      const state = gameState.current;
      const { player, knife, enemies, datacenter } = state;

      // 1. Spawn de novos inimigos a cada intervalo
      checkAndSpawn(timestamp);

      // 2. Atualiza movimento de todas as entidades
      updatePlayerMovement();
      updateKnifeMovement();
      updateAllEnemyMovement();

      // 3. Detecta todas as colisões (passa o nível atual)
      handleAllCollisions(enemies, player, knife, datacenter, gameState.current.level);

      // 4. Atualiza coleta de moedas
      updateMoneyCollection();

      // 5. Renderiza elementos no DOM (sem passar pelo React)
      renderPlayer(playerRef, player);
      renderKnife(knifeRef, knife);
      renderEnemies(enemiesRef, enemies);

      // Continua o loop
      requestRef.current = requestAnimationFrame(updateGame);
    },
    [
      gameState,
      playerRef,
      knifeRef,
      enemiesRef,
      checkAndSpawn,
      updatePlayerMovement,
      updateKnifeMovement,
      updateAllEnemyMovement,
      handleAllCollisions,
      updateMoneyCollection,
    ]
  );

  const startLoop = useCallback(() => {
    resetSpawnTime();
    requestRef.current = requestAnimationFrame(updateGame);
  }, [updateGame, resetSpawnTime]);

  const stopLoop = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, []);

  return {
    startLoop,
    stopLoop,
    getCurrentWave,
    getWaveNumber,
    getWaveTimeRemaining,
  };
};
