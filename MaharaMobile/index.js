import App from 'app';
import { AppRegistry } from 'react-native';
import { codegenConfig as config } from './package.json';

AppRegistry.registerComponent(config.name, () => App);
