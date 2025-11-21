import React from 'react';

export const GameOverlay = ({ onStart }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Pronto para jogar?</h2>
        <p>Use <strong>W, A, S, D</strong> ou <strong>Setas</strong> para mover.</p>
        <p>Apanhe os alvos vermelhos!</p>
        <button onClick={onStart} className="btn btn-start">
          COMEÇAR
        </button>
      </div>
    </div>
  );
};