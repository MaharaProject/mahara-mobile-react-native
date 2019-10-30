import 'react-native';
import React from 'react';
import { AddScreen } from './AddScreen.tsx';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const tags = ['tagkey', 'tagkey2', 'tagkey3'];

  // const wrapper = renderer.create(<AddScreen />);
  const renderer = new ShallowRenderer();
  renderer.render(<AddScreen />);
  // const result = renderer.getRenderOutput();

  // const wrapper = shallow(<AddScreen />);
  // wrapper.setState({selectedTags: tags});
  // const inst = wrapper.getInstance();

  expect(inst.setTags(tags)).toEqual('&tags[0]=t&tags[1]=a&tags[2]=g&tags[3]=s&tags[4]=');
});
