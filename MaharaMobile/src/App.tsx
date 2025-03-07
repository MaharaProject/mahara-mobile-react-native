import React, { ReactElement, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';
import { config } from '@gluestack-ui/config';
import { NativeBaseProvider, useToast } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { I18nProvider } from '@lingui/react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import i18n, { changeActiveLanguage, supportedLanguages } from 'i18n';
import AppNavigator from 'navigation/AppNavigator';
import configureStore from 'store/store';
import { maharaTheme, maharaThemeBase } from 'utils/theme';

i18n.activate('en');

export function I18nProviderWrapper({ children }: { children: ReactElement }) {
    const toast = useToast();
    const FALL_BACK_LANG = 'en';
    const userLangTags = RNLocalize.getLocales().map((locale) => locale.languageTag);
    const bestFitLanguageTag = RNLocalize.findBestLanguageTag(userLangTags)?.languageTag;
    const langCode =
        RNLocalize.getLocales().find((locale) => locale.languageTag === bestFitLanguageTag)
            ?.languageCode || FALL_BACK_LANG;

    useEffect(() => {
        changeActiveLanguage(langCode, toast);
    }, [bestFitLanguageTag]);

    return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}

function App(): React.JSX.Element {
    const store = configureStore();

    return (
        <NativeBaseProvider theme={maharaThemeBase}>
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
