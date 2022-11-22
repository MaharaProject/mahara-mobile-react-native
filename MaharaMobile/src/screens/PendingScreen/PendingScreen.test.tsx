import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from 'test-utils';
import PendingScreen from './PendingScreen';

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

  render(
    <Provider store={mockStore(initialState)}>
      <PendingScreen route={() => jest.mock('route', () => {})} />
    </Provider>
  );
});
