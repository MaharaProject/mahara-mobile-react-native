import 'react-native';
import React from 'react';
import SelectMediaScreen from './SelectMediaScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<SelectMediaScreen {...props} />);
});
