import React from 'react';

export const GameArena = ({ 
  containerRef, 
  playerRef, 
  targetRef, 
  gameActive, 
  playerSize, 
  targetSize 
}) => {
  return (
    <div className="game-arena-container" ref={containerRef}>
      {/* Jogador */}
      <div 
        ref={playerRef} 
        className="entity player"
        style={{ width: playerSize, height: playerSize }}
      />
      
      {/* Alvo */}
      <div 
        ref={targetRef} 
        className="entity target"
        style={{ 
          width: targetSize, 
          height: targetSize,
          opacity: gameActive ? 1 : 0 
        }}
      />
    </div>
  );
};