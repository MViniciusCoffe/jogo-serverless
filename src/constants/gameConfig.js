export const GAME_CONFIG = {
  PLAYER: {
    SIZE: 30,
    SPEED: 5,
    INITIAL_X: 50,
    INITIAL_Y: 50,
    MAX_HEALTH: 100000000000000,
  },
  ENEMY: {
    SIZE: 20,
    SPEED: 1.5, // Velocidade que persegue o jogador
    SPAWN_MARGIN: 10,
    SPAWN_INTERVAL: 2000, // Spawn a cada 2 segundos
    MAX_ENEMIES: 10, // Máximo de inimigos na tela
  },
  KNIFE: {
    WIDTH: 8,
    HEIGHT: 25,
    ORBIT_RADIUS: 50,
    ROTATION_SPEED: 0.05,
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
