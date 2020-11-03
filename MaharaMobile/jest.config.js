module.exports = {
  preset: "react-native",
  "setupFiles": [
    "<rootDir>/jest/setup.js"
  ],
  transformIgnorePatterns: [
  'node_modules/(?!react-native|react-navigation|react-native-gesture-handler|react-native-animatable|react-native-vector-icons)/',
  '<rootDir>/lib/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
const {Response, Request, Headers, fetch} = require('whatwg-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;
