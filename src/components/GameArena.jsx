import React from 'react';

export const GameArena = ({ 
  containerRef, 
  playerRef, 
  knifeRef,
  enemiesRef,
  gameActive, 
  playerSize, 
  knifeWidth,
  knifeHeight,
  enemies
}) => {
  return (
    <div className="game-arena-container" ref={containerRef}>
      {/* Jogador */}
      <div 
        ref={playerRef} 
        className="entity player"
        style={{ width: playerSize, height: playerSize }}
      />
      
      {/* Faca Giratória */}
      <div 
        ref={knifeRef} 
        className="entity knife"
        style={{ 
          width: knifeWidth, 
          height: knifeHeight,
          opacity: gameActive ? 1 : 0 
        }}
      />
      
      {/* Inimigos */}
      {gameActive && enemies.map((enemy, index) => (
        <div
          key={enemy.id}
          ref={el => {
            if (enemiesRef.current) {
              enemiesRef.current[index] = el;
            }
          }}
          className="entity enemy"
          style={{
            width: enemy.size,
            height: enemy.size,
            transform: `translate(${enemy.x}px, ${enemy.y}px)`
          }}
        />
      ))}
    </div>
  );
};