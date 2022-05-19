/**
 * Mahara Mobile React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import i18n, { changeActiveLanguage } from './src/i18n';

import type { Node } from 'react';

import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Root } from 'native-base';
import AppNavigator from './src/navigation/AppNavigator';

// import getTheme from '../native-base-theme/components';
// import {NativeBaseProvider, Box} from 'native-base';
import * as RNLocalize from 'react-native-localize';
import { I18nProvider } from '@lingui/react';
import configureStore from './src/store/store';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const store = configureStore(undefined, i18n);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    // Need to add theme back
    // <NativeBaseProvider>
    <Root>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </Root>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export const I18nProviderWrapper = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [i18nInstance, setI18nInstance] = useState(i18n);

  const toggleLanguage = () => {
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
    <I18nProvider language={activeLanguage} i18n={i18nInstance}>
      <AppNavigator />
    </I18nProvider>
  );
};

export default App;
