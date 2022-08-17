import React, { ReactElement, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import { I18nProvider } from '@lingui/react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import i18n, { changeActiveLanguage } from 'i18n';
import AppNavigator from 'navigation/AppNavigator';
import configureStore from 'store/store';
import { maharaTheme } from 'utils/theme';

export function I18nProviderWrapper({ children }: { children: ReactElement }) {
  useEffect(() => {
    const FALL_BACK_LANG = 'en';
    const userLangTags = RNLocalize.getLocales().map((locale) => locale.languageTag);
    const bestFitLanguageTag = RNLocalize.findBestAvailableLanguage(userLangTags)?.languageTag;

    const langCode =
      RNLocalize.getLocales().find((locale) => locale.languageTag === bestFitLanguageTag)
        ?.languageCode || FALL_BACK_LANG;

    changeActiveLanguage(langCode);
  }, []);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}

function App() {
  const store = configureStore();

  return (
    <NativeBaseProvider theme={maharaTheme}>
      <StatusBar backgroundColor={maharaTheme.colors.green} />
      <Provider store={store}>
        <I18nProviderWrapper>
          <AppNavigator />
        </I18nProviderWrapper>
      </Provider>
    </NativeBaseProvider>
  );
}

export default App;
