import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { PendingScreen } from './PendingScreen';

it('renders correctly', () => {
  const initialState = {
    loginInfo: {}
  };
  const mockStore = configureStore();

  renderer.create(
    <Provider store={mockStore(initialState)}>
      <PendingScreen />
    </Provider>
  );
});