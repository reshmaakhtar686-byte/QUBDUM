## 🎮 QUBDUM - Pong Game

A modern, interactive Pong game built with HTML5, CSS3, and vanilla JavaScript. Play against an AI computer opponent with smooth animations, collision detection, and an engaging neon aesthetic.

## ✨ Features

- **Player Controls**: Control the left paddle using:
  - 🖱️ Mouse movement (Y-axis)
  - ⬆️ Arrow keys (Up/Down)
  - W/S keys for alternative control

- **Computer AI**: Intelligent right paddle opponent with:
  - Adaptive difficulty
  - Smart ball tracking
  - Balanced gameplay

- **Game Mechanics**:
  - ✓ Smooth ball physics with spin/deflection based on paddle contact
  - ✓ Full collision detection for paddles and walls
  - ✓ Real-time scoreboard
  - ✓ Bouncing ball animation
  - ✓ Paddle boundary enforcement

- **Visual Design**:
  - 🌈 Neon gradient background
  - ✨ Glowing text effects
  - 💫 Shadow effects for depth
  - 📱 Responsive design

- **Game Controls**:
  - **SPACE**: Start/Pause game
  - **R**: Reset/Restart game
  - **Mouse**: Move player paddle
  - **Arrow Keys / W/S**: Alternative paddle control

## 🎯 How to Play

1. Open `index.html` in your web browser
2. Press **SPACE** to start the game
3. Move your paddle (left side) using mouse or arrow keys
4. Try to make the ball pass the computer's paddle (right side)
5. First to score wins the rally
6. Press **SPACE** to pause/resume
7. Press **R** to reset the game

## 📁 Project Structure

```
QUBDUM/
├── index.html       # Main HTML file with game canvas
├── style.css        # Styling and animations
├── script.js        # Game logic and physics
└── README.md        # Documentation
```

## 🛠️ Technologies Used

- **HTML5**: Canvas API for rendering
- **CSS3**: Animations and gradient effects
- **JavaScript**: Game physics, collision detection, and AI logic

## 🎨 Game Elements

### Paddles
- **Player (Left)**: Controlled by mouse/keyboard
- **Computer (Right)**: AI-controlled opponent
- Size: 10px wide × 80px tall
- Green glow effect (#00ff88)

### Ball
- **Size**: 8px radius
- **Color**: Cyan with blue glow (#00ccff)
- **Physics**: Velocity-based movement with collision response
- **Spin**: Ball trajectory affected by paddle contact point

### Canvas
- **Dimensions**: 800px × 400px
- **Background**: Dark with neon border
- **Center Line**: Dashed white line for visual reference

## 🧠 AI Algorithm

The computer opponent uses:
1. **Ball Tracking**: Follows the ball's Y-position
2. **Predictive Movement**: Anticipates ball trajectory
3. **Adaptive Speed**: Speed increases with ball velocity
4. **Dead Zone**: Small area around paddle center for realistic gameplay

## 🔄 Physics Implementation

- **Collision Detection**: AABB (Axis-Aligned Bounding Box) for paddles
- **Ball Deflection**: Ball angle changes based on hit position on paddle
- **Spin Mechanism**: Vertical velocity component added based on paddle contact
- **Boundary Checking**: Prevents paddles from going off-screen

## 📊 Scoring System

- **Player Score**: Increases when ball passes computer paddle
- **Computer Score**: Increases when ball passes player paddle
- **Real-time Display**: Scores update immediately after each point
- **Reset**: Scores reset to 0 when pressing R

## 🎮 Game States

1. **Initial**: "Press SPACE to Start"
2. **Running**: Game active, score display visible
3. **Paused**: "PAUSED - Press SPACE to Resume"
4. **Reset**: All scores and positions reset

## 💡 Tips for Playing

- **Position Control**: Use mouse for smooth, precise paddle positioning
- **Predict Movement**: Anticipate where the ball will go
- **Paddle Angles**: Hit the ball on different parts of the paddle to add spin
- **Speed Strategy**: The faster the ball, the more challenging the game
- **Pause Feature**: Use SPACE to pause and plan your strategy

## 🚀 Performance

- **FPS**: 60 frames per second (requestAnimationFrame)
- **Smooth Animation**: No lag or stuttering
- **Responsive Controls**: Instant paddle response
- **Optimized Rendering**: Efficient canvas drawing

## 📱 Responsive Design

The game adapts to different screen sizes:
- Desktop (800px width): Full experience
- Tablet & Mobile: Scaled canvas with adjusted controls
- Touch-friendly UI with clear instructions

## 🔧 Customization

You can modify these values in `script.js`:

```javascript
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;

// Adjust speeds
player.speed = 7;
computer.speed = 5;
ball.speed = 5;
```

## 🎓 Learning Resources

This project demonstrates:
- Canvas API fundamentals
- Game loop implementation
- Collision detection algorithms
- Basic AI pathfinding
- Event handling (keyboard & mouse)
- CSS animations and effects
- Responsive web design

## 📄 License

Free to use and modify for educational and personal projects.

## 👨‍💻 Author

Created as a modern implementation of the classic Pong game.

---

**Enjoy playing QUBDUM! 🎮✨**

For best experience, use a modern web browser (Chrome, Firefox, Safari, Edge).
