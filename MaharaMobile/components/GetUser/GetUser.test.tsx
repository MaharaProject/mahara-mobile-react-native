import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import GetUser from './GetUser.tsx';

it('renders correctly', () => {
  renderer.create(<GetUser />);
});
