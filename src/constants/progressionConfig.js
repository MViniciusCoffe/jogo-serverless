/**
 * Sistema de Progressão Roguelike
 * Inspirado em Hades e Vampire Survivors
 */

// Níveis de dificuldade e seus sistemas operacionais
export const DIFFICULTIES = {
  EASY: {
    id: 'easy',
    name: 'Console de Joguinhos',
    emoji: '🎮',
    description: 'Para quem quer se divertir sem estresse',
    multipliers: {
      enemyHealth: 0.7,
      enemySpeed: 0.8,
      enemyDamage: 0.6,
      spawnRate: 0.7,
      moneyDrop: 1.5,
    },
  },
  MEDIUM: {
    id: 'medium',
    name: 'Celular',
    emoji: '📱',
    description: 'Desafio moderado para o dia a dia',
    multipliers: {
      enemyHealth: 1.0,
      enemySpeed: 1.0,
      enemyDamage: 1.0,
      spawnRate: 1.0,
      moneyDrop: 1.0,
    },
  },
  HARD: {
    id: 'hard',
    name: 'Computador',
    emoji: '💻',
    description: 'Para quem gosta de um bom desafio',
    multipliers: {
      enemyHealth: 1.3,
      enemySpeed: 1.2,
      enemyDamage: 1.3,
      spawnRate: 1.3,
      moneyDrop: 0.8,
    },
  },
  INSANE: {
    id: 'insane',
    name: 'Servidor',
    emoji: '🖥️',
    description: 'Apenas para os mais dedicados',
    multipliers: {
      enemyHealth: 1.8,
      enemySpeed: 1.4,
      enemyDamage: 1.6,
      spawnRate: 1.6,
      moneyDrop: 0.6,
    },
  },
};

