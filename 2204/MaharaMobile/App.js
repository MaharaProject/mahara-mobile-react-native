/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import i18n, {changeActiveLanguage} from './i18n';
import type {Node} from 'react';
import {Root, StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';

import {Provider} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator';
import commonColor from './native-base-theme/variables/commonColor';

// import getTheme from '../native-base-theme/components';
import {NativeBaseProvider, Box} from 'native-base';
import * as RNLocalize from 'react-native-localize';
import {I18nProvider} from '@lingui/react';
import configureStore from './src/store/store';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const store = configureStore(undefined, i18n);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    // <Root>
    //   <Provider store={store}>
    //     <StyleProvider style={getTheme(commonColor)}>
    //       <I18nProviderWrapper>
    //         <AppNavigator />
    //       </I18nProviderWrapper>
    //     </StyleProvider>
    //   </Provider>
    // </Root>
    // <SafeAreaView>
    //   <Root>
    //     {/* <Provider store={store}>
    //       <StyleProvider style={getTheme(commonColor)}>
    //         <I18nProviderWrapper>
    //           <AppNavigator />
    //         </I18nProviderWrapper>
    //       </StyleProvider>
    //     </Provider> */}
    //   </Root>
    // </SafeAreaView>
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.js</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
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
