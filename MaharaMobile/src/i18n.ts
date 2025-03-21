import { Button, useToast } from '@gluestack-ui/themed-native-base';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { en, es, fr, ko, ru } from 'make-plural';
import { Alert } from 'react-native';
import catalogEn from '../locales/en/messages';
import catalogEs from '../locales/es/messages';
import catalogFr from '../locales/fr/messages';
import catalogKo from '../locales/ko/messages';
import catalogRu from '../locales/ru/messages';

export const supportedLanguages = {
    en: catalogEn.messages,
    fr: catalogFr.messages,
    ko: catalogKo.messages,
    ru: catalogRu.messages,
    es: catalogEs.messages
};
i18n.load(supportedLanguages);

/**
 * Display a toast on the screen to inform the user that their device language is not supported
 *
 * @param toast a toast object from Gluestack
 */
function displayLanguageToast(toast: any, title: string, description: string) {
    toast.show({ placement: 'top', title, description });
}

export const changeActiveLanguage = (newActiveLanguage: string, toast: any) => {
    const supportedLangsKeys = Object.keys(supportedLanguages);
    if (supportedLangsKeys.includes(newActiveLanguage)) {
        i18n.activate(newActiveLanguage);
    } else {
        i18n.activate('en');
        const title = t`Device language is not supported`;
        const description = `${t`The app will display in 'en' instead of '` + newActiveLanguage}'`;
        displayLanguageToast(toast, title, description);
    }
};

export default i18n;