// Sistemas Operacionais por dificuldade
export const OPERATING_SYSTEMS = {
  // === EASY - Consoles ===
  NINTENDO: {
    id: 'nintendo',
    name: 'Nintendista',
    difficulty: 'easy',
    icon: '🍄',
    color: '#e60012',
    description: 'O charme dos clássicos em sua defesa',
    advantages: [
      'Inimigos mais previsíveis',
      '+15% de velocidade de movimento',
      'Power-ups duram mais tempo',
    ],
    disadvantages: ['Menos dano base', 'Upgrades limitados'],
    flavorText: '"It\'s-a me, Defensor!"',
    effects: {
      playerSpeed: 1.15,
      damageMultiplier: 0.85,
      powerUpDuration: 1.5,
      enemyPredictability: 1.3,
    },
  },
  XBOX: {
    id: 'xbox',
    name: 'Caixista',
    difficulty: 'easy',
    icon: '🟢',
    color: '#107c10',
    description: 'Força bruta e conquistas épicas',
    advantages: ['+20% de dano', 'Conquistas dão bônus de XP', 'Ataques em área maiores'],
    disadvantages: ['Velocidade reduzida', 'Maior custo de energia'],
    flavorText: '"Achievement Unlocked: Sobrevivência"',
    effects: {
      damageMultiplier: 1.2,
      xpBonus: 1.25,
      areaMultiplier: 1.3,
      playerSpeed: 0.9,
      energyCost: 1.2,
    },
  },
  PLAYSTATION: {
    id: 'playstation',
    name: 'Sonysta',
    difficulty: 'easy',
    icon: '🔵',
    color: '#003087',
    description: 'Exclusividade e qualidade premium',
    advantages: ['Habilidades exclusivas', '+10% defesa', 'Regeneração lenta constante'],
    disadvantages: ['Menos compatibilidade com apps', 'Preços mais altos'],
    flavorText: '"Greatness Awaits... se você sobreviver"',
    effects: {
      defenseMultiplier: 1.1,
      healthRegen: 0.5, // HP por segundo
      appCompatibility: 0.7,
      upgradeCost: 1.3,
    },
  },

  // === MEDIUM - Celular ===
  ANDROID: {
    id: 'android',
    name: 'Android',
    difficulty: 'medium',
    icon: '🤖',
    color: '#3ddc84',
    description: 'Liberdade total, mas com riscos',
    advantages: [
      'Altíssima customização',
      'Apps mais baratos (-30%)',
      'Drop de melhorias mais variado',
    ],
    disadvantages: ['Cooldowns 20% maiores', 'Chance de vírus (debuffs leves)'],
    flavorText: '"Liberdade demais pode ser perigosa…"',
    effects: {
      appCost: 0.7,
      appVariety: 1.5,
      cooldownMultiplier: 1.2,
      virusChance: 0.05, // 5% por wave
    },
  },
  IOS: {
    id: 'ios',
    name: 'iOS',
    difficulty: 'medium',
    icon: '🍎',
    color: '#555555',
    description: 'Funciona. Sempre. Mas vai custar caro.',
    advantages: ['Maior estabilidade', 'Regeneração de vida constante', 'Dano consistente'],
    disadvantages: ['Upgrades custam 40% mais', 'Menos opções de apps'],
    flavorText: '"Funciona. Sempre. Mas vai custar caro."',
    effects: {
      healthRegen: 1.0,
      damageConsistency: 0.9, // menos variação no dano
      upgradeCost: 1.4,
      appVariety: 0.6,
    },
  },

  // === HARD - Computador ===
  WINDOWS: {
    id: 'windows',
    name: 'Windows',
    difficulty: 'hard',
    icon: '🪟',
    color: '#00a4ef',
    description: 'Compatível com tudo, inclusive problemas',
    advantages: ['Compatibilidade elevada (+15% dano a todos)', 'Alta taxa de crítico (+25%)'],
    disadvantages: ['Chance de "travada" (perde velocidade temporariamente)'],
    flavorText: '"Se travar, é só reiniciar."',
    effects: {
      damageMultiplier: 1.15,
      critChance: 0.25,
      freezeChance: 0.03, // 3% chance por segundo
      freezeDuration: 2000, // 2 segundos
    },
  },
  LINUX: {
    id: 'linux',
    name: 'Linux',
    difficulty: 'hard',
    icon: '🐧',
    color: '#fcc624',
    description: 'Performance extrema para quem domina o terminal',
    advantages: ['Performance extrema (+20% velocidade)', 'Upgrades 40% mais baratos'],
    disadvantages: ['Poucos apps disponíveis', 'Depende de sinergias técnicas'],
    flavorText: '"Com grandes poderes vêm grandes linhas de comando."',
    effects: {
      playerSpeed: 1.2,
      defenseMultiplier: 1.15,
      upgradeCost: 0.6,
      appVariety: 0.4,
      synergyBonus: 1.5,
    },
  },
  MACOS: {
    id: 'macos',
    name: 'macOS',
    difficulty: 'hard',
    icon: '🍏',
    color: '#a3aaae',
    description: 'Bonito, limpo e caro',
    advantages: ['Ótima estabilidade', 'Dano base +25%', 'Skills recarregam 20% mais rápido'],
    disadvantages: ['Menos compatibilidade', 'Custo de upgrades +50%'],
    flavorText: '"Bonito, limpo e caro."',
    effects: {
      damageMultiplier: 1.25,
      cooldownMultiplier: 0.8,
      appCompatibility: 0.6,
      upgradeCost: 1.5,
    },
  },

  // === INSANE - Servidor ===
  UBUNTU_SERVER: {
    id: 'ubuntu_server',
    name: 'Ubuntu Server',
    difficulty: 'insane',
    icon: '🟠',
    color: '#e95420',
    description: 'Estabilidade acima de tudo',
    advantages: ['Performance constante', '+50% vida máxima', 'Inimigos mais previsíveis'],
    disadvantages: ['Menos dano explosivo (-30% crítico)'],
    flavorText: '"Nunca desligado desde 2016."',
    effects: {
      maxHealthMultiplier: 1.5,
      enemyPredictability: 1.5,
      critChance: -0.3,
      critDamage: 0.7,
    },
  },
  WINDOWS_SERVER: {
    id: 'windows_server',
    name: 'Windows Server',
    difficulty: 'insane',
    icon: '🏢',
    color: '#0078d4',
    description: 'Poder corporativo em escala',
    advantages: ['Altíssimo dano a hordas (+40%)', 'Melhor escalonamento por wave'],
    disadvantages: ['Alto consumo de recursos (stamina drena mais rápido)'],
    flavorText: '"Por favor não reinicie agora."',
    effects: {
      hordeDamageMultiplier: 1.4,
      waveScaling: 1.3,
      staminaDrain: 1.5,
    },
  },
  DEBIAN: {
    id: 'debian',
    name: 'Debian',
    difficulty: 'insane',
    icon: '🌀',
    color: '#a80030',
    description: 'Estável como uma rocha',
    advantages: ['+30% defesa', 'Imune a debuffs aleatórios', 'Regeneração de escudo'],
    disadvantages: ['Menos variedade de apps', 'Dano base reduzido'],
    flavorText: '"Estável desde antes de você nascer."',
    effects: {
      defenseMultiplier: 1.3,
      debuffImmunity: true,
      shieldRegen: 2.0,
      damageMultiplier: 0.85,
      appVariety: 0.3,
    },
  },
  REDHAT: {
    id: 'redhat',
    name: 'Red Hat Enterprise',
    difficulty: 'insane',
    icon: '🎩',
    color: '#ee0000',
    description: 'Suporte empresarial de elite',
    advantages: ['Suporte técnico (revive 1x por run)', '+20% a todas as stats', 'XP dobrado'],
    disadvantages: ['Apps custam o triplo', 'Menos flexibilidade'],
    flavorText: '"Quando cair, ligue para o suporte."',
    effects: {
      reviveCount: 1,
      allStatsBonus: 1.2,
      xpMultiplier: 2.0,
      appCost: 3.0,
      appVariety: 0.5,
    },
  },
};

