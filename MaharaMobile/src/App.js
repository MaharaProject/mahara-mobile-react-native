import React from 'react';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import {Provider} from 'react-redux';
import {Buffer} from 'buffer';
import {I18nProvider} from '@lingui/react';
import 'react-native-gesture-handler';
import configureStore from './store/store';
import AppNavigator from './navigations/app-navigator';
import i18n from './i18n';

global.Buffer = Buffer;

if (Config.SENTRY_DSN) {
  Sentry.init({dsn: Config.SENTRY_DSN});
  Sentry.setTag('mobile-app', '2');
}

const App = () => {
  const store = configureStore(undefined, i18n);

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