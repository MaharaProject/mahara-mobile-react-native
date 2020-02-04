import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import Profile from './Profile';

it('renders correctly', () => {
  renderer.create(<Profile />);
});