// Banco de dados de Apps por plataforma
export const APPS_DATABASE = {
  // === APPS UNIVERSAIS ===
  universal: [
    {
      id: 'antivirus_basic',
      name: 'Antivírus Básico',
      icon: '🛡️',
      rarity: 'common',
      description: 'Proteção essencial',
      effects: { defenseMultiplier: 1.1 },
      flavorText: '"Melhor que nada."',
    },
    {
      id: 'energy_drink',
      name: 'Energético Digital',
      icon: '⚡',
      rarity: 'common',
      description: '+15% velocidade por 30s após cada wave',
      effects: { speedBoost: 1.15, speedBoostDuration: 30000 },
      flavorText: '"Taurina virtual incluída."',
    },
    {
      id: 'backup_cloud',
      name: 'Backup na Nuvem',
      icon: '☁️',
      rarity: 'rare',
      description: 'Salva 50% da vida ao morrer (1x)',
      effects: { deathSave: true, deathSaveHealth: 0.5 },
      flavorText: '"Seus dados estão seguros... mais ou menos."',
    },
  ],

  // === APPS ANDROID ===
  android: [
    {
      id: 'apk_duvidoso',
      name: 'APK Duvidoso',
      icon: '📦',
      rarity: 'common',
      description: 'Risco calculado',
      effects: { playerSpeed: 1.2, maxHealthMultiplier: 0.85 },
      flavorText: '"Baixado de um site .ru muito confiável."',
    },
    {
      id: 'limpador_ram',
      name: 'Limpador de RAM',
      icon: '🧹',
      rarity: 'uncommon',
      description: 'Remove debuffs e acelera ataques',
      effects: { removeDebuffs: true, attackSpeedBoost: 1.15, attackSpeedDuration: 5000 },
      flavorText: '"1GB liberado! (mentira)"',
    },
    {
      id: 'game_booster',
      name: 'Game Booster',
      icon: '🚀',
      rarity: 'rare',
      description: '+25% dano por 20s após cada wave',
      effects: { damageBoost: 1.25, damageBoostDuration: 20000 },
      flavorText: '"Modo turbo ativado!"',
    },
    {
      id: 'custom_rom',
      name: 'Custom ROM',
      icon: '⚙️',
      rarity: 'epic',
      description: 'Stats customizáveis',
      effects: { allStatsBonus: 1.1, cooldownMultiplier: 0.9 },
      flavorText: '"Garantia? Que garantia?"',
    },
    {
      id: 'tasker',
      name: 'Tasker',
      icon: '🔧',
      rarity: 'legendary',
      description: 'Automatiza buffs',
      effects: { autoBuffChance: 0.1, autoBuffStrength: 1.2 },
      flavorText: '"Se X então Y, senão Z, talvez W..."',
    },
  ],

  // === APPS iOS ===
  ios: [
    {
      id: 'applecare',
      name: 'AppleCare+',
      icon: '🍎',
      rarity: 'uncommon',
      description: 'Regeneração constante',
      effects: { healthRegen: 2.0 },
      flavorText: '"Proteção premium por um preço premium."',
    },
    {
      id: 'icloud',
      name: 'iCloud',
      icon: '☁️',
      rarity: 'rare',
      description: 'Mais slots de app, menos velocidade',
      effects: { appSlots: 1, playerSpeed: 0.9 },
      flavorText: '"Seus 5GB acabaram."',
    },
    {
      id: 'imovie',
      name: 'iMovie',
      icon: '🎬',
      rarity: 'uncommon',
      description: 'Ataques com efeitos visuais extras',
      effects: { attackEffects: true, damageMultiplier: 1.05 },
      flavorText: '"Cinematográfico."',
    },
    {
      id: 'shortcuts',
      name: 'Atalhos',
      icon: '⚡',
      rarity: 'rare',
      description: 'Cooldowns reduzidos em 15%',
      effects: { cooldownMultiplier: 0.85 },
      flavorText: '"Automatize sua vida digital."',
    },
    {
      id: 'health_app',
      name: 'App Saúde',
      icon: '❤️',
      rarity: 'epic',
      description: 'Monitora e aumenta vida máxima',
      effects: { maxHealthMultiplier: 1.25, healthRegen: 1.0 },
      flavorText: '"10.000 passos para a vitória."',
    },
  ],

  // === APPS WINDOWS ===
  windows: [
    {
      id: 'antivirus_pesado',
      name: 'Antivírus Pesado',
      icon: '🛡️',
      rarity: 'uncommon',
      description: 'Defesa alta, ataque lento',
      effects: { defenseMultiplier: 1.3, attackSpeed: 0.8 },
      flavorText: '"Escaneando... há 3 horas."',
    },
    {
      id: 'directx_boost',
      name: 'DirectX Boost',
      icon: '🎮',
      rarity: 'rare',
      description: '+30% dano crítico',
      effects: { critDamage: 1.3 },
      flavorText: '"Otimização gráfica para destruição."',
    },
    {
      id: 'windows_update',
      name: 'Windows Update',
      icon: '🔄',
      rarity: 'epic',
      description: 'Buffs fortes, mas fica parado 2s',
      effects: { allStatsBonus: 1.2, updateStun: 2000 },
      flavorText: '"Não desligue o computador..."',
    },
    {
      id: 'wsl',
      name: 'WSL',
      icon: '🐧',
      rarity: 'legendary',
      description: 'Acessa apps de Linux',
      effects: { crossPlatformApps: ['linux'], linuxAppEfficiency: 0.8 },
      flavorText: '"O melhor dos dois mundos. Quase."',
    },
    {
      id: 'game_bar',
      name: 'Xbox Game Bar',
      icon: '🎯',
      rarity: 'uncommon',
      description: '+10% XP e dano',
      effects: { xpMultiplier: 1.1, damageMultiplier: 1.1 },
      flavorText: '"Win + G para gravar sua derrota."',
    },
  ],

  // === APPS LINUX ===
  linux: [
    {
      id: 'synaptic',
      name: 'Synaptic',
      icon: '📦',
      rarity: 'uncommon',
      description: '+2 apps oferecidos por wave',
      effects: { appChoices: 2 },
      flavorText: '"sudo apt-get install vitoria"',
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: '💻',
      rarity: 'rare',
      description: 'Buff aleatório poderoso',
      effects: { randomBuff: true, randomBuffStrength: 1.3 },
      flavorText: '"$ ./survive.sh"',
    },
    {
      id: 'wine',
      name: 'Wine',
      icon: '🍷',
      rarity: 'epic',
      description: 'Usa apps Windows com 70% eficiência',
      effects: { crossPlatformApps: ['windows'], windowsAppEfficiency: 0.7 },
      flavorText: '"Wine Is Not an Emulator, mas funciona."',
    },
    {
      id: 'htop',
      name: 'htop',
      icon: '📊',
      rarity: 'common',
      description: 'Mostra stats detalhadas dos inimigos',
      effects: { enemyInfo: true, damageMultiplier: 1.05 },
      flavorText: '"PID 666: Malware (100% CPU)"',
    },
    {
      id: 'vim',
      name: 'Vim',
      icon: '📝',
      rarity: 'legendary',
      description: 'Dano massivo, difícil de usar',
      effects: { damageMultiplier: 1.5, controlDifficulty: 1.3 },
      flavorText: '":wq para sobreviver, :q! para desistir"',
    },
  ],

  // === APPS SERVIDOR ===
  server: [
    {
      id: 'docker',
      name: 'Docker',
      icon: '🐳',
      rarity: 'epic',
      description: 'Cria clones temporários do jogador',
      effects: { cloneCount: 2, cloneDuration: 10000, cloneDamage: 0.5 },
      flavorText: '"Containerização de você mesmo."',
    },
    {
      id: 'firewall',
      name: 'Firewall Empresarial',
      icon: '🔥',
      rarity: 'rare',
      description: '+50% defesa',
      effects: { defenseMultiplier: 1.5 },
      flavorText: '"DENY ALL (exceto problemas)"',
    },
    {
      id: 'monitoring',
      name: 'Monitoramento 24/7',
      icon: '👁️',
      rarity: 'uncommon',
      description: 'Inimigos 20% mais lentos, +15% spawn',
      effects: { enemySpeed: 0.8, spawnRate: 1.15 },
      flavorText: '"Grafana shows: você está ferrado."',
    },
    {
      id: 'load_balancer',
      name: 'Load Balancer',
      icon: '⚖️',
      rarity: 'epic',
      description: 'Distribui dano recebido ao longo do tempo',
      effects: { damageSmoothing: true, smoothingFactor: 0.5 },
      flavorText: '"Round-robin de sofrimento."',
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      icon: '☸️',
      rarity: 'legendary',
      description: 'Auto-scaling de poder baseado em inimigos',
      effects: { autoScaling: true, scalingFactor: 0.02 },
      flavorText: '"Orquestrando sua sobrevivência."',
    },
    {
      id: 'ssh',
      name: 'SSH Tunnel',
      icon: '🔐',
      rarity: 'uncommon',
      description: 'Teleporte curto a cada 10s',
      effects: { teleportCooldown: 10000, teleportRange: 100 },
      flavorText: '"ssh -L 8080:escape:22"',
    },
    {
      id: 'cron',
      name: 'Cron Job',
      icon: '⏰',
      rarity: 'rare',
      description: 'Buffs automáticos a cada 30s',
      effects: { cronInterval: 30000, cronBuff: 1.1 },
      flavorText: '"* * * * * ./buff.sh"',
    },
    {
      id: 'nginx',
      name: 'Nginx',
      icon: '🌐',
      rarity: 'rare',
      description: 'Projéteis atravessam inimigos',
      effects: { piercing: true, piercingDamageFalloff: 0.8 },
      flavorText: '"Reverse proxy de destruição."',
    },
  ],

  // === APPS CONSOLE (genéricos) ===
  console: [
    {
      id: 'save_state',
      name: 'Save State',
      icon: '💾',
      rarity: 'epic',
      description: 'Volta ao estado de 5s atrás ao morrer',
      effects: { saveState: true, saveStateWindow: 5000 },
      flavorText: '"Load save slot 1?"',
    },
    {
      id: 'cheat_code',
      name: 'Cheat Code',
      icon: '🎮',
      rarity: 'legendary',
      description: 'Invencibilidade por 5s ao iniciar wave',
      effects: { waveStartInvincibility: 5000 },
      flavorText: '"↑↑↓↓←→←→BA START"',
    },
    {
      id: 'turbo_button',
      name: 'Botão Turbo',
      icon: '🔘',
      rarity: 'uncommon',
      description: '+30% velocidade de ataque',
      effects: { attackSpeed: 1.3 },
      flavorText: '"TURBO ativado!"',
    },
    {
      id: 'second_controller',
      name: 'Segundo Controle',
      icon: '🎮',
      rarity: 'rare',
      description: 'Ajudante automático ataca inimigos',
      effects: { autoHelper: true, helperDamage: 0.3 },
      flavorText: '"Player 2 has joined!"',
    },
    {
      id: 'rumble_pak',
      name: 'Vibração',
      icon: '📳',
      rarity: 'common',
      description: 'Alerta quando inimigos se aproximam',
      effects: { dangerWarning: true, warningRange: 100 },
      flavorText: '"Bzzzzt bzzzzt!"',
    },
  ],
};

