import 'react-native';
import React from 'react';
import { LoginScreen } from './LoginScreen.tsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<LoginScreen />);
});
