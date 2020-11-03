import {I18nProvider} from '@lingui/react';
import * as Sentry from '@sentry/react-native';
import {Buffer} from 'buffer';
import {Root, StyleProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import 'react-native-gesture-handler';
import * as RNLocalize from 'react-native-localize';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import i18n, {changeActiveLanguage} from './i18n';
import configureStore from './store/store';
import AppNavigator from './navigation/AppNavigator';

global.Buffer = Buffer;

if (Config.SENTRY_DSN) {
  Sentry.init({dsn: Config.SENTRY_DSN});
  Sentry.setTag('mobile-app', '2');
}

const App = () => {
  const store = configureStore(undefined, i18n);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Render the app container component with the provider around it
  return (
    <Root>
      <Provider store={store}>
        <StyleProvider style={getTheme(commonColor)}>
          <I18nProviderWrapper>
            <AppNavigator />
          </I18nProviderWrapper>
        </StyleProvider>
      </Provider>
    </Root>
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
