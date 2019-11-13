module.exports = {
  root: true,
  extends: ['prettier', 'airbnb', 'prettier/@typescript-eslint', 'prettier/react'],
  plugins: ['react', 'react-native'],
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  }
};
