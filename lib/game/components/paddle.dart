import 'package:flame/components.dart';
import 'package:flutter/material.dart';

class Paddle extends PositionComponent {
  final bool isPlayer;
  late Paint _paint;
  late Paint _shadowPaint;
  double speed = 5;

  Paddle({
    required Vector2 position,
    required Vector2 size,
    required this.isPlayer,
  }) : super(
    position: position,
    size: size,
  );

  @override
  void onLoad() {
    _paint = Paint()..color = const Color(0xFF00ff88);
    _shadowPaint = Paint()
      ..color = const Color(0xFF00ff88).withOpacity(0.5)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10);
  }

  @override
  void render(Canvas canvas) {
    // Draw shadow
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(0, 0, width, height),
        const Radius.circular(2),
      ),
      _shadowPaint,
    );
    
    // Draw paddle
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(0, 0, width, height),
        const Radius.circular(2),
      ),
      _paint,
    );
  }

  void aiUpdate(double ballY) {
    final paddleCenter = position.y + height / 2;
    
    if (paddleCenter < ballY - 35) {
      position.y = (position.y + speed).clamp(0, parent!.height - height);
    } else if (paddleCenter > ballY + 35) {
      position.y = (position.y - speed).clamp(0, parent!.height - height);
    }
    
    speed = 4 + (0.5);
  }
}
