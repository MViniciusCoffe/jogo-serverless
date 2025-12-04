import React, { useState, useMemo } from 'react';
import { getAvailableApps, selectRandomApps, RARITY_CONFIG } from '../constants/progressionConfig';

/**
 * Componente de seleção de Apps entre waves
 * Apresenta 3 cartas de aplicativos para o jogador escolher
 */
export const AppSelect = ({
  difficulty,
  selectedOS,
  waveNumber,
  installedApps,
  onSelect,
  onSkip,
}) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [isInstalling, setIsInstalling] = useState(false);

  // Gera 3 apps aleatórios baseado no SO e dificuldade
  const availableApps = useMemo(() => {
    const allApps = getAvailableApps(selectedOS.id, difficulty.id);
    // Remove apps já instalados
    const notInstalled = allApps.filter(
      (app) => !installedApps.some((installed) => installed.id === app.id)
    );
    return selectRandomApps(notInstalled, 3, waveNumber);
  }, [selectedOS, difficulty, waveNumber, installedApps]);

  const handleSelectApp = (app) => {
    setSelectedApp(app);
  };

  const handleInstall = () => {
    if (!selectedApp) return;

    setIsInstalling(true);

    // Animação de instalação
    setTimeout(() => {
      onSelect(selectedApp);
      setIsInstalling(false);
      setSelectedApp(null);
    }, 1000);
  };

  const getRarityStyle = (rarity) => {
    const config = RARITY_CONFIG[rarity];
    return {
      borderColor: config?.color || '#666',
      '--rarity-color': config?.color || '#666',
    };
  };

  return (
    <div className="app-select-overlay">
      <div className="app-select-container">
        <div className="app-select-header">
          <div className="wave-complete-banner">
            <span className="wave-icon">🎉</span>
            <h1>Wave {waveNumber} Completa!</h1>
          </div>
          <p className="app-subtitle">Escolha um aplicativo para instalar</p>
          <div className="installed-count">📱 Apps instalados: {installedApps.length}</div>
        </div>

        <div className="app-cards-container">
          {availableApps.map((app) => (
            <div
              key={app.id}
              className={`app-card ${selectedApp?.id === app.id ? 'selected' : ''} rarity-${app.rarity}`}
              style={getRarityStyle(app.rarity)}
              onClick={() => handleSelectApp(app)}
            >
              {/* Badge de raridade */}
              <div
                className="app-rarity-badge"
                style={{ backgroundColor: RARITY_CONFIG[app.rarity]?.color }}
              >
                {RARITY_CONFIG[app.rarity]?.name}
              </div>

              {/* Ícone */}
              <div className="app-icon">{app.icon}</div>

              {/* Nome */}
              <h2 className="app-name">{app.name}</h2>

              {/* Descrição */}
              <p className="app-description">{app.description}</p>

              {/* Efeitos */}
              <div className="app-effects">
                {Object.entries(app.effects).map(([key, value]) => (
                  <div key={key} className="app-effect">
                    <span className="effect-key">{formatEffectName(key)}</span>
                    <span className={`effect-value ${getEffectClass(key, value)}`}>
                      {formatEffectValue(key, value)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Flavor text */}
              <p className="app-flavor">{app.flavorText}</p>

              {/* Indicador de seleção */}
              {selectedApp?.id === app.id && (
                <div className="app-selected-indicator">✓ Selecionado</div>
              )}
            </div>
          ))}
        </div>

        <div className="app-select-actions">
          <button
            className="app-install-btn"
            disabled={!selectedApp || isInstalling}
            onClick={handleInstall}
          >
            {isInstalling ? (
              <>
                <span className="installing-spinner">⏳</span> Instalando...
              </>
            ) : (
              <>📥 Instalar App</>
            )}
          </button>
          <button className="app-skip-btn" onClick={onSkip}>
            Pular →
          </button>
        </div>
      </div>
    </div>
  );
};

// Helpers para formatar efeitos
const formatEffectName = (key) => {
  const names = {
    damageMultiplier: 'Dano',
    defenseMultiplier: 'Defesa',
    playerSpeed: 'Velocidade',
    maxHealthMultiplier: 'Vida Máx.',
    healthRegen: 'Regen. HP',
    critChance: 'Chance Crítico',
    critDamage: 'Dano Crítico',
    cooldownMultiplier: 'Cooldown',
    xpMultiplier: 'XP',
    attackSpeed: 'Vel. Ataque',
    appSlots: 'Slots de App',
    allStatsBonus: 'Todas Stats',
    enemySpeed: 'Vel. Inimigos',
    spawnRate: 'Taxa Spawn',
    removeDebuffs: 'Remove Debuffs',
    piercing: 'Atravessa',
    cloneCount: 'Clones',
    autoHelper: 'Ajudante Auto',
    teleportCooldown: 'Teleporte',
  };
  return names[key] || key;
};

const formatEffectValue = (key, value) => {
  if (typeof value === 'boolean') return value ? '✓' : '✗';
  if (typeof value === 'number') {
    if (key.includes('Multiplier') || key.includes('Bonus')) {
      const percent = Math.round((value - 1) * 100);
      return percent >= 0 ? `+${percent}%` : `${percent}%`;
    }
    if (key.includes('Duration') || key.includes('Cooldown')) {
      return `${value / 1000}s`;
    }
    if (value > 1) return `+${Math.round((value - 1) * 100)}%`;
    if (value < 1) return `${Math.round((value - 1) * 100)}%`;
    return value.toString();
  }
  return String(value);
};

const getEffectClass = (key, value) => {
  if (typeof value === 'boolean') return value ? 'positive' : 'negative';
  if (typeof value === 'number') {
    // Efeitos onde maior é pior
    const negativeIfHigher = ['cooldownMultiplier', 'spawnRate', 'enemySpeed', 'staminaDrain'];
    if (negativeIfHigher.includes(key)) {
      return value > 1 ? 'negative' : 'positive';
    }
    // Efeitos onde menor é pior
    const negativeIfLower = [
      'damageMultiplier',
      'playerSpeed',
      'defenseMultiplier',
      'maxHealthMultiplier',
    ];
    if (negativeIfLower.includes(key)) {
      return value < 1 ? 'negative' : 'positive';
    }
    return value >= 1 ? 'positive' : 'negative';
  }
  return '';
};
