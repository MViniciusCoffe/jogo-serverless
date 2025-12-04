import React from 'react';
import { DIFFICULTIES } from '../constants/progressionConfig';

/**
 * Componente de seleção de dificuldade
 * Apresenta as 4 dificuldades como opções clicáveis
 */
export const DifficultySelect = ({ onSelect }) => {
  const difficulties = Object.values(DIFFICULTIES);

  return (
    <div className="difficulty-select-overlay">
      <div className="difficulty-select-container">
        <h1 className="difficulty-title">Escolha seu Sistema</h1>
        <p className="difficulty-subtitle">Cada plataforma oferece desafios únicos</p>

        <div className="difficulty-grid">
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              className={`difficulty-card difficulty-${diff.id}`}
              onClick={() => onSelect(diff)}
            >
              <div className="difficulty-emoji">{diff.emoji}</div>
              <h2 className="difficulty-name">{diff.name}</h2>
              <p className="difficulty-desc">{diff.description}</p>

              <div className="difficulty-stats">
                <div className="diff-stat">
                  <span className="diff-stat-label">Inimigos</span>
                  <span className="diff-stat-value">
                    {diff.multipliers.enemyHealth <= 0.8
                      ? '😊 Fracos'
                      : diff.multipliers.enemyHealth <= 1.0
                        ? '😐 Normal'
                        : diff.multipliers.enemyHealth <= 1.5
                          ? '😤 Fortes'
                          : '💀 Brutais'}
                  </span>
                </div>
                <div className="diff-stat">
                  <span className="diff-stat-label">Dinheiro</span>
                  <span className="diff-stat-value">
                    {diff.multipliers.moneyDrop >= 1.3
                      ? '💰 Abundante'
                      : diff.multipliers.moneyDrop >= 1.0
                        ? '🪙 Normal'
                        : diff.multipliers.moneyDrop >= 0.7
                          ? '💸 Escasso'
                          : '🚫 Raro'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
