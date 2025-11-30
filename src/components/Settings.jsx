import React, { useState } from 'react';

export const Settings = ({ onBack }) => {
  const [volume, setVolume] = useState(80);
  const [difficulty, setDifficulty] = useState('normal');
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setFullscreen(false);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content settings-container">
        <div className="settings-header">
          <h2>⚙️ OPÇÕES</h2>
          <p>Personalize sua experiência de jogo</p>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <label htmlFor="volume">🔊 Volume: {volume}%</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="slider"
            />
          </div>

          <div className="setting-group">
            <label htmlFor="difficulty">⚡ Dificuldade:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="select"
            >
              <option value="easy">🟢 Fácil (Inimigos mais lentos)</option>
              <option value="normal">🟡 Normal (Modo padrão)</option>
              <option value="hard">🔴 Difícil (Mais inimigos)</option>
              <option value="nightmare">💀 Pesadelo (Máxima dificuldade)</option>
            </select>
          </div>

          <div className="setting-group">
            <label>
              <input
                type="checkbox"
                checked={fullscreen}
                onChange={handleFullscreen}
                className="checkbox"
              />
              📺 Modo Tela Cheia
            </label>
          </div>

          <div className="setting-group info-box">
            <h4>ℹ️ Informações do Jogo</h4>
            <p>
              <strong>Versão:</strong> 1.0.0
            </p>
            <p>
              <strong>Status:</strong> Beta
            </p>
            <p>
              <strong>Motores:</strong> React 19 + Vite 7.2.4
            </p>
          </div>

          <div className="setting-group controls-box">
            <h4>🎮 Controles</h4>
            <div className="controls-list">
              <div className="control-item">
                <span className="control-key">W / ↑</span>
                <span className="control-action">Mover Para Cima</span>
              </div>
              <div className="control-item">
                <span className="control-key">A / ←</span>
                <span className="control-action">Mover Para Esquerda</span>
              </div>
              <div className="control-item">
                <span className="control-key">S / ↓</span>
                <span className="control-action">Mover Para Baixo</span>
              </div>
              <div className="control-item">
                <span className="control-key">D / →</span>
                <span className="control-action">Mover Para Direita</span>
              </div>
              <div className="control-item">
                <span className="control-key">ESPAÇO</span>
                <span className="control-action">Pausar / Retomar</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={onBack} className="btn btn-secondary">
          ← Voltar ao Menu
        </button>
      </div>
    </div>
  );
};
