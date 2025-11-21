import React, { useState, useRef } from 'react';
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
  const [gameActive, setGameActive] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Refs para manipulação DOM
  const playerRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  // Estado do jogo (não causa re-render)
  const gameState = useRef({
    player: { 
      x: GAME_CONFIG.PLAYER.INITIAL_X, 
      y: GAME_CONFIG.PLAYER.INITIAL_Y, 
      size: GAME_CONFIG.PLAYER.SIZE, 
      speed: GAME_CONFIG.PLAYER.SPEED 
    },
    target: { 
      x: 200, 
      y: 200, 
      size: GAME_CONFIG.TARGET.SIZE 
    },
    keys: { ...GAME_CONFIG.KEYS },
    container: { width: 0, height: 0 }
  });

  // Custom Hooks
  const { startLoop, stopLoop, respawnTarget } = useGameLoop(
    gameState, 
    playerRef, 
    targetRef, 
    setScore
  );
  useKeyboardControls(gameState);
  useContainerSize(containerRef, gameState);

  // Handlers
  const startGame = () => {
    if (!gameActive) {
      setScore(0);
      gameState.current.player.x = GAME_CONFIG.PLAYER.INITIAL_X;
      gameState.current.player.y = GAME_CONFIG.PLAYER.INITIAL_Y;
      respawnTarget();
      setGameActive(true);
      startLoop();
    }
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
          darkMode={darkMode} 
          onToggleTheme={toggleTheme} 
        />

        <div style={{ position: 'relative' }}>
          <GameArena
            containerRef={containerRef}
            playerRef={playerRef}
            targetRef={targetRef}
            gameActive={gameActive}
            playerSize={GAME_CONFIG.PLAYER.SIZE}
            targetSize={GAME_CONFIG.TARGET.SIZE}
          />
          
          {!gameActive && <GameOverlay onStart={startGame} />}
        </div>

        <GameFooter gameActive={gameActive} onStop={stopGame} />

      </div>
    </div>
  );
};

export default App;