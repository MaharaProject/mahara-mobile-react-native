import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from 'test-utils';
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

  render(
    <Provider store={mockStore(initialState)}>
      {/* <I18nProvider i18n={i18n} language="en"> */}
      <SiteCheckScreen {...props} />
      {/* </I18nProvider> */}
    </Provider>
  );
});
