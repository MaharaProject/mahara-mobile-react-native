import {I18nProvider} from '@lingui/react';
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import i18n from '../../i18n';
import {SiteCheckScreen} from './SiteCheckScreen';

it('renders correctly', () => {
  const props = {
    url: ''
  };

  renderer.create(
    <I18nProvider i18n={i18n} language="en">
      <SiteCheckScreen {...props} />
    </I18nProvider>
  );
});
