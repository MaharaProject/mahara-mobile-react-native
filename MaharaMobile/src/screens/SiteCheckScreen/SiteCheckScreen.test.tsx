import {I18nProvider} from '@lingui/react';
import React from 'react';
import 'react-native';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import i18n from '../../i18n';
import SiteCheckScreen from './SiteCheckScreen';

it('renders correctly', () => {
  const initialState = {
    appState: {
      uploadFiles: {
        uploadFilesIds: []
      },
      uploadJEntries: {
        uploadJEntriesIds: []
      }
    },
    domainData: {
      loginInfo: {}
    }
  };

  const props = {
    url: '',
    navigation: jest.mock('', () => {})
  };

  const mockStore = configureStore();

  renderer.create(
    <Provider store={mockStore(initialState)}>
      <I18nProvider i18n={i18n} language="en">
        <SiteCheckScreen {...props} />
      </I18nProvider>
    </Provider>
  );
});
