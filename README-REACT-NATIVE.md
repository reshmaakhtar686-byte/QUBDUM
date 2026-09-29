# QUBDUM - React Native Version

A cross-platform mobile implementation of QUBDUM Pong game using React Native.

## Installation

### Prerequisites
- Node.js and npm installed
- React Native CLI: `npm install -g react-native-cli`
- Android Studio (for Android) or Xcode (for iOS)
- Android/iOS SDK configured

### Setup

```bash
# Clone the repository
git clone https://github.com/reshmaakhtar686-byte/QUBDUM.git
cd QUBDUM
git checkout react-native-version

# Install dependencies
npm install
# or
yarn install
```

## Running the App

### Android
```bash
npm run android
# or
react-native run-android
```

### iOS
```bash
npm run ios
# or
react-native run-ios
```

### Web (Expo)
```bash
npm run web
# or
expo start --web
```

## Building for Release

### Android APK
```bash
cd android
./gradlew assembleRelease
# APK located at: android/app/build/outputs/apk/release/
```

### Android App Bundle (Google Play Store)
```bash
npm run build:android
# AAB located at: android/app/build/outputs/bundle/release/
```

### iOS
```bash
npm run build:ios
```

## Publishing to Google Play Store

### 1. Create Developer Account
- Visit: https://play.google.com/console
- Sign in with Ayaan Junaid's Google account
- Pay $25 one-time developer fee

### 2. Sign the App

Generate a signing key:
```bash
keytool -genkey -v -keystore ~/qubdum.keystore -alias qubdum -keyalg RSA -keysize 2048 -validity 10000
```

Add to `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file('PATH_TO_KEYSTORE/qubdum.keystore')
        storePassword 'PASSWORD'
        keyAlias 'qubdum'
        keyPassword 'PASSWORD'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

### 3. Upload to Play Store

1. Go to Google Play Console
2. Create new app → Select "Games" → "Arcade"
3. Fill in app details:
   - **App name**: QUBDUM
   - **Developer name**: Ayaan Junaid
   - **Short description**: Play the classic Pong game against AI
   - **Full description**: A modern Pong game with intelligent AI opponent, smooth controls, and neon visuals

4. Go to **Release** → **Production**
5. Upload the signed AAB file
6. Add:
   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (min 2, max 8)
   - Privacy policy URL

7. Complete store listing questionnaire
8. Submit for review

## Project Structure

```
.
├── App.js                    # Main app entry
├── index.js                  # App registration
├── app.json                  # App config
├── package.json              # Dependencies
├── screens/
│   ├── HomeScreen.js         # Welcome & info
│   └── GameScreen.js         # Game logic & UI
└── README-REACT-NATIVE.md    # This file
```

## Features

✨ **Responsive Design**
- Adapts to any screen size
- Portrait orientation optimized
- Landscape mode support

🎮 **Touch Controls**
- Tap/swipe to move paddle
- Smooth response
- No keyboard needed

🤖 **AI Opponent**
- Intelligent ball tracking
- Adaptive difficulty
- Realistic gameplay

⚡ **Performance**
- 60 FPS smooth gameplay
- Optimized rendering
- Low battery usage

## Troubleshooting

### App won't start
```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Android build fails
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS build fails
```bash
cd ios
pod install
cd ..
npm run ios
```

## Performance Tips

- Use `--release` flag for testing performance
- Profile with React DevTools
- Monitor FPS using React Native Performance Monitor

## Support

Issues? Visit: https://github.com/reshmaakhtar686-byte/QUBDUM/issues

---

**Made by Ayaan Junaid** 🚀
