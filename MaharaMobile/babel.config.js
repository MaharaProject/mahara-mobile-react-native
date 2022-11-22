module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'macros',
    [
      'module-resolver',
      { root: ['./src'], extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'] }
    ]
  ]
};
