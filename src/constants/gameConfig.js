export const GAME_CONFIG = {
  PLAYER: {
    SIZE: 24,
    SPEED: 4.5,
    INITIAL_X: 'center',
    INITIAL_Y: 'center',
    MAX_HEALTH: 100,
  },
  ENEMY: {
    SIZE: 16,
    SPEED: 1.3, // Velocidade que persegue o jogador
    SPAWN_MARGIN: 10,
    SPAWN_INTERVAL: 1800, // Spawn a cada 1.8 segundos
    MAX_ENEMIES: 50, // Máximo de inimigos na tela
    HEALTH: 3, // Vida de cada inimigo
    MAX_HEALTH: 3, // Vida máxima (para referência)
    DAMAGE: 95, // Dano que causa ao jogador
    DATACENTER_DAMAGE: 25, // Dano que causa ao data center
  },
  KNIFE: {
    WIDTH: 6,
    HEIGHT: 20,
    ORBIT_RADIUS: 40,
    ROTATION_SPEED: 0.06,
    DAMAGE: 2, // Dano da espada por hit
    DAMAGE_COOLDOWN: 200, // Cooldown em ms entre hits no mesmo inimigo
  },
  DATA_CENTER: {
    SIZE: 60,
    MAX_HEALTH: 500,
    POSITION_X: 'center',
    POSITION_Y: 'center',
    COLLISION_DAMAGE_INTERVAL: 1000, // Dano a cada 1 segundo enquanto em contato
  },
  MONEY: {
    SIZE: 10,
    VALUE: 5, // Valor de cada moeda
    DROP_CHANCE: 0.15, // 15% de chance de dropar
    COLLECTION_RADIUS: 50, // Raio de coleta automática
  },
  LEVEL: {
    BASE_XP_REQUIRED: 100, // XP necessário para level 1
    XP_MULTIPLIER: 1.5, // Multiplicador de XP por nível (cresce exponencialmente)
    KNIFE_DAMAGE_BONUS: 0.5, // +0.5 de dano por nível (ex: level 5 = +2.5 dano)
    KNIFE_COOLDOWN_REDUCTION: 10, // -10ms de cooldown por nível
    MIN_COOLDOWN: 50, // Cooldown mínimo em ms
    PLAYER_SPEED_BONUS: 0.3, // +0.3 de velocidade por nível
    DEFENSE_BONUS: 0.03, // +3% de redução de dano por nível (multiplicativo)
    MAX_LEVEL: 100,
  },
  KEYS: {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
  },
};
