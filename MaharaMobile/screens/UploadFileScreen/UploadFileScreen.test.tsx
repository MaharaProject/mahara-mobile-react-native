import 'react-native';
import React from 'react';
import { UploadFileScreen } from './UploadFileScreen.tsx';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const tags = ['tagkey', 'tagkey2', 'tagkey3'];

  // const wrapper = renderer.create(<UploadFileScreen />);
  const renderer = new ShallowRenderer();
  renderer.render(<UploadFileScreen />);
  // const result = renderer.getRenderOutput();

  // const wrapper = shallow(<UploadFileScreen />);
  // wrapper.setState({selectedTags: tags});
  // const inst = wrapper.getInstance();

  expect(inst.setTags(tags)).toEqual('&tags[0]=t&tags[1]=a&tags[2]=g&tags[3]=s&tags[4]=');
});
