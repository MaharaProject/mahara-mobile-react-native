import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import Spinner from './Spinner';

it('renders correctly', () => {
  renderer.create(<Spinner />);
});
