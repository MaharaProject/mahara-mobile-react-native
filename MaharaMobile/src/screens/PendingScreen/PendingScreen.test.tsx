import 'react-native';
import React from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '../../i18n';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { PendingScreen } from './PendingScreen';

it('renders correctly', () => {
  const initialState = {
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