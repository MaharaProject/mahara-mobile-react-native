module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
  plugins: [
    'macros',
    [
      'module-resolver',
      { root: ['./src'], extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'] }
    ]
  ]
};
