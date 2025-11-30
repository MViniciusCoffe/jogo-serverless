import React, { useState } from 'react';

export const GameHUD = ({
  score,
  health,
  datacenterHealth,
  maxHealth,
  maxDatacenterHealth,
  money,
  level,
  currentXP,
  xpDisplay,
  gameActive,
  onPause,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="game-hud">
      {/* Seção Principal - Sempre visível */}
      <div className="hud-main">
        {/* Coluna Esquerda */}
        <div className="hud-column">
          {/* Nível e XP */}
          <div className="hud-card level-card">
            <div className="card-header">
              <span className="card-icon">📊</span>
              <span className="card-title">Nível {level}</span>
            </div>
            <div className="hud-fill mini">
              <div
                className="hud-bar-fill xp-fill"
                style={{ width: `${xpDisplay?.progress || 0}%` }}
              />
            </div>
            <div className="card-value">{xpDisplay?.progress?.toFixed(0) || 0}%</div>
          </div>

          {/* Integridade do Player */}
          <div className="hud-card health-card">
            <div className="card-header">
              <span className="card-icon">🛡️</span>
              <span className="card-title">Integridade</span>
            </div>
            <div className="hud-fill mini">
              <div
                className="hud-bar-fill health-fill"
                style={{ width: `${(health / maxHealth) * 100}%` }}
              />
            </div>
            <div className="card-value">
              {Math.floor(health)}/{maxHealth}
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="hud-column">
          {/* Data Center */}
          <div className="hud-card datacenter-card">
            <div className="card-header">
              <span className="card-icon">🖥️</span>
              <span className="card-title">Servidor</span>
            </div>
            <div className="hud-fill mini">
              <div
                className="hud-bar-fill datacenter-fill"
                style={{ width: `${(datacenterHealth / maxDatacenterHealth) * 100}%` }}
              />
            </div>
            <div className="card-value">
              {Math.floor(datacenterHealth)}/{maxDatacenterHealth}
            </div>
          </div>

          {/* Conhecimento */}
          <div className="hud-card score-card">
            <div className="card-header">
              <span className="card-icon">📚</span>
              <span className="card-title">Conhecimento</span>
            </div>
            <div className="card-value large">{score}</div>
          </div>
        </div>
      </div>

      {/* Botões Inferiores */}
      <div className="hud-buttons">
        {/* Toggle Detalhes */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`hud-toggle-btn ${showDetails ? 'active' : ''}`}
          title={showDetails ? 'Ocultar detalhes' : 'Mostrar detalhes'}
        >
          {showDetails ? '▼' : '▶'} Detalhes
        </button>

        {/* Botão Pausa */}
        {gameActive && (
          <button onClick={onPause} className="hud-pause-btn">
            ⏸️ PAUSA (P)
          </button>
        )}
      </div>

      {/* Seção Detalhes - Expansível */}
      {showDetails && (
        <div className="hud-details">
          <div className="detail-item">
            <span className="detail-icon">💰</span>
            <span className="detail-label">Moedas:</span>
            <span className="detail-value">{money}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⭐</span>
            <span className="detail-label">XP:</span>
            <span className="detail-value">
              {currentXP}/{xpDisplay?.needed || 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
