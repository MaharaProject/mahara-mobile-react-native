import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { I18nProvider } from '@lingui/react';
import { SiteCheckScreen } from './SiteCheckScreen';
import { i18n } from '../../i18n';

it('renders correctly', () => {
  let props = {
    url: ''
  };

  renderer.create(
    <I18nProvider i18n={i18n} language="en">
      <SiteCheckScreen {...props} />
    </I18nProvider>);
});
