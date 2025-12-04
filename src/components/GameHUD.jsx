import React from 'react';

export const GameHUD = ({
  score,
  health,
  datacenterHealth,
  maxHealth,
  maxDatacenterHealth,
  money,
  level,
  xpDisplay,
  gameActive,
  onPause,
}) => {
  return (
    <div className="game-hud">
      {/* Barra compacta estilo roguelike */}
      <div className="hud-bar">
        {/* HP do Player */}
        <div className="hud-stat">
          <span className="stat-icon">❤️</span>
          <div className="stat-bar health-bar">
            <div
              className="stat-fill health-fill"
              style={{ width: `${(health / maxHealth) * 100}%` }}
            />
          </div>
          <span className="stat-text">{Math.floor(health)}</span>
        </div>

        {/* Servidor */}
        <div className="hud-stat">
          <span className="stat-icon">🖥️</span>
          <div className="stat-bar server-bar">
            <div
              className="stat-fill server-fill"
              style={{ width: `${(datacenterHealth / maxDatacenterHealth) * 100}%` }}
            />
          </div>
          <span className="stat-text">{Math.floor(datacenterHealth)}</span>
        </div>

        {/* Separador */}
        <div className="hud-separator">|</div>

        {/* Nível */}
        <div className="hud-stat level">
          <span className="stat-icon">⭐</span>
          <span className="stat-label">Lv.{level}</span>
          <div className="stat-bar xp-bar">
            <div className="stat-fill xp-fill" style={{ width: `${xpDisplay?.progress || 0}%` }} />
          </div>
        </div>

        {/* Score */}
        <div className="hud-stat score">
          <span className="stat-icon">📚</span>
          <span className="stat-value">{score}</span>
        </div>

        {/* Money */}
        <div className="hud-stat money">
          <span className="stat-icon">💰</span>
          <span className="stat-value gold">{money}</span>
        </div>

        {/* Botão Pausa */}
        {gameActive && (
          <button onClick={onPause} className="hud-pause-btn" title="Pausar (P)">
            ⏸
          </button>
        )}
      </div>
    </div>
  );
};
