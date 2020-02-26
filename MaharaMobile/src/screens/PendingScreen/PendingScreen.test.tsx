import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import PendingScreen from './PendingScreen';
// import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('rn-fetch-blob', () => {
  return true;
});

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
      <I18nProvider i18n={i18n} language="en">
        <PendingScreen />
      </I18nProvider>
    </Provider>
  );
});