import { useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

export const useGameLoop = (gameState, playerRef, targetRef, setScore) => {
  const requestRef = useRef();

  const respawnTarget = useCallback(() => {
    const state = gameState.current;
    const maxX = state.container.width - state.target.size - GAME_CONFIG.TARGET.SPAWN_MARGIN;
    const maxY = state.container.height - state.target.size - GAME_CONFIG.TARGET.SPAWN_MARGIN;
    
    state.target.x = Math.random() * (maxX - GAME_CONFIG.TARGET.SPAWN_MARGIN) + GAME_CONFIG.TARGET.SPAWN_MARGIN;
    state.target.y = Math.random() * (maxY - GAME_CONFIG.TARGET.SPAWN_MARGIN) + GAME_CONFIG.TARGET.SPAWN_MARGIN;
  }, [gameState]);

  const updateGame = useCallback(() => {
    const state = gameState.current;
    const { player, target, keys, container } = state;

    // 1. Calcular Direção
    let dx = 0;
    let dy = 0;

    if (keys.w || keys.ArrowUp) dy -= 1;
    if (keys.s || keys.ArrowDown) dy += 1;
    if (keys.a || keys.ArrowLeft) dx -= 1;
    if (keys.d || keys.ArrowRight) dx += 1;

    // 2. Normalizar velocidade (diagonais não são mais rápidas)
    if (dx !== 0 || dy !== 0) {
      const length = Math.sqrt(dx * dx + dy * dy);
      dx = (dx / length) * player.speed;
      dy = (dy / length) * player.speed;
    }

    // 3. Atualizar Posição
    player.x += dx;
    player.y += dy;

    // 4. Limites da Tela
    player.x = Math.max(0, Math.min(player.x, container.width - player.size));
    player.y = Math.max(0, Math.min(player.y, container.height - player.size));

    // 5. Colisão AABB (Axis-Aligned Bounding Box)
    if (
      player.x < target.x + target.size &&
      player.x + player.size > target.x &&
      player.y < target.y + target.size &&
      player.y + player.size > target.y
    ) {
      setScore(s => s + 1);
      respawnTarget();
    }

    // 6. Renderizar (DOM direto para performance)
    if (playerRef.current) {
      playerRef.current.style.transform = `translate(${player.x}px, ${player.y}px)`;
    }
    if (targetRef.current) {
      targetRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, playerRef, targetRef, setScore, respawnTarget]);

  const startLoop = useCallback(() => {
    requestRef.current = requestAnimationFrame(updateGame);
  }, [updateGame]);

  const stopLoop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  }, []);

  return { startLoop, stopLoop, respawnTarget };
};