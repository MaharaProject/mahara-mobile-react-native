import React from 'react';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';
import { I18nProvider } from '@lingui/react';
import 'react-native-gesture-handler';
import configureStore from './store/store';
import AppNavigator from './navigations/app-navigator';
import { i18n } from './i18n';

global.Buffer = Buffer;

const App = () => {
  const store = configureStore(undefined, i18n);

  // Render the app container component with the provider around it
  return (
    <Provider store={store}>
      <I18nProvider i18n={i18n} language="en">
        <AppNavigator />
      </I18nProvider>
    </Provider>
  );
};

export default App;
