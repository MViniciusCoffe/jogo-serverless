import React, { useState } from 'react';

const MALWARE_DATABASE = [
  {
    id: 1,
    name: 'Malware',
    emoji: '🦠',
    description: 'Software malicioso básico que danifica o sistema',
    threat: 'Alto',
    damage: 95,
  },
  {
    id: 2,
    name: 'Ransomware',
    emoji: '🔐',
    description: 'Criptografa seus dados e exige resgate',
    threat: 'Crítico',
    damage: 95,
  },
  {
    id: 3,
    name: 'Phishing',
    emoji: '🎣',
    description: 'Tenta roubar suas credenciais e informações',
    threat: 'Alto',
    damage: 95,
  },
  {
    id: 4,
    name: 'Trojan',
    emoji: '🐴',
    description: 'Se disfarça de software legítimo',
    threat: 'Crítico',
    damage: 95,
  },
  {
    id: 5,
    name: 'Spyware',
    emoji: '👁️',
    description: 'Monitora suas atividades secretamente',
    threat: 'Médio',
    damage: 95,
  },
  {
    id: 6,
    name: 'Worm',
    emoji: '🌐',
    description: 'Se replica automaticamente pela rede',
    threat: 'Alto',
    damage: 95,
  },
];

export const Bestiary = ({ onBack, defeatedEnemies }) => {
  const [selectedMalware, setSelectedMalware] = useState(null);

  return (
    <div className="overlay">
      <div className="overlay-content bestiary-container">
        <div className="bestiary-header">
          <h2>📚 BESTIÁRIO</h2>
          <p>Tipos de ameaças que você pode enfrentar</p>
        </div>

        {selectedMalware ? (
          <div className="malware-detail">
            <button onClick={() => setSelectedMalware(null)} className="btn-back">
              ← Voltar
            </button>

            <div className="malware-info">
              <div className="malware-emoji">{selectedMalware.emoji}</div>
              <h3>{selectedMalware.name}</h3>
              <p className="malware-description">{selectedMalware.description}</p>

              <div className="malware-stats">
                <div className="stat">
                  <span className="stat-label">Nível de Ameaça:</span>
                  <span
                    className={`stat-value threat-${selectedMalware.threat
                      .toLowerCase()
                      .replace(/\s/g, '-')}`}
                  >
                    {selectedMalware.threat}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Dano:</span>
                  <span className="stat-value">{selectedMalware.damage} HP</span>
                </div>
              </div>

              <div className="malware-tips">
                <h4>💡 Dicas:</h4>
                <ul>
                  <li>Mantenha seu firewall ativo em todo momento</li>
                  <li>Nivel up aumenta sua defesa contra ataques</li>
                  <li>Proteja o data center a todo custo</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="malware-list">
            {MALWARE_DATABASE.map((malware) => (
              <div
                key={malware.id}
                className={`malware-card ${defeatedEnemies.includes(malware.id) ? '' : 'locked'}`}
                onClick={() => defeatedEnemies.includes(malware.id) && setSelectedMalware(malware)}
              >
                <div className="malware-emoji">
                  {defeatedEnemies.includes(malware.id) ? malware.emoji : '❓'}
                </div>
                <div className="malware-card-content">
                  <h4>{defeatedEnemies.includes(malware.id) ? malware.name : '???'}</h4>
                  <p>
                    {defeatedEnemies.includes(malware.id)
                      ? malware.description
                      : 'Derrote este inimigo para desbloquear.'}
                  </p>
                  <span
                    className={`threat-badge ${
                      defeatedEnemies.includes(malware.id)
                        ? `threat-${malware.threat.toLowerCase().replace(/\s/g, '-')}`
                        : 'locked'
                    }`}
                  >
                    {defeatedEnemies.includes(malware.id) ? malware.threat : '???'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onBack} className="btn btn-secondary btn-back-main">
          ← Voltar ao Menu
        </button>
      </div>
    </div>
  );
};
