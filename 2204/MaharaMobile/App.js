/**
 * Mahara Mobile React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { I18nProvider } from '@lingui/react';
import { en } from 'make-plural/plurals';
import catalogEn from './locales/en/messages';
import catalogKo from './locales/ko/messages';
// import { i18n } from '@lingui/core';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator';

// import getTheme from '../native-base-theme/components';
// import {NativeBaseProvider, Box} from 'native-base';
import * as RNLocalize from 'react-native-localize';
// import { I18nProvider } from '@lingui/react';
import configureStore from './src/store/store';
import { maharaTheme } from './src/utils/theme';
import { i18n, changeActiveLanguage } from './i18n';

const App: () => Node = () => {
  const store = configureStore(undefined, i18n);
  // const store = configureStore(undefined);

  // i18n.loadLocaleData('en', { plurals: en });
  // i18n.load('en', catalogEn.messages);
  // i18n.activate('en');

  return (
    // Need to add theme back
    // <NativeBaseProvider>
    // <Root>
    <NativeBaseProvider theme={maharaTheme}>
      <Provider store={store}>
        {/* <StyleProvider style={getTheme(commonColor)}> */}
        <I18nProviderWrapper>
          <AppNavigator />
        </I18nProviderWrapper>
        {/* </StyleProvider> */}
      </Provider>
    </NativeBaseProvider>
    // </Root>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export const I18nProviderWrapper = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [i18nInstance, setI18nInstance] = useState(i18n);

  const toggleLanguage = () => {
    console.log('toggling language');
    const defaultLang = 'en';
    const langTags = RNLocalize.getLocales().map(
      (locale) => locale.languageTag
    );
    const langTag = RNLocalize.findBestAvailableLanguage(langTags).languageTag;

    let langCode = defaultLang;

    RNLocalize.getLocales().forEach((locale) => {
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
    <I18nProvider
      // language={activeLanguage}
      i18n={i18nInstance}>
      <AppNavigator />
    </I18nProvider>
  );
};

export default App;
