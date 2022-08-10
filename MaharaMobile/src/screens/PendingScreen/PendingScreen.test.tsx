// import {I18nProvider} from '@lingui/react';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
// import i18n from '../../i18n';
import PendingScreen from './PendingScreen';

jest.mock('rn-fetch-blob', () => true);

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

  const mockStore = configureStore();

  renderer.create(
    <Provider store={mockStore(initialState)}>
      {/* <I18nProvider i18n={i18n} language="en"> */}
      <PendingScreen route={() => jest.mock('route', () => {})} />
      {/* </I18nProvider> */}
    </Provider>
  );
});
