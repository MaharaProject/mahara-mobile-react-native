import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SelectMediaType from './SelectMediaType';

it('renders correctly', () => {
  renderer.create(<SelectMediaType />);
});
