import 'react-native';
import React from "react";
import renderer from 'react-test-renderer';
import Form from './Form.tsx';

it('renders correctly', () => {
  renderer.create(<Form />);
});
