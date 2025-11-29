import React from 'react';

export const GameHUD = ({
  score,
  health,
  datacenterHealth,
  maxHealth,
  maxDatacenterHealth,
  money,
  gameActive,
  onPause,
}) => {
  return (
    <div className="game-hud">
      <div className="hud-bar money-bar">
        <div className="hud-label">💰 MOEDAS</div>
        <div className="hud-value">{money}</div>
      </div>

      <div className="hud-bar health-bar">
        <div className="hud-label">🛡️ INTEGRIDADE DO PLAYER</div>
        <div className="hud-fill">
          <div
            className="hud-bar-fill health-fill"
            style={{ width: `${(health / maxHealth) * 100}%` }}
          />
        </div>
        <div className="hud-value">
          {Math.floor(health)}/{maxHealth}%
        </div>
      </div>

      <div className="hud-bar datacenter-bar">
        <div className="hud-label">🖥️ DATA CENTER</div>
        <div className="hud-fill">
          <div
            className="hud-bar-fill datacenter-fill"
            style={{ width: `${(datacenterHealth / maxDatacenterHealth) * 100}%` }}
          />
        </div>
        <div className="hud-value">
          {Math.floor(datacenterHealth)}/{maxDatacenterHealth}
        </div>
      </div>

      <div className="hud-bar score-bar">
        <div className="hud-label">📚 CONHECIMENTO</div>
        <div className="hud-value">{score}</div>
      </div>

      {gameActive && (
        <button onClick={onPause} className="hud-pause-btn">
          ⏸️ PAUSA (P)
        </button>
      )}
    </div>
  );
};
