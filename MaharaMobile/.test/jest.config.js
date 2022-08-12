const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, '../'),
  testTimeout: 7500,
  preset: 'react-native',
  setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/.test/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-navigation|react-native-gesture-handler|react-native-animatable|react-native-vector-icons)/',
    '<rootDir>/lib/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/.test', '<rootDir>/src']
};
const { Response, Request, Headers, fetch } = require('whatwg-fetch');

global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;
