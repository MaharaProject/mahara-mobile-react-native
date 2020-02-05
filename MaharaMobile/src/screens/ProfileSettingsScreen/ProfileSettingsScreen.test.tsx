import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ProfileScreen } from './ProfileScreen';

jest.mock('rn-fetch-blob', () => {
  return true
});

it('renders correctly', () => {
  renderer.create(<ProfileScreen />);
});

// Below set up for snapshot when component is complete

// it('renders correctly react-test-renderer', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<ProfileScreen />);
//   const result = renderer.getRenderOutput();
//
//   expect(result).toMatchSnapshot();
// });
