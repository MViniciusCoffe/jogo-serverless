import React from 'react';

export const Credits = ({ onBack }) => {
  return (
    <div className="overlay">
      <div className="overlay-content credits-container">
        <div className="credits-header">
          <h2>ℹ️ CRÉDITOS</h2>
        </div>

        <div className="credits-content">
          <section className="credit-section">
            <h3>🎮 Sobre o Jogo</h3>
            <p>
              <strong>CyberDefense</strong> é um jogo educativo desenvolvido para ensinar conceitos
              fundamentais de segurança cibernética de forma divertida e interativa.
            </p>
          </section>

          <section className="credit-section">
            <h3>👨‍💻 Desenvolvimento</h3>
            <p>
              <strong>Desenvolvedor:</strong> Marcus Vinicius
              <br />
              <strong>Plataforma:</strong> Web (React + Vite)
              <br />
              <strong>Ano:</strong> 2025
            </p>
          </section>

          <section className="credit-section">
            <h3>🛠️ Tecnologias</h3>
            <ul>
              <li>⚛️ React 19 - Biblioteca de Interface</li>
              <li>⚡ Vite 7.2.4 - Build Tool</li>
              <li>🎨 CSS3 - Styling e Animações</li>
              <li>📦 Node.js - Ambiente de Desenvolvimento</li>
            </ul>
          </section>

          <section className="credit-section">
            <h3>📚 Conceitos Abordados</h3>
            <ul>
              <li>🦠 Tipos de Malware (Vírus, Trojan, Ransomware, etc)</li>
              <li>🛡️ Firewalls e Defesa de Perímetro</li>
              <li>🖥️ Infraestrutura Crítica (Data Centers)</li>
              <li>📊 Resposta a Incidentes</li>
              <li>📈 Gamificação em Educação</li>
            </ul>
          </section>

          <section className="credit-section">
            <h3>🎓 Propósito Educacional</h3>
            <p>
              Este jogo foi criado como ferramenta educacional para apresentar tópicos de segurança
              cibernética de forma acessível e engajante. Os conceitos são simplificados para fins
              didáticos.
            </p>
          </section>

          <section className="credit-section">
            <h3>🚀 Roadmap Futuro</h3>
            <ul>
              <li>🎵 Efeitos Sonoros e Música de Fundo</li>
              <li>🏆 Sistema de Pontuação Global</li>
              <li>🌍 Multiplayer Online</li>
              <li>📱 Versão Mobile</li>
              <li>🎨 Mais Temas Visuais</li>
            </ul>
          </section>

          <section className="credit-section footer-section">
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              © 2025 CyberDefense. Desenvolvido com ❤️ para Educação em Segurança Cibernética.
            </p>
          </section>
        </div>

        <button onClick={onBack} className="btn btn-secondary">
          ← Voltar ao Menu
        </button>
      </div>
    </div>
  );
};