// Mapeamento de dificuldade para categoria de apps
export const DIFFICULTY_APP_MAPPING = {
  easy: ['universal', 'console'],
  medium: ['universal', 'android', 'ios'],
  hard: ['universal', 'windows', 'linux', 'macos'],
  insane: ['universal', 'server'],
};

// Mapeamento específico de SO para apps extras
export const OS_APP_MAPPING = {
  nintendo: ['console'],
  xbox: ['console'],
  playstation: ['console'],
  android: ['android'],
  ios: ['ios'],
  windows: ['windows'],
  linux: ['linux'],
  macos: ['ios'], // macOS usa alguns apps iOS
  ubuntu_server: ['server', 'linux'],
  windows_server: ['server', 'windows'],
  debian: ['server', 'linux'],
  redhat: ['server', 'linux'],
};

// Raridades e suas chances
export const RARITY_CONFIG = {
  common: { chance: 0.45, color: '#9ca3af', name: 'Comum' },
  uncommon: { chance: 0.3, color: '#22c55e', name: 'Incomum' },
  rare: { chance: 0.15, color: '#3b82f6', name: 'Raro' },
  epic: { chance: 0.08, color: '#a855f7', name: 'Épico' },
  legendary: { chance: 0.02, color: '#f59e0b', name: 'Lendário' },
};

