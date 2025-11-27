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
    DAMAGE: 95, // Dano que causa ao jogador
  },
  KNIFE: {
    WIDTH: 8,
    HEIGHT: 25,
    ORBIT_RADIUS: 50,
    ROTATION_SPEED: 0.05,
    DAMAGE: 2, // Dano da espada por hit
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
