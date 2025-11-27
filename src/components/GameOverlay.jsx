import React from 'react';

export const GameOverlay = ({ onStart, isGameOver, score }) => {
  if (isGameOver) {
    return (
      <div className="overlay">
        <div className="overlay-content game-over">
          <h2>🚨 SISTEMA COMPROMETIDO!</h2>
          <p className="final-score">Conhecimento Adquirido: {score} pontos</p>
          <button onClick={onStart} className="btn btn-start">
            INICIAR NOVA DEFESA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>🛡️ CyberDefense - Defenda Sua Rede!</h2>
        <p>
          Você é um <strong>Especialista em Segurança Cibernética</strong>. Sua missão é{' '}
          <strong>neutralizar ameaças digitais</strong> e manter a integridade do sistema.
        </p>
        <p>
          Use <strong>W, A, S, D</strong> ou <strong>Setas</strong> para mover.
        </p>
        <p>
          🛡️ <strong>Seu Escudo (Firewall) neutraliza ameaças automaticamente</strong> ao seu redor!
        </p>
        <p>
          🔴 Cuidado! <strong>Ataques maliciosos</strong> (
          <strong>Malware, Ransomware, Phishing</strong>) <strong>danificam seu sistema</strong>!
        </p>
        <p>⭐ Ganhe conhecimento neutralizando cada ameaça!</p>
        <button onClick={onStart} className="btn btn-start">
          COMEÇAR
        </button>
      </div>
    </div>
  );
};
