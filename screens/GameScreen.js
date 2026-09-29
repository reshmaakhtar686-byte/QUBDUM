import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/react-native';
import Svg, { Circle, Rect, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const GAME_WIDTH = width * 0.95;
const GAME_HEIGHT = height * 0.55;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 8;

const GameScreen = ({ navigation }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  // Game state
  const gameState = useRef({
    playerY: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    computerY: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    ballX: GAME_WIDTH / 2,
    ballY: GAME_HEIGHT / 2,
    ballDX: 5,
    ballDY: 5,
    playerScore: 0,
    computerScore: 0,
  });

  const [gameRender, setGameRender] = useState(gameState.current);

  useEffect(() => {
    let gameLoop;
    if (gameRunning && !gamePaused) {
      gameLoop = setInterval(() => {
        updateGame();
      }, 1000 / 60); // 60 FPS
    }
    return () => clearInterval(gameLoop);
  }, [gameRunning, gamePaused]);

  const updateGame = () => {
    const state = gameState.current;

    // Ball movement
    state.ballX += state.ballDX;
    state.ballY += state.ballDY;

    // Wall collision
    if (state.ballY - BALL_SIZE < 0 || state.ballY + BALL_SIZE > GAME_HEIGHT) {
      state.ballDY = -state.ballDY;
      state.ballY = Math.max(BALL_SIZE, Math.min(GAME_HEIGHT - BALL_SIZE, state.ballY));
    }

    // Player paddle collision
    if (
      state.ballX - BALL_SIZE < PADDLE_WIDTH &&
      state.ballY > state.playerY &&
      state.ballY < state.playerY + PADDLE_HEIGHT
    ) {
      state.ballDX = -state.ballDX;
      state.ballX = PADDLE_WIDTH + BALL_SIZE;
    }

    // Computer paddle collision
    if (
      state.ballX + BALL_SIZE > GAME_WIDTH - PADDLE_WIDTH &&
      state.ballY > state.computerY &&
      state.ballY < state.computerY + PADDLE_HEIGHT
    ) {
      state.ballDX = -state.ballDX;
      state.ballX = GAME_WIDTH - PADDLE_WIDTH - BALL_SIZE;
    }

    // Scoring
    if (state.ballX - BALL_SIZE < 0) {
      state.computerScore++;
      state.ballX = GAME_WIDTH / 2;
      state.ballY = GAME_HEIGHT / 2;
      state.ballDX = 5;
      state.ballDY = (Math.random() - 0.5) * 8;
    } else if (state.ballX + BALL_SIZE > GAME_WIDTH) {
      state.playerScore++;
      state.ballX = GAME_WIDTH / 2;
      state.ballY = GAME_HEIGHT / 2;
      state.ballDX = -5;
      state.ballDY = (Math.random() - 0.5) * 8;
    }

    // Computer AI
    const computerCenter = state.computerY + PADDLE_HEIGHT / 2;
    if (computerCenter < state.ballY - 35) {
      state.computerY = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, state.computerY + 5);
    } else if (computerCenter > state.ballY + 35) {
      state.computerY = Math.max(0, state.computerY - 5);
    }

    setPlayerScore(state.playerScore);
    setComputerScore(state.computerScore);
    setGameRender({ ...state });
  };

  const handleStartGame = () => {
    setGameRunning(!gameRunning);
    if (gameRunning) {
      setGamePaused(false);
    }
  };

  const handleReset = () => {
    gameState.current = {
      playerY: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      computerY: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      ballX: GAME_WIDTH / 2,
      ballY: GAME_HEIGHT / 2,
      ballDX: 5,
      ballDY: 5,
      playerScore: 0,
      computerScore: 0,
    };
    setPlayerScore(0);
    setComputerScore(0);
    setGameRunning(false);
    setGamePaused(false);
    setGameRender(gameState.current);
  };

  const handlePaddleMove = (event) => {
    const yPosition = event.nativeEvent.locationY;
    gameState.current.playerY = Math.max(
      0,
      Math.min(GAME_HEIGHT - PADDLE_HEIGHT, yPosition - PADDLE_HEIGHT / 2)
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>QUBDUM</Text>
        <Text style={styles.subtitle}>Pong Game</Text>
      </View>

      {/* Scoreboard */}
      <View style={styles.scoreboard}>
        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabel}>PLAYER</Text>
          <Text style={styles.scoreValue}>{playerScore}</Text>
        </View>
        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabel}>COMPUTER</Text>
          <Text style={styles.scoreValue}>{computerScore}</Text>
        </View>
      </View>

      {/* Game Canvas */}
      <TouchableOpacity
        onPress={handlePaddleMove}
        activeOpacity={0.8}
        style={styles.gameCanvasContainer}
      >
        <Svg width={GAME_WIDTH} height={GAME_HEIGHT} style={styles.gameSvg}>
          {/* Background */}
          <Rect width={GAME_WIDTH} height={GAME_HEIGHT} fill="#0a0a0a" />
          
          {/* Center Line */}
          <Line
            x1={GAME_WIDTH / 2}
            y1={0}
            x2={GAME_WIDTH / 2}
            y2={GAME_HEIGHT}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeDasharray="5,10"
          />
          
          {/* Player Paddle */}
          <Rect
            x={0}
            y={gameRender.playerY}
            width={PADDLE_WIDTH}
            height={PADDLE_HEIGHT}
            fill="#00ff88"
            rx="2"
          />
          
          {/* Computer Paddle */}
          <Rect
            x={GAME_WIDTH - PADDLE_WIDTH}
            y={gameRender.computerY}
            width={PADDLE_WIDTH}
            height={PADDLE_HEIGHT}
            fill="#00ff88"
            rx="2"
          />
          
          {/* Ball */}
          <Circle
            cx={gameRender.ballX}
            cy={gameRender.ballY}
            r={BALL_SIZE}
            fill="#00ccff"
          />
        </Svg>
      </TouchableOpacity>

      {/* Game Status */}
      <Text style={styles.gameStatus}>
        {!gameRunning ? '🎮 Tap to Play' : gamePaused ? 'PAUSED' : ''}
      </Text>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#667eea' }]}
          onPress={handleStartGame}
        >
          <Text style={styles.buttonText}>{gameRunning ? 'PAUSE' : 'PLAY'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00ff88' }]}
          onPress={handleReset}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>RESET</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          📱 Tap/Swipe left side to move paddle\n🤖 Computer opponent plays right side
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ff88',
    textShadowColor: 'rgba(0, 255, 136, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#00ccff',
    letterSpacing: 2,
    marginTop: 5,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  scoreSection: {
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#00ff88',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scoreValue: {
    color: '#00ccff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 5,
  },
  gameCanvasContainer: {
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00ff88',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#0a0a0a',
    marginVertical: 10,
  },
  gameSvg: {
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
  },
  gameStatus: {
    textAlign: 'center',
    color: '#ffff00',
    fontSize: 16,
    fontWeight: 'bold',
    minHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  buttonText: {
    color: '#00ff88',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  instructions: {
    backgroundColor: 'rgba(0, 204, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#00ccff',
    borderRadius: 8,
    padding: 12,
  },
  instructionText: {
    color: '#00ccff',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default GameScreen;
