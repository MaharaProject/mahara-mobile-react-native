import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from 'react-native/Libraries/NewAppScreen';

it('renders correctly', () => {
  renderer.create(<Header />);
});
