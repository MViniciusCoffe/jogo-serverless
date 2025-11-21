import React from 'react';

export const GameFooter = ({ gameActive, onStop }) => {
  return (
    <div className="controls-footer">
      {gameActive && (
        <button onClick={onStop} className="btn btn-secondary">
          Pausar Jogo
        </button>
      )}
      <p className="hint">
        Dica: O movimento diagonal é normalizado para velocidade constante.
      </p>
    </div>
  );
};