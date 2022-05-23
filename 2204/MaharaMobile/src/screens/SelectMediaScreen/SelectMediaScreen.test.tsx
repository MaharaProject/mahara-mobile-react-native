import 'react-native';
import React from 'react';
// import {I18nProvider} from '@lingui/react';
import renderer from 'react-test-renderer';
// import {i18n} from '../../i18n';
import SelectMediaScreen from './SelectMediaScreen';

it('renders correctly', () => {
  const props = {
    navigation: {
      navigate: () => {
        // do nothing
      }
    }
  };

  renderer.create(
    // <I18nProvider i18n={i18n} language="en">
      <SelectMediaScreen {...props} />
    // </I18nProvider>
  );
});
