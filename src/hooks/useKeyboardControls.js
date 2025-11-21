import { useEffect } from 'react';

export const useKeyboardControls = (gameState) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState.current.keys.hasOwnProperty(e.key)) {
        gameState.current.keys[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (gameState.current.keys.hasOwnProperty(e.key)) {
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
