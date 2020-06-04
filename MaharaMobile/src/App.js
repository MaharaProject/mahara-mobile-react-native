import {I18nProvider} from '@lingui/react';
import * as Sentry from '@sentry/react-native';
import {Buffer} from 'buffer';
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import i18n, {changeActiveLanguage} from './i18n';
import AppNavigator from './navigations/app-navigator';
import configureStore from './store/store';

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
      <I18nProviderWrapper>
        <AppNavigator />
      </I18nProviderWrapper>
    </Provider>
  );
};

export const I18nProviderWrapper = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [i18nInstance, setI18nInstance] = useState(i18n);

  const toggleLanguage = () => {
    const defaultLang = 'en';
    const langTags = RNLocalize.getLocales().map(locale => locale.languageTag);
    const langTag = RNLocalize.findBestAvailableLanguage(langTags).languageTag;

    let langCode = defaultLang;

    RNLocalize.getLocales().forEach(locale => {
      if (locale.languageTag === langTag) {
        langCode = locale.languageCode;
      }
    });

    const updatedI18nInstance = changeActiveLanguage(langCode);
    setActiveLanguage(langCode);
    setI18nInstance(updatedI18nInstance);
  };

  useEffect(() => {
    toggleLanguage();
  }, [activeLanguage]);

  return (
    <I18nProvider language={activeLanguage} i18n={i18nInstance}>
      <AppNavigator />
    </I18nProvider>
  );
};

export default App;
