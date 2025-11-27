import React, { useState, useRef, useCallback } from 'react';
import { GAME_CONFIG } from './constants/gameConfig';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useContainerSize } from './hooks/useContainerSize';
import { usePauseKey } from './hooks/usePauseKey';
import { GameHUD } from './components/GameHUD';
import { GameArena } from './components/GameArena';
import { GameOverlay } from './components/GameOverlay';
import './App.css';

const App = () => {
  // Estados do React
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(GAME_CONFIG.PLAYER.MAX_HEALTH);
  const [money, setMoney] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [enemies, setEnemies] = useState([]);
  const [moneyDrops, setMoneyDrops] = useState([]);

  // Refs para manipulação DOM
  const playerRef = useRef(null);
  const knifeRef = useRef(null);
  const enemiesRef = useRef([]);
  const moneyRef = useRef([]);
  const containerRef = useRef(null);
  const loopStartedRef = useRef(false);

  // Estado do jogo (não causa re-render)
  const gameState = useRef({
    player: {
      x: GAME_CONFIG.PLAYER.INITIAL_X === 'center' ? 0 : GAME_CONFIG.PLAYER.INITIAL_X,
      y: GAME_CONFIG.PLAYER.INITIAL_Y === 'center' ? 0 : GAME_CONFIG.PLAYER.INITIAL_Y,
      size: GAME_CONFIG.PLAYER.SIZE,
      speed: GAME_CONFIG.PLAYER.SPEED,
    },
    knife: {
      x: 0,
      y: 0,
      angle: 0,
      width: GAME_CONFIG.KNIFE.WIDTH,
      height: GAME_CONFIG.KNIFE.HEIGHT,
    },
    enemies: [],
    moneyDrops: [],
    keys: { ...GAME_CONFIG.KEYS },
    container: { width: 0, height: 0 },
  });

  // Handlers
  const startGame = useCallback(() => {
    setScore(0);
    setHealth(GAME_CONFIG.PLAYER.MAX_HEALTH);
    setMoney(0);
    setIsGameOver(false);
    setIsPaused(false);

    // Calcular posição do player (centro ou posição fixa)
    if (GAME_CONFIG.PLAYER.INITIAL_X === 'center') {
      gameState.current.player.x =
        gameState.current.container.width / 2 - GAME_CONFIG.PLAYER.SIZE / 2;
    } else {
      gameState.current.player.x = GAME_CONFIG.PLAYER.INITIAL_X;
    }

    if (GAME_CONFIG.PLAYER.INITIAL_Y === 'center') {
      gameState.current.player.y =
        gameState.current.container.height / 2 - GAME_CONFIG.PLAYER.SIZE / 2;
    } else {
      gameState.current.player.y = GAME_CONFIG.PLAYER.INITIAL_Y;
    }

    gameState.current.knife.angle = 0;
    gameState.current.enemies = [];
    gameState.current.moneyDrops = [];
    setEnemies([]);
    setGameActive(true);
  }, []);

  const pauseGame = useCallback(() => {
    setGameActive(false);
    setIsPaused(true);
    loopStartedRef.current = false;
  }, []);

  const resumeGame = useCallback(() => {
    setGameActive(true);
    setIsPaused(false);
  }, []);

  // Custom Hooks
  const { startLoop, stopLoop } = useGameLoop(
    gameState,
    playerRef,
    knifeRef,
    enemiesRef,
    setScore,
    setHealth,
    setMoney,
    setEnemies,
    () => {
      setGameActive(false);
      setIsGameOver(true);
    }
  );

  useKeyboardControls(gameState);
  useContainerSize(containerRef, gameState);
  usePauseKey(gameActive && !isPaused, pauseGame);

  // Sincronizar enemies com o estado do React para renderização
  React.useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setEnemies([...gameState.current.enemies]);
        setMoneyDrops([...gameState.current.moneyDrops]);
      }, 16); // ~60 FPS

      return () => clearInterval(interval);
    }
  }, [gameActive]);

  // Parar o loop quando o jogo termina
  React.useEffect(() => {
    if (isGameOver) {
      stopLoop();
    }
  }, [isGameOver, stopLoop]);

  // Iniciar loop do jogo quando gameActive muda para true
  React.useEffect(() => {
    if (gameActive && !loopStartedRef.current) {
      loopStartedRef.current = true;
      startLoop();
    } else if (!gameActive) {
      loopStartedRef.current = false;
      stopLoop();
    }
  }, [gameActive, startLoop, stopLoop]);

  return (
    <div className="app-container dark">
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <GameArena
          containerRef={containerRef}
          playerRef={playerRef}
          knifeRef={knifeRef}
          enemiesRef={enemiesRef}
          moneyRef={moneyRef}
          gameActive={gameActive}
          playerSize={GAME_CONFIG.PLAYER.SIZE}
          knifeWidth={GAME_CONFIG.KNIFE.WIDTH}
          knifeHeight={GAME_CONFIG.KNIFE.HEIGHT}
          enemies={enemies}
          moneyDrops={moneyDrops}
        />

        {!gameActive && !isPaused && !isGameOver && (
          <GameOverlay onStart={startGame} isGameOver={isGameOver} score={score} />
        )}

        {isGameOver && <GameOverlay onStart={startGame} isGameOver={isGameOver} score={score} />}

        {isPaused && !isGameOver && (
          <div className="pause-overlay">
            <div className="pause-content">
              <h2>⏸️ DEFESA EM PAUSA</h2>
              <button onClick={resumeGame} className="btn btn-resume">
                CONTINUAR DEFENDENDO
              </button>
              <button onClick={startGame} className="btn btn-restart">
                REINICIAR DEFESA
              </button>
            </div>
          </div>
        )}

        <GameHUD
          score={score}
          health={health}
          money={money}
          maxHealth={GAME_CONFIG.PLAYER.MAX_HEALTH}
          gameActive={gameActive && !isPaused}
          onPause={pauseGame}
        />
      </div>
    </div>
  );
};

export default App;
