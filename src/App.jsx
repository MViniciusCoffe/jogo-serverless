import React, { useState, useRef, useCallback } from 'react';
import { GAME_CONFIG } from './constants/gameConfig';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useContainerSize } from './hooks/useContainerSize';
import { GameHeader } from './components/GameHeader';
import { GameArena } from './components/GameArena';
import { GameOverlay } from './components/GameOverlay';
import { GameFooter } from './components/GameFooter';
import './App.css';

const App = () => {
  // Estados do React
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(GAME_CONFIG.PLAYER.MAX_HEALTH);
  const [gameActive, setGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [enemies, setEnemies] = useState([]);

  // Refs para manipulação DOM
  const playerRef = useRef(null);
  const knifeRef = useRef(null);
  const enemiesRef = useRef([]);
  const containerRef = useRef(null);

  // Estado do jogo (não causa re-render)
  const gameState = useRef({
    player: { 
      x: GAME_CONFIG.PLAYER.INITIAL_X, 
      y: GAME_CONFIG.PLAYER.INITIAL_Y, 
      size: GAME_CONFIG.PLAYER.SIZE, 
      speed: GAME_CONFIG.PLAYER.SPEED 
    },
    knife: {
      x: 0,
      y: 0,
      angle: 0,
      width: GAME_CONFIG.KNIFE.WIDTH,
      height: GAME_CONFIG.KNIFE.HEIGHT
    },
    enemies: [],
    keys: { ...GAME_CONFIG.KEYS },
    container: { width: 0, height: 0 }
  });

  // Callback de Game Over
  const handleGameOver = useCallback(() => {
    setGameActive(false);
    setIsGameOver(true);
    stopLoop();
  }, []);

  // Custom Hooks
  const { startLoop, stopLoop } = useGameLoop(
    gameState, 
    playerRef, 
    knifeRef,
    enemiesRef,
    setScore,
    setHealth,
    handleGameOver
  );
  useKeyboardControls(gameState);
  useContainerSize(containerRef, gameState);

  // Sincronizar enemies com o estado do React para renderização
  React.useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setEnemies([...gameState.current.enemies]);
      }, 16); // ~60 FPS

      return () => clearInterval(interval);
    }
  }, [gameActive]);

  // Handlers
  const startGame = () => {
    setScore(0);
    setHealth(GAME_CONFIG.PLAYER.MAX_HEALTH);
    setIsGameOver(false);
    gameState.current.player.x = GAME_CONFIG.PLAYER.INITIAL_X;
    gameState.current.player.y = GAME_CONFIG.PLAYER.INITIAL_Y;
    gameState.current.knife.angle = 0;
    gameState.current.enemies = [];
    setEnemies([]);
    setGameActive(true);
    startLoop();
  };

  const stopGame = () => {
    setGameActive(false);
    stopLoop();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="game-wrapper">
        
        <GameHeader 
          score={score}
          health={health}
          maxHealth={GAME_CONFIG.PLAYER.MAX_HEALTH}
          darkMode={darkMode} 
          onToggleTheme={toggleTheme} 
        />

        <div style={{ position: 'relative' }}>
          <GameArena
            containerRef={containerRef}
            playerRef={playerRef}
            knifeRef={knifeRef}
            enemiesRef={enemiesRef}
            gameActive={gameActive}
            playerSize={GAME_CONFIG.PLAYER.SIZE}
            knifeWidth={GAME_CONFIG.KNIFE.WIDTH}
            knifeHeight={GAME_CONFIG.KNIFE.HEIGHT}
            enemies={enemies}
          />
          
          {(!gameActive || isGameOver) && (
            <GameOverlay 
              onStart={startGame} 
              isGameOver={isGameOver}
              score={score}
            />
          )}
        </div>

        <GameFooter gameActive={gameActive} onStop={stopGame} />

      </div>
    </div>
  );
};

export default App;