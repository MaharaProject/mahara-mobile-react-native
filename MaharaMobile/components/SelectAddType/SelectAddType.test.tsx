import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import SelectAddType from './SelectAddType';

it('renders correctly', () => {
  renderer.create(<SelectAddType />);
});
