/**
 * Mahara Mobile React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import * as RNLocalize from 'react-native-localize';
import { I18nProvider } from '@lingui/react';
import i18n, { changeActiveLanguage } from './i18n';
import configureStore from './src/store/store';
import { maharaTheme } from './src/utils/theme';

const App: () => Node = () => {
  const store = configureStore(undefined, i18n);

  return (
    <NativeBaseProvider theme={maharaTheme}>
      <Provider store={store}>
        <I18nProviderWrapper>
          <AppNavigator />
        </I18nProviderWrapper>
      </Provider>
    </NativeBaseProvider>
  );
};

export const I18nProviderWrapper = ({ children }) => {
  useEffect(() => {
    const FALL_BACK_LANG = 'en';
    const userLangTags = RNLocalize.getLocales().map((locale) => locale.languageTag);
    const bestFitLanguageTag = RNLocalize.findBestAvailableLanguage(userLangTags).languageTag;

    const langCode =
      RNLocalize.getLocales().find((locale) => locale.languageTag === bestFitLanguageTag)
        .languageCode || FALL_BACK_LANG;

    changeActiveLanguage(langCode);
  }, []);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default App;
