import React, { useState, useRef, useCallback } from 'react';
import { GAME_CONFIG } from './constants/gameConfig';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useContainerSize } from './hooks/useContainerSize';
import { usePauseKey } from './hooks/usePauseKey';
import { useLevelSystem } from './hooks/useLevelSystem';
import { GameHUD } from './components/GameHUD';
import { GameArena } from './components/GameArena';
import { GameOverlay } from './components/GameOverlay';
import { MainMenu } from './components/MainMenu';
import './App.css';

const App = () => {
  // Estados do React
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [health, setHealth] = useState(GAME_CONFIG.PLAYER.MAX_HEALTH);
  const [datacenterHealth, setDatacenterHealth] = useState(GAME_CONFIG.DATA_CENTER.MAX_HEALTH);
  const [money, setMoney] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState(null); // 'player' ou 'datacenter'
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
    level: 1,
    currentXP: 0,
    datacenter: {
      x: GAME_CONFIG.DATA_CENTER.POSITION_X === 'center' ? 0 : GAME_CONFIG.DATA_CENTER.POSITION_X,
      y: GAME_CONFIG.DATA_CENTER.POSITION_Y === 'center' ? 0 : GAME_CONFIG.DATA_CENTER.POSITION_Y,
      size: GAME_CONFIG.DATA_CENTER.SIZE,
      health: GAME_CONFIG.DATA_CENTER.MAX_HEALTH,
      lastDamageTime: 0,
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
    setLevel(1);
    setCurrentXP(0);
    setHealth(GAME_CONFIG.PLAYER.MAX_HEALTH);
    setDatacenterHealth(GAME_CONFIG.DATA_CENTER.MAX_HEALTH);
    setMoney(0);
    setIsGameOver(false);
    setGameOverReason(null);
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

    // Calcular posição do data center (centro ou posição fixa)
    if (GAME_CONFIG.DATA_CENTER.POSITION_X === 'center') {
      gameState.current.datacenter.x =
        gameState.current.container.width / 2 - GAME_CONFIG.DATA_CENTER.SIZE / 2;
    } else {
      gameState.current.datacenter.x = GAME_CONFIG.DATA_CENTER.POSITION_X;
    }

    if (GAME_CONFIG.DATA_CENTER.POSITION_Y === 'center') {
      gameState.current.datacenter.y =
        gameState.current.container.height / 2 - GAME_CONFIG.DATA_CENTER.SIZE / 2;
    } else {
      gameState.current.datacenter.y = GAME_CONFIG.DATA_CENTER.POSITION_Y;
    }

    gameState.current.level = 1;
    gameState.current.currentXP = 0;
    gameState.current.datacenter.health = GAME_CONFIG.DATA_CENTER.MAX_HEALTH;
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

  const backToMenu = useCallback(() => {
    stopLoop();
    setGameActive(false);
    setIsPaused(false);
    setIsGameOver(false);
    setGameOverReason(null);
    loopStartedRef.current = false;
  }, [stopLoop]);

  // Custom Hooks
  const { getLevelStats, addXP, getXPDisplay } = useLevelSystem(gameState, setLevel, setCurrentXP);

  const { startLoop, stopLoop } = useGameLoop(
    gameState,
    playerRef,
    knifeRef,
    enemiesRef,
    setScore,
    setHealth,
    setDatacenterHealth,
    setMoney,
    setEnemies,
    addXP,
    getLevelStats,
    (reason) => {
      setGameActive(false);
      setGameOverReason(reason);
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
          datacenterSize={GAME_CONFIG.DATA_CENTER.SIZE}
          enemies={enemies}
          moneyDrops={moneyDrops}
          gameState={gameState}
        />

        {!gameActive && !isPaused && !isGameOver && <MainMenu onStart={startGame} />}

        {isGameOver && (
          <GameOverlay
            onStart={startGame}
            isGameOver={isGameOver}
            score={score}
            reason={gameOverReason}
          />
        )}

        {isPaused && !isGameOver && (
          <div className="pause-overlay">
            <div className="pause-content">
              <h2>⏸️ DEFESA EM PAUSA</h2>
              <button onClick={resumeGame} className="btn btn-resume">
                CONTINUAR DEFENDENDO
              </button>
              <button onClick={backToMenu} className="btn btn-restart">
                REINICIAR DEFESA
              </button>
            </div>
          </div>
        )}

        <GameHUD
          score={score}
          health={health}
          datacenterHealth={datacenterHealth}
          money={money}
          level={level}
          currentXP={currentXP}
          xpDisplay={getXPDisplay(level, currentXP)}
          maxHealth={GAME_CONFIG.PLAYER.MAX_HEALTH}
          maxDatacenterHealth={GAME_CONFIG.DATA_CENTER.MAX_HEALTH}
          gameActive={gameActive && !isPaused}
          onPause={pauseGame}
        />
      </div>
    </div>
  );
};

export default App;
