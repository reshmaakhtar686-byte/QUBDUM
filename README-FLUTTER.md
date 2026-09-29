# QUBDUM - Flutter Version

A fully native Flutter implementation of the QUBDUM Pong game for iOS and Android.

## Getting Started

### Prerequisites
- Flutter SDK installed ([flutter.dev](https://flutter.dev))
- Android Studio or Xcode
- A device or emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/reshmaakhtar686-byte/QUBDUM.git
   cd QUBDUM
   git checkout flutter-version
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Run the app**
   ```bash
   # Run on Android
   flutter run -d android
   
   # Run on iOS
   flutter run -d ios
   
   # Run on specific device
   flutter devices
   flutter run -d <device-id>
   ```

## Build for Release

### Android APK
```bash
flutter build apk --release
# Output: build/app/outputs/apk/release/app-release.apk
```

### Android App Bundle (for Google Play Store)
```bash
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

### iOS App
```bash
flutter build ios --release
```

## Deploying to Google Play Store

1. **Create a Google Play Developer account** ($25 one-time fee)
   - Visit: https://play.google.com/console
   - Sign in with your Google account (use Ayaan Junaid's account)
   - Pay the developer fee

2. **Create App Bundle**
   ```bash
   flutter build appbundle --release
   ```

3. **Sign the bundle** (first time only)
   ```bash
   keytool -genkey -v -keystore ~/qubdum-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias qubdum
   ```
   
   Then update `android/app/build.gradle` with signing config:
   ```gradle
   signingConfigs {
       release {
           keyAlias 'qubdum'
           keyPassword 'PASSWORD'
           storeFile file('~/qubdum-key.jks')
           storePassword 'PASSWORD'
       }
   }
   ```

4. **Upload to Google Play Console**
   - Go to Play Console
   - Select "Create app"
   - Fill in app details:
     - **App name**: QUBDUM
     - **Default language**: English
     - **App category**: Games > Arcade
   - Go to "Release" → "Production"
   - Upload the AAB file
   - Fill in store listing details
   - Submit for review

## Game Features

- 🎮 Swipe controls for player paddle
- 🤖 AI opponent with adaptive difficulty
- 📊 Real-time scoreboard
- ✨ Neon visual effects
- 📱 Optimized for mobile screens
- 🔄 Smooth 60+ FPS gameplay

## Dependencies

- **flame**: 2D game engine for Flutter
- **google_fonts**: Typography

## Project Structure

```
lib/
├── main.dart                    # App entry point
├── game/
│   ├── qubdum_game.dart        # Main game logic
│   └── components/
│       ├── ball.dart           # Ball physics
│       └── paddle.dart         # Paddle movement
```

## Troubleshooting

### App doesn't run
- Run `flutter doctor` to check setup
- Update Flutter: `flutter upgrade`
- Clean build: `flutter clean && flutter pub get`

### Performance issues
- Disable debug mode: Use `--release` flag
- Check device performance
- Profile with DevTools: `flutter pub global run devtools`

## Support

For issues, visit: https://github.com/reshmaakhtar686-byte/QUBDUM/issues