// Função para obter apps disponíveis para um SO
export const getAvailableApps = (osId, difficulty) => {
  const difficultyApps = DIFFICULTY_APP_MAPPING[difficulty] || ['universal'];
  const osApps = OS_APP_MAPPING[osId] || [];

  const allCategories = [...new Set([...difficultyApps, ...osApps])];

  let apps = [];
  allCategories.forEach((category) => {
    if (APPS_DATABASE[category]) {
      apps = [...apps, ...APPS_DATABASE[category]];
    }
  });

  return apps;
};

// Função para selecionar apps aleatórios baseado em raridade
export const selectRandomApps = (availableApps, count = 3, waveNumber = 1) => {
  // Aumenta chance de raros em waves posteriores
  const waveBonus = Math.min(waveNumber * 0.02, 0.2);

  const weightedApps = availableApps.map((app) => {
    let weight = RARITY_CONFIG[app.rarity]?.chance || 0.1;

    // Bônus para raros em waves posteriores
    if (app.rarity === 'rare' || app.rarity === 'epic' || app.rarity === 'legendary') {
      weight += waveBonus;
    }

    return { app, weight };
  });

  // Seleção por peso
  const selected = [];
  const remaining = [...weightedApps];

  for (let i = 0; i < count && remaining.length > 0; i++) {
    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (let j = 0; j < remaining.length; j++) {
      random -= remaining[j].weight;
      if (random <= 0) {
        selected.push(remaining[j].app);
        remaining.splice(j, 1);
        break;
      }
    }
  }

  return selected;
};
