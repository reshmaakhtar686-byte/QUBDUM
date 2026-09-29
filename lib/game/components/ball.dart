import 'package:flame/components.dart';
import 'package:flutter/material.dart';
import 'package:qubdum/game/qubdum_game.dart';

class Ball extends CircleComponent {
  final QubdumGame gameRef;
  late Paint _paint;
  late Paint _shadowPaint;
  
  Vector2 velocity = Vector2(5, 5);
  final double baseSpeed = 5;

  Ball({
    required Vector2 position,
    required double radius,
    required this.gameRef,
  }) : super(
    position: position,
    radius: radius,
  );

  @override
  void onLoad() {
    _paint = Paint()..color = const Color(0xFF00ccff);
    _shadowPaint = Paint()
      ..color = const Color(0xFF00ccff).withOpacity(0.8)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 15);
  }

  @override
  void update(double dt) {
    super.update(dt);
    position += velocity * dt * 100;
  }

  @override
  void render(Canvas canvas) {
    // Draw shadow
    canvas.drawCircle(
      Offset.zero,
      radius,
      _shadowPaint,
    );
    
    // Draw ball
    canvas.drawCircle(
      Offset.zero,
      radius,
      _paint,
    );
  }
}
