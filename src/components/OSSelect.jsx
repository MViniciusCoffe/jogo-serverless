import React, { useState } from 'react';
import { OPERATING_SYSTEMS } from '../constants/progressionConfig';

/**
 * Componente de seleção de Sistema Operacional
 * Exibe cartas dos SOs disponíveis para a dificuldade escolhida
 */
export const OSSelect = ({ difficulty, onSelect, onBack }) => {
  const [hoveredOS, setHoveredOS] = useState(null);

  // Filtra SOs pela dificuldade selecionada
  const availableOS = Object.values(OPERATING_SYSTEMS).filter(
    (os) => os.difficulty === difficulty.id
  );

  return (
    <div className="os-select-overlay">
      <div className="os-select-container">
        <button className="back-button" onClick={onBack}>
          ← Voltar
        </button>

        <div className="os-select-header">
          <span className="os-difficulty-badge">
            {difficulty.emoji} {difficulty.name}
          </span>
          <h1 className="os-title">Escolha seu Sistema Operacional</h1>
          <p className="os-subtitle">Cada escolha define seu estilo de jogo</p>
        </div>

        <div className="os-cards-container">
          {availableOS.map((os) => (
            <div
              key={os.id}
              className={`os-card ${hoveredOS === os.id ? 'hovered' : ''}`}
              style={{ '--os-color': os.color }}
              onMouseEnter={() => setHoveredOS(os.id)}
              onMouseLeave={() => setHoveredOS(null)}
              onClick={() => onSelect(os)}
            >
              {/* Cabeçalho da carta */}
              <div className="os-card-header">
                <span className="os-icon">{os.icon}</span>
                <h2 className="os-name">{os.name}</h2>
              </div>

              {/* Descrição */}
              <p className="os-description">{os.description}</p>

              {/* Vantagens */}
              <div className="os-section advantages">
                <h3>✅ Vantagens</h3>
                <ul>
                  {os.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>

              {/* Desvantagens */}
              <div className="os-section disadvantages">
                <h3>❌ Desvantagens</h3>
                <ul>
                  {os.disadvantages.map((dis, idx) => (
                    <li key={idx}>{dis}</li>
                  ))}
                </ul>
              </div>

              {/* Flavor text */}
              <p className="os-flavor">{os.flavorText}</p>

              {/* Botão de seleção */}
              <button className="os-select-btn">Instalar {os.name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
