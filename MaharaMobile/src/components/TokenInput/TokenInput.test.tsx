import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TokenInput from './TokenInput';

it('renders correctly', () => {
  renderer.create(<TokenInput />);
});
