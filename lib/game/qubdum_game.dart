import 'package:flame/game.dart';
import 'package:flame/events.dart';
import 'package:flutter/material.dart';
import 'package:qubdum/game/components/ball.dart';
import 'package:qubdum/game/components/paddle.dart';

class QubdumGame extends FlameGame {
  late Paddle playerPaddle;
  late Paddle computerPaddle;
  late Ball ball;
  
  int playerScore = 0;
  int computerScore = 0;
  bool gameRunning = false;
  bool gamePaused = false;

  @override
  Future<void> onLoad() async {
    super.onLoad();
    
    // Initialize paddles
    playerPaddle = Paddle(
      position: Vector2(10, size.y / 2 - 40),
      size: Vector2(10, 80),
      isPlayer: true,
    );
    
    computerPaddle = Paddle(
      position: Vector2(size.x - 20, size.y / 2 - 40),
      size: Vector2(10, 80),
      isPlayer: false,
    );
    
    // Initialize ball
    ball = Ball(
      position: Vector2(size.x / 2, size.y / 2),
      radius: 8,
      gameRef: this,
    );
    
    add(playerPaddle);
    add(computerPaddle);
    add(ball);
    
    gameRunning = true;
  }

  @override
  void update(double dt) {
    super.update(dt);
    
    if (!gameRunning || gamePaused) return;
    
    // Computer AI
    computerPaddle.aiUpdate(ball.position.y);
    
    // Check collisions
    checkPaddleCollisions();
    checkWallCollisions();
    checkScoring();
  }

  void checkPaddleCollisions() {
    // Player paddle collision
    if (ball.position.x - ball.radius < playerPaddle.position.x + playerPaddle.width &&
        ball.position.y > playerPaddle.position.y &&
        ball.position.y < playerPaddle.position.y + playerPaddle.height) {
      ball.velocity.x = -ball.velocity.x.abs();
      ball.position.x = playerPaddle.position.x + playerPaddle.width + ball.radius;
      
      final deltaY = ball.position.y - (playerPaddle.position.y + playerPaddle.height / 2);
      ball.velocity.y += deltaY * 0.05;
    }
    
    // Computer paddle collision
    if (ball.position.x + ball.radius > computerPaddle.position.x &&
        ball.position.y > computerPaddle.position.y &&
        ball.position.y < computerPaddle.position.y + computerPaddle.height) {
      ball.velocity.x = ball.velocity.x.abs();
      ball.position.x = computerPaddle.position.x - ball.radius;
      
      final deltaY = ball.position.y - (computerPaddle.position.y + computerPaddle.height / 2);
      ball.velocity.y += deltaY * 0.05;
    }
  }

  void checkWallCollisions() {
    if (ball.position.y - ball.radius < 0 || ball.position.y + ball.radius > size.y) {
      ball.velocity.y = -ball.velocity.y;
      ball.position.y = ball.position.y.clamp(ball.radius, size.y - ball.radius);
    }
  }

  void checkScoring() {
    if (ball.position.x - ball.radius < 0) {
      computerScore++;
      resetBall();
    } else if (ball.position.x + ball.radius > size.x) {
      playerScore++;
      resetBall();
    }
  }

  void resetBall() {
    ball.position = Vector2(size.x / 2, size.y / 2);
    ball.velocity = Vector2(
      (5 * (Random().nextBool() ? 1 : -1)).toDouble(),
      ((Random().nextDouble() - 0.5) * 8).toDouble(),
    );
  }

  void reset() {
    playerScore = 0;
    computerScore = 0;
    gameRunning = true;
    gamePaused = false;
    resetBall();
  }

  @override
  void onDragUpdate(DragUpdateEvent event) {
    playerPaddle.position.y = (event.globalPosition.dy - playerPaddle.height / 2).clamp(0.0, size.y - playerPaddle.height);
  }
}
