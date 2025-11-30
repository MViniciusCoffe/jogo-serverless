import React, { useState } from 'react';
import { Bestiary } from './Bestiary';
import { Settings } from './Settings';
import { Credits } from './Credits';

export const MainMenu = ({ onStart }) => {
  const [currentMenu, setCurrentMenu] = useState('main'); // 'main', 'bestiary', 'settings', 'credits'

  const handleStart = () => {
    onStart();
  };

  if (currentMenu === 'bestiary') {
    return <Bestiary onBack={() => setCurrentMenu('main')} />;
  }

  if (currentMenu === 'settings') {
    return <Settings onBack={() => setCurrentMenu('main')} />;
  }

  if (currentMenu === 'credits') {
    return <Credits onBack={() => setCurrentMenu('main')} />;
  }

  // Menu Principal
  return (
    <div className="overlay">
      <div className="overlay-content menu-main">
        <div className="menu-header">
          <h1>🛡️ CyberDefense</h1>
          <p className="menu-subtitle">Defenda Sua Rede!</p>
        </div>

        <div className="menu-description">
          <p>
            Você é um <strong>Especialista em Segurança Cibernética</strong>. Sua missão é
            neutralizar ameaças digitais e manter a integridade do sistema.
          </p>
          <div className="menu-instructions">
            <div className="instruction-item">
              <span className="instruction-icon">⌨️</span>
              <span>
                Use <strong>W, A, S, D</strong> ou <strong>Setas</strong> para mover
              </span>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">🛡️</span>
              <span>
                Seu <strong>Firewall</strong> neutraliza ameaças automaticamente
              </span>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">🖥️</span>
              <span>
                <strong>Proteja o Data Center</strong> no centro do mapa!
              </span>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">⭐</span>
              <span>Ganhe conhecimento neutralizando ameaças</span>
            </div>
          </div>
        </div>

        <div className="menu-buttons">
          <button onClick={handleStart} className="btn btn-primary btn-large">
            ▶️ COMEÇAR JOGO
          </button>

          <button onClick={() => setCurrentMenu('bestiary')} className="btn btn-secondary">
            📚 BESTIÁRIO
          </button>

          <button onClick={() => setCurrentMenu('settings')} className="btn btn-secondary">
            ⚙️ OPÇÕES
          </button>

          <button onClick={() => setCurrentMenu('credits')} className="btn btn-secondary">
            ℹ️ CRÉDITOS
          </button>
        </div>

        <div className="menu-footer">
          <p>v1.0.0 | Desenvolvido para Educação em Segurança Cibernética</p>
        </div>
      </div>
    </div>
  );
};
