# Clubapp-Ionic

## Project Setup
- Install node.js https://nodejs.org/en/
- ```npm install -g cordova ionic```
- Clone this repository
- Navigate to the repository location
- ```npm install```

## Developing
To start developing in a browser (Google Chrome recommended):
- Terminal: ```ionic serve [--lab]```
- Enter dev mode by pressing ```ctrl-shift-i```

## Running app on an android emulator
- Terminal: ```ionic cordova emulate android```

## Running app on an android device
- Terminal: ```ionic cordova run android --device```

## Building an android debug .apk
- Terminal: ```ionic cordova build --debug android```
- .apk can be found in ./platforms/android/build/outputs/apk