# Mahara Mobile

Mahara Mobile is built using TypeScript, Redux, LinguiJS, and React/React Native.
It uses Metro, the JavaScript bundler for React Native to join the code and all its dependencies together.

## Setup

This project uses React Native. For first time set up, inside the `/MaharaMobile` folder, run:

 ```bash
 npm install && npm start
 ```

To start project run the below. You will additionally need a device (real or virtual), and run either the Android or iOS commands below to view the app. Note you will also need an Apple device to do iOS testing and deployment.

To generate and run Android:

```bash
npm run android
```

To generate and run iOS:

```bash
npm run ios
```

## Translations

We are using linguiJS for translation <https://lingui.js.org/>

Follow documentation on how to wrap strings so they get picked up then run:

```bash
# update catalog
npm run extract
# uppdate translations
npm run compile # then refresh refresh environment

To extract the strings into a PO file under /locales.

## Troubleshooting

See GitLab WiKi page for some specific troubleshooting team members might have run into.

## Architecture

Source files are in /src

/actions -- actions for Redux (interaction with store) and all API calls

/assets -- fonts, images, etc

/components -- generally try to keep components for display, and pass through logic via props from container (screen) -> component, with only some exceptions

/models -- typescript models, for typing custom objects/parts

/navigations -- for specifying navigation for the app

/reducers -- for receiving actions to update state, separated by function

/screens -- screens/pages for the app - these contain the bulk of the logic and in lieu of routes

/store -- where the store (global state) is configured

/utils -- reusable helpers
