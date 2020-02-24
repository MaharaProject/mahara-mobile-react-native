import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {SiteCheckScreen} from './SiteCheckScreen';

it('renders correctly', () => {
  let props;
  renderer.create(<SiteCheckScreen {...props} />);
});
