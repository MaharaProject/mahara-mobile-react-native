# react native Mahara Mobile rebuild

Rebuild of Mahara Mobile in React Native.

## Setup

This project uses React Native. For first time set up run:

 ```
 npm install
 ```
To start project run the below. You will additionally need a device (real or virtual), and run either the Android or iOS commands below to view the app. Note you will also need an Apple device to do iOS testing and deployment.

```
npm run start
```
To generate and run Android:

```
npm run android
```

To generate and run iOS:

```
npm run ios
```

## Translations
We are using linguiJS for translation https://lingui.js.org/

Follow documentation on how to wrap strings so they get picked up then run:

```
npm run extract
```

To extract the strings into a PO file under /locales. 
