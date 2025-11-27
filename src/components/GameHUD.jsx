import React from 'react';

export const GameHUD = ({ score, health, maxHealth, gameActive, onPause }) => {
  return (
    <div className="game-hud">
      <div className="hud-bar health-bar">
        <div className="hud-label">❤️ HP</div>
        <div className="hud-fill">
          <div
            className="hud-bar-fill health-fill"
            style={{ width: `${(health / maxHealth) * 100}%` }}
          />
        </div>
        <div className="hud-value">
          {Math.floor(health)}/{maxHealth}
        </div>
      </div>

      <div className="hud-bar score-bar">
        <div className="hud-label">⭐ SCORE</div>
        <div className="hud-value">{score}</div>
      </div>

      {gameActive && (
        <button onClick={onPause} className="hud-pause-btn">
          ⏸️ PAUSE (P)
        </button>
      )}
    </div>
  );
};
