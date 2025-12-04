import React from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

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
  datacenterSize,
  enemies,
  moneyDrops,
  gameState,
}) => {
  return (
    <div className="game-arena-container" ref={containerRef}>
      {/* Data Center (Servidor) */}
      <div
        className="entity data-center"
        style={{
          width: datacenterSize,
          height: datacenterSize,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(${gameState.current.datacenter.x}px, ${gameState.current.datacenter.y}px)`,
        }}
      />

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
          <div key={enemy.id}>
            {/* Barra de vida (só aparece se vida < máxima) */}
            {enemy.health < GAME_CONFIG.ENEMY.MAX_HEALTH && (
              <div
                className="enemy-health-bar"
                style={{
                  position: 'absolute',
                  left: enemy.x,
                  top: enemy.y - 8,
                  width: enemy.size,
                  height: 4,
                  backgroundColor: '#222',
                  border: '1px solid #666',
                  borderRadius: '2px',
                }}
              >
                <div
                  className="enemy-health-fill"
                  style={{
                    height: '100%',
                    width: `${(enemy.health / GAME_CONFIG.ENEMY.MAX_HEALTH) * 100}%`,
                    backgroundColor: '#ef4444',
                    borderRadius: '1px',
                  }}
                />
              </div>
            )}

            {/* Inimigo */}
            <div
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
                transform: `translate(${enemy.x}px, ${enemy.y}px)`,
              }}
            />
          </div>
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
