import { AppRegistry } from 'react-native';
import { codegenConfig as config } from './package.json';
import App from './src/App';

AppRegistry.registerComponent(config.name, () => App);
