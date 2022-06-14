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
import catalogEn from './locales/en/messages';
import catalogKo from './locales/ko/messages';
// import { en, ko } from 'make-plural/plurals';
import { i18n } from '@lingui/core';
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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // const store = configureStore(undefined, i18n);
  const store = configureStore(undefined);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let messages = {
    en: catalogEn,
    ko: catalogKo,
  };
  i18n.load(messages);
  i18n.activate('en');

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

const I18nProviderWrapper = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');

  const toggleLanguage = () => {
    const defaultLang = 'en';
    const langTags = RNLocalize.getLocales().map(
      (locale) => locale.languageTag
    );
    const langTag = RNLocalize.findBestAvailableLanguage(langTags).languageTag;
    let langCode = defaultLang;

    // RNLocalize.getLocales().forEach((locale) => {
    //   if (locale.languageTag === langTag) {
    //     langCode = locale.languageCode;
    //   }
    // });

    // i18n.load(langCode);
    // setActiveLanguage(langCode);
    // i18n.activate(langCode);
  };
  // useEffect(() => {
  //   toggleLanguage();
  // }, [activeLanguage]);

  return (
    <I18nProvider language={activeLanguage} i18n={i18n}>
      <AppNavigator />
    </I18nProvider>
  );
};

export default App;
