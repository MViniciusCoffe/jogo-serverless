import { useEffect } from 'react';

export const usePauseKey = (gameActive, onPause) => {
  useEffect(() => {
    if (!gameActive) return;

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        onPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, onPause]);
};
