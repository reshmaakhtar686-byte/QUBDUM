import 'package:flutter/material.dart';
import 'package:qubdum/game/qubdum_game.dart';
import 'package:flame/game.dart';

void main() {
  runApp(const QubdumApp());
}

class QubdumApp extends StatelessWidget {
  const QubdumApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'QUBDUM',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF667eea),
        scaffoldBackgroundColor: const Color(0xFF0a0a0a),
        fontFamily: 'Orbitron',
      ),
      home: const QubdumHome(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class QubdumHome extends StatefulWidget {
  const QubdumHome({Key? key}) : super(key: key);

  @override
  State<QubdumHome> createState() => _QubdumHomeState();
}

class _QubdumHomeState extends State<QubdumHome> {
  late QubdumGame game;

  @override
  void initState() {
    super.initState();
    game = QubdumGame();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0a0a0a),
      body: Column(
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 20.0),
            child: Column(
              children: [
                Text(
                  'QUBDUM',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                    color: const Color(0xFF00ff88),
                    fontWeight: FontWeight.bold,
                    fontSize: 48,
                    shadows: [
                      Shadow(
                        color: const Color(0xFF00ff88).withOpacity(0.5),
                        blurRadius: 20,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  'Pong Game',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: const Color(0xFF00ccff),
                    fontSize: 16,
                    letterSpacing: 2,
                  ),
                ),
              ],
            ),
          ),
          // Scoreboard
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _ScoreWidget('Player', game.playerScore),
                _ScoreWidget('Computer', game.computerScore),
              ],
            ),
          ),
          const SizedBox(height: 20),
          // Game Canvas
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: const Color(0xFF00ff88),
                    width: 3,
                  ),
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF00ff88).withOpacity(0.3),
                      blurRadius: 30,
                    ),
                  ],
                ),
                child: GameWidget(
                  game: game,
                ),
              ),
            ),
          ),
          // Controls Info
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Controls',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: const Color(0xFF00ff88),
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  '• Swipe or tap to move paddle\n• Double tap to pause/resume\n• Device rotation for fullscreen',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF00ccff),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ScoreWidget extends StatelessWidget {
  final String label;
  final int score;

  const _ScoreWidget(this.label, this.score);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFF00ff88)),
        borderRadius: BorderRadius.circular(10),
        color: const Color(0xFF00ff88).withOpacity(0.1),
      ),
      child: Column(
        children: [
          Text(
            label,
            style: const TextStyle(
              color: Color(0xFF00ff88),
              fontSize: 14,
              fontWeight: FontWeight.bold,
              letterSpacing: 1,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            '$score',
            style: const TextStyle(
              color: Color(0xFF00ccff),
              fontSize: 36,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
