import 'react-native';
import React from 'react';
import AddScreen from './AddScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<AddScreen {...props} />);
});
