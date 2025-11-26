import { useEffect } from 'react';

export const useKeyboardControls = (gameState) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (Object.prototype.hasOwnProperty.call(gameState.current.keys, e.key)) {
        gameState.current.keys[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (Object.prototype.hasOwnProperty.call(gameState.current.keys, e.key)) {
        gameState.current.keys[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);
};
