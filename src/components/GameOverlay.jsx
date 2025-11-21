import React from 'react';

export const GameOverlay = ({ onStart, isGameOver, score }) => {
  if (isGameOver) {
    return (
      <div className="overlay">
        <div className="overlay-content game-over">
          <h2>💀 Game Over!</h2>
          <p className="final-score">Pontuação Final: {score}</p>
          <button onClick={onStart} className="btn btn-start">
            JOGAR NOVAMENTE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Pronto para jogar?</h2>
        <p>Use <strong>W, A, S, D</strong> ou <strong>Setas</strong> para mover.</p>
        <p>🔪 <strong>A faca destrói inimigos</strong> e vale 10 pontos!</p>
        <p>⚠️ Cuidado! Inimigos vermelhos <strong>removem 1 vida</strong>!</p>
        <button onClick={onStart} className="btn btn-start">
          COMEÇAR
        </button>
      </div>
    </div>
  );
};