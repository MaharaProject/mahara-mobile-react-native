import 'react-native';
import React from 'react';
import { AddScreen } from './AddScreen.tsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tags = ['tagkey', 'tagkey2', 'tagkey3'];

  const wrapper = renderer.create(<AddScreen />);
  const inst = wrapper.getInstance();

  expect(inst.setTags(tags)).toEqual('&tags[0]=tagkey&tags[1]=tagkey2&tags[2]=tagkey3&tags[3]=');
});
