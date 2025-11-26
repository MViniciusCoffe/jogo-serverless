import React from 'react';

export const GameHUD = ({
  score,
  health,
  maxHealth,
  darkMode,
  onToggleTheme,
  gameActive,
  onPause,
}) => {
  return (
    <div className="game-hud">
      <div className="hud-content">
        <div className="hud-stat">
          <span className="hud-label">❤️</span>
          <span>
            {health}/{maxHealth}
          </span>
        </div>
        <div className="hud-stat">
          <span className="hud-label">⭐</span>
          <span>{score}</span>
        </div>
        <button onClick={onToggleTheme} className="hud-button theme-toggle">
          {darkMode ? '☀️' : '🌙'}
        </button>
        {gameActive && (
          <button onClick={onPause} className="hud-button">
            ⏸️ P
          </button>
        )}
      </div>
    </div>
  );
};
