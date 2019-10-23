import 'react-native';
import React from 'react';
import { ProfileScreen } from './ProfileScreen.tsx';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('rn-fetch-blob', () => {
  return true
});

it('renders correctly react-test-renderer', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ProfileScreen />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
