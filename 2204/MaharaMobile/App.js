/**
 * Mahara Mobile React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
// import { Root, StyleProvider } from 'native-base';
import { extendTheme, NativeBaseProvider } from 'native-base';

// import i18n, { changeActiveLanguage } from './src/i18n';

import type { Node } from 'react';

import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator';

// import getTheme from '../native-base-theme/components';
// import {NativeBaseProvider, Box} from 'native-base';
import * as RNLocalize from 'react-native-localize';
// import { I18nProvider } from '@lingui/react';
import configureStore from './src/store/store';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // const store = configureStore(undefined, i18n);
  const store = configureStore(undefined);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: '#576c36',
      info: '#ba9b59',
      success: '#3c4c23',
      danger: '#a9000d',
      warning: '#b9a34b',
      dark: '#000',
      light: '#FFF',
    },
    // Redefining only one shade, rest of the color will remain same.
  });

  return (
    // Need to add theme back
    // <NativeBaseProvider>
    // <Root>
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        {/* <StyleProvider style={getTheme(commonColor)}> */}
        {/* <I18nProviderWrapper> */}
        <AppNavigator />
        {/* </I18nProviderWrapper> */}
        {/* </StyleProvider> */}
      </Provider>
    </NativeBaseProvider>
    // </Root>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

// export const I18nProviderWrapper = () => {
//   const [activeLanguage, setActiveLanguage] = useState('en');
//   const [i18nInstance, setI18nInstance] = useState(i18n);

//   const toggleLanguage = () => {
//     const defaultLang = 'en';
//     const langTags = RNLocalize.getLocales().map(
//       (locale) => locale.languageTag
//     );
//     const langTag = RNLocalize.findBestAvailableLanguage(langTags).languageTag;

//     let langCode = defaultLang;

//     RNLocalize.getLocales().forEach((locale) => {
//       if (locale.languageTag === langTag) {
//         langCode = locale.languageCode;
//       }
//     });

//     const updatedI18nInstance = changeActiveLanguage(langCode);
//     setActiveLanguage(langCode);
//     setI18nInstance(updatedI18nInstance);
//   };

//   useEffect(() => {
//     toggleLanguage();
//   }, [activeLanguage]);

//   return (
//     <I18nProvider language={activeLanguage} i18n={i18nInstance}>
//       <AppNavigator />
//     </I18nProvider>
//   );
// };

export default App;
