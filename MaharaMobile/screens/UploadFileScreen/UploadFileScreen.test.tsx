import 'react-native';
import React from 'react';
import { UploadFileScreen } from './UploadFileScreen.tsx';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// it('renders correctly', () => {
//   renderer.create(<UploadFileScreen />);
// });

it('renders correctly react-test-renderer', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UploadFileScreen />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
