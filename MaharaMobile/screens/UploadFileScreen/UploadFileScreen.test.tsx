import 'react-native';
import React from 'react';
import { UploadFileScreen } from './UploadFileScreen.tsx';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const tags = {
    'tagkey': 'newtag',
    'tagkey2' : 'newtag2',
    'tagkey3' : 'anothertag'
  };

  const wrapper = renderer.create(<UploadFileScreen />);
  const inst = wrapper.getInstance();
  expect(inst.setTags('tags')).toEqual('&tags[0]=t&tags[1]=a&tags[2]=g&tags[3]=s&tags[4]=');
});
