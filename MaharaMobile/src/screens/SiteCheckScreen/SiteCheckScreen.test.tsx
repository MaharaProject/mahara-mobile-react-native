import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { SiteCheckScreen } from './SiteCheckScreen';

it('renders correctly', () => {
  let props;
  renderer.create(<SiteCheckScreen {...props} />);
});
