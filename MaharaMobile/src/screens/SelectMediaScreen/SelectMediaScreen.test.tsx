import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SelectMediaScreen from './SelectMediaScreen';

it('renders correctly', props => {
  renderer.create(<SelectMediaScreen {...props} />);
});
