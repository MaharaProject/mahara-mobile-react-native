module.exports = {
  root: true,
  extends: ['prettier', 'airbnb', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'prettier/react'],
  plugins: ['react', 'prettier', '@typescript-eslint', 'react-native'],
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  }
};
