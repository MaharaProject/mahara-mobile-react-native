import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { LoginScreen } from './LoginScreen.tsx';

it('renders correctly', () => {
  renderer.create(<LoginScreen />);
});
