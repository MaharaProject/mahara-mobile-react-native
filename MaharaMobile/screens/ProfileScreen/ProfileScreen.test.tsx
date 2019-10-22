import 'react-native';
import React from 'react';
import { ProfileScreen } from './ProfileScreen.tsx';
import renderer from 'react-test-renderer';

jest.mock('rn-fetch-blob', () => {
  return true
});

it('renders correctly', () => {
  renderer.create(<ProfileScreen />);
});
