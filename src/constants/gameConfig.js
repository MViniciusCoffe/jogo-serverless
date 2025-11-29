export const GAME_CONFIG = {
  PLAYER: {
    SIZE: 30,
    SPEED: 5,
    INITIAL_X: 'center',
    INITIAL_Y: 'center',
    MAX_HEALTH: 100,
  },
  ENEMY: {
    SIZE: 20,
    SPEED: 1.5, // Velocidade que persegue o jogador
    SPAWN_MARGIN: 10,
    SPAWN_INTERVAL: 2000, // Spawn a cada 2 segundos
    MAX_ENEMIES: 30, // Máximo de inimigos na tela
    HEALTH: 3, // Vida de cada inimigo
    MAX_HEALTH: 3, // Vida máxima (para referência)
    DAMAGE: 95, // Dano que causa ao jogador
    DATACENTER_DAMAGE: 25, // Dano que causa ao data center
  },
  KNIFE: {
    WIDTH: 8,
    HEIGHT: 25,
    ORBIT_RADIUS: 50,
    ROTATION_SPEED: 0.05,
    DAMAGE: 2, // Dano da espada por hit
    DAMAGE_COOLDOWN: 200, // Cooldown em ms entre hits no mesmo inimigo
  },
  DATA_CENTER: {
    SIZE: 80,
    MAX_HEALTH: 500,
    POSITION_X: 'center',
    POSITION_Y: 'center',
    COLLISION_DAMAGE_INTERVAL: 1000, // Dano a cada 1 segundo enquanto em contato
  },
  MONEY: {
    SIZE: 12,
    VALUE: 5, // Valor de cada moeda
    DROP_CHANCE: 0.1, // 10% de chance de dropar
    COLLECTION_RADIUS: 60, // Raio de coleta automática
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
