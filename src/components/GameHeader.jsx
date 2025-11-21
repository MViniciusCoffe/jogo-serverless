import React from 'react';

export const GameHeader = ({ score, health, maxHealth, darkMode, onToggleTheme }) => {
  return (
    <div className="header">
      <h1 className="game-title">Caçador de Quadrados 2D</h1>
      <div className="header-controls">
        <div className="health-display">
          ❤️ {health}/{maxHealth}
        </div>
        <div className="score-display">Pontos: {score}</div>
        <button onClick={onToggleTheme} className="theme-toggle">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};