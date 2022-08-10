module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  rules: {
    '@typescript-eslint/default-param-last': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx', '.ts', '.tsx'] }],
    'react/no-unstable-nested-components': 'warn',
    'prefer-destructuring': 1,
    'no-console': 1,
    'no-unused-expressions': ['error', { allowTernary: true }],
    '@typescript-eslint/no-empty-function': 'warn'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true
  }
};
