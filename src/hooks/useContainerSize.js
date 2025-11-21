import { useEffect } from 'react';

export const useContainerSize = (containerRef, gameState) => {
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        gameState.current.container = { width: clientWidth, height: clientHeight };
      }
    };

    // Configuração inicial
    handleResize();
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, gameState]);
};
