import 'react-native';
import React from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '../../i18n';
import SelectMediaScreen from './SelectMediaScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  let props = {
    navigation: {navigate: () => {}}
  };

  renderer.create(
    <I18nProvider i18n={i18n} language="en">
      <SelectMediaScreen {...props} />
    </I18nProvider>
  );
});
