import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { LoginScreen } from './LoginScreen';

it('renders correctly', () => {
  renderer.create(<LoginScreen />);
});
