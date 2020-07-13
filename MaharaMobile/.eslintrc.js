module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/react', 'prettier/@typescript-eslint'],
  plugins: ['react', 'prettier', '@typescript-eslint', 'react-native'],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "curly": 2,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "prettier/prettier": "error",
    "react/destructuring-assignment": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/self-closing-comp": 1,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", "jsx", ".ts", ".tsx"]
      }
    ],
    "prefer-destructuring": 1,
    "no-console": 1,
    "no-unused-expressions": ["error", { "allowTernary": true }],
    "no-unused-vars": 0,
    "max-len": ["error", 140],
    "comma-dangle": ["error", "never"],
    // config needed after npm upgrade
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true,
    "jest": true
  },
  // settings config needed after npm upgrade
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    },
  },

};
