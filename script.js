const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const gameStatusDisplay = document.getElementById('gameStatus');

// Game Objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;
const gameSpeed = 5;

let gameRunning = false;
let gamePaused = false;

// Player (Left Paddle)
const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    score: 0,
    speed: 7
};

// Computer (Right Paddle)
const computer = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    score: 0,
    speed: 5
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    radius: ballSize,
    speed: 5
};

// Mouse tracking for player paddle
let mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

// Keyboard controls
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    // Start/Pause game with SPACE
    if (e.key === ' ') {
        e.preventDefault();
        if (!gameRunning) {
            startGame();
        } else {
            gamePaused = !gamePaused;
            updateGameStatus();
        }
    }

    // Reset game with R
    if (e.key.toLowerCase() === 'r') {
        resetGame();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function updateGameStatus() {
    if (!gameRunning) {
        gameStatusDisplay.textContent = 'Press SPACE to Start';
    } else if (gamePaused) {
        gameStatusDisplay.textContent = 'PAUSED - Press SPACE to Resume';
    } else {
        gameStatusDisplay.textContent = '';
    }
}

function startGame() {
    gameRunning = true;
    gamePaused = false;
    gameStatusDisplay.textContent = '';
}

function resetGame() {
    gameRunning = false;
    gamePaused = false;
    player.score = 0;
    computer.score = 0;
    player.y = canvas.height / 2 - paddleHeight / 2;
    computer.y = canvas.height / 2 - paddleHeight / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5;
    ball.dy = 5;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    updateGameStatus();
}

function updatePlayer() {
    // Mouse control
    if (mouseY - paddleHeight / 2 > 0 && mouseY + paddleHeight / 2 < canvas.height) {
        player.y = mouseY - paddleHeight / 2;
    }

    // Keyboard control (Arrow keys or W/S)
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        player.y = Math.max(0, player.y - player.speed);
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        player.y = Math.min(canvas.height - paddleHeight, player.y + player.speed);
    }

    // Keep paddle in bounds
    player.y = Math.max(0, Math.min(canvas.height - paddleHeight, player.y));
}

function updateComputer() {
    const computerCenter = computer.y + paddleHeight / 2;
    const ballCenter = ball.y;

    // Simple AI: follow the ball
    if (computerCenter < ballCenter - 35) {
        computer.y = Math.min(canvas.height - paddleHeight, computer.y + computer.speed);
    } else if (computerCenter > ballCenter + 35) {
        computer.y = Math.max(0, computer.y - computer.speed);
    }

    // Add some difficulty variation
    computer.speed = 5 + (Math.abs(ball.dx) / 10);
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }

    // Left paddle collision
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.radius;
        
        // Add spin based on paddle position
        const deltaY = ball.y - (player.y + player.height / 2);
        ball.dy += deltaY * 0.05;
    }

    // Right paddle (computer) collision
    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.radius;
        
        // Add spin based on paddle position
        const deltaY = ball.y - (computer.y + computer.height / 2);
        ball.dy += deltaY * 0.05;
    }

    // Left side (computer scores)
    if (ball.x - ball.radius < 0) {
        computer.score++;
        computerScoreDisplay.textContent = computer.score;
        resetBall();
    }

    // Right side (player scores)
    if (ball.x + ball.radius > canvas.width) {
        player.score++;
        playerScoreDisplay.textContent = player.score;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 8;
}

function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
    ctx.shadowBlur = 10;
}

function drawBall() {
    ctx.fillStyle = '#00ccff';
    ctx.shadowColor = 'rgba(0, 204, 255, 0.8)';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([5, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    drawCenterLine();

    // Draw paddles and ball
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();

    ctx.shadowColor = 'transparent';
}

function update() {
    if (!gameRunning || gamePaused) return;

    updatePlayer();
    updateComputer();
    updateBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize
updateGameStatus();
draw();
gameLoop();
