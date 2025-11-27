import React from 'react';

export const GameArena = ({
  containerRef,
  playerRef,
  knifeRef,
  enemiesRef,
  moneyRef,
  gameActive,
  playerSize,
  knifeWidth,
  knifeHeight,
  enemies,
  moneyDrops,
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
          opacity: gameActive ? 1 : 0,
        }}
      />

      {/* Inimigos */}
      {gameActive &&
        enemies.map((enemy, index) => (
          <div
            key={enemy.id}
            ref={(el) => {
              // Garante que o array de refs não fique com buracos
              if (enemiesRef.current) {
                enemiesRef.current[index] = el;
              }
            }}
            className="entity enemy"
            style={{
              width: enemy.size,
              height: enemy.size,
              position: 'absolute', // Garanta que tem position absolute no CSS ou aqui
              left: 0,
              top: 0,
              // REMOVA O TRANSFORM DAQUI.
              // Deixe o useGameLoop definir o transform.
              // Se quiser uma posição inicial para não piscar no canto (0,0), use:
              transform: `translate(${enemy.x}px, ${enemy.y}px)`,
            }}
          />
        ))}

      {/* Moedas */}
      {gameActive &&
        moneyDrops.map((money, index) => (
          <div
            key={money.id}
            ref={(el) => {
              if (moneyRef.current) {
                moneyRef.current[index] = el;
              }
            }}
            className="entity money"
            style={{
              width: 12,
              height: 12,
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate(${money.x}px, ${money.y}px)`,
            }}
          />
        ))}
    </div>
  );
};
