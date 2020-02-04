import React from 'react';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';
import { I18nProvider } from '@lingui/react';
import 'react-native-gesture-handler';
import configureStore from './store/store';
import AppNavigator from './navigations/app-navigator';

global.Buffer = Buffer;

const App = () => {
  const store = configureStore();

  // Render the app container component with the provider around it
  return (
    <Provider store={store}>
      <I18nProvider language="en">
        <AppNavigator />
      </I18nProvider>
    </Provider>
  );
};

export default App;