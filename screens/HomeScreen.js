import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>QUBDUM</Text>
        <Text style={styles.subtitle}>Modern Pong Game</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionTitle}>Welcome to QUBDUM!</Text>
        <Text style={styles.descriptionText}>
          Play the classic Pong game against an intelligent AI opponent. Test your reflexes and skills!
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresBox}>
        <Text style={styles.sectionTitle}>✨ Features</Text>
        <Text style={styles.featureItem}>🎮 Touch/Swipe controls</Text>
        <Text style={styles.featureItem}>🤖 Intelligent AI opponent</Text>
        <Text style={styles.featureItem}>⚡ Ultra-smooth gameplay (60 FPS)</Text>
        <Text style={styles.featureItem}>🏆 Real-time scoreboard</Text>
        <Text style={styles.featureItem}>🎨 Neon visual effects</Text>
      </View>

      {/* How to Play */}
      <View style={styles.howtoBox}>
        <Text style={styles.sectionTitle}>🎯 How to Play</Text>
        <Text style={styles.howtoStep}>1. Tap PLAY to start the game</Text>
        <Text style={styles.howtoStep}>2. Tap/Swipe on the left side to move your paddle</Text>
        <Text style={styles.howtoStep}>3. Prevent the ball from passing your paddle</Text>
        <Text style={styles.howtoStep}>4. Make the ball pass the computer's paddle to score</Text>
        <Text style={styles.howtoStep}>5. Tap PAUSE to pause the game anytime</Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.startButtonText}>🚀 START GAME</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by Ayaan Junaid</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#00ff88',
    textShadowColor: 'rgba(0, 255, 136, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#00ccff',
    letterSpacing: 2,
    marginTop: 10,
  },
  descriptionBox: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderWidth: 2,
    borderColor: '#00ff88',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#00ccff',
    lineHeight: 20,
  },
  featuresBox: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderWidth: 2,
    borderColor: '#667eea',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 14,
    color: '#00ccff',
    marginBottom: 10,
    lineHeight: 18,
  },
  howtoBox: {
    backgroundColor: 'rgba(0, 204, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#00ccff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  howtoStep: {
    fontSize: 14,
    color: '#00ccff',
    marginBottom: 10,
    lineHeight: 18,
  },
  startButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#00ff88',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 255, 136, 0.3)',
  },
  footerText: {
    color: '#00ff88',
    fontSize: 14,
    fontWeight: 'bold',
  },
  versionText: {
    color: '#00ccff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;
