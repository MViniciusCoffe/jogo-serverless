import { useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';
import { getDistance, getCenter } from '../utils/collision';

/**
 * Hook que gerencia o sistema de moedas
 * Coleta automática e remoção
 */
export const useMoneySystem = (gameState, setMoney) => {
  /**
   * Atualiza coleta de moedas
   */
  const updateMoneyCollection = useCallback(() => {
    const { player, moneyDrops } = gameState.current;

    const playerCenter = getCenter(player);
    const moneyToRemove = [];

    moneyDrops.forEach((money, index) => {
      // Calcula distância até a moeda
      const distance = getDistance(
        playerCenter.x,
        playerCenter.y,
        money.x,
        money.y
      );

      // Se dentro do raio de coleta
      if (distance < GAME_CONFIG.MONEY.COLLECTION_RADIUS) {
        setMoney((m) => m + money.value);
        moneyToRemove.push(index);
      }
    });

    // Remove moedas coletadas
    if (moneyToRemove.length > 0) {
      moneyToRemove.reverse().forEach((index) => {
        moneyDrops.splice(index, 1);
      });
    }
  }, [gameState, setMoney]);

  return {
    updateMoneyCollection,
  };
};
