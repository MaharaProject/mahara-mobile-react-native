import { i18n } from '@lingui/core';
import { en, fr, ko } from 'make-plural';
import { Alert } from 'react-native';
import { t } from '@lingui/macro';
import { useToast, Button } from '@gluestack-ui/themed-native-base'
import catalogEn from '../locales/en/messages';
import catalogFr from '../locales/fr/messages';
import catalogKo from '../locales/ko/messages';


const supportedLanguages = {
    en: catalogEn.messages,
    fr: catalogFr.messages,
    ko: catalogKo.messages
};
i18n.load(supportedLanguages);


/**
 * Display a toast on the screen to inform the user that their device language is not supported
 * 
 * @param toast a toast object from Gluestack
 */
function displayLanguageToast(toast: any, title: string, description: string) {
  toast.show({ placement: 'top', title, description, duration: '4000' });
};


export const changeActiveLanguage = (newActiveLanguage: string, toast: any) => {

    if (newActiveLanguage in supportedLanguages) {
        i18n.activate(newActiveLanguage);
    } else {
      i18n.activate('en');

      const title = t`Device language is not supported`;
      const description = `${t`The app will display in 'en' instead of '` + newActiveLanguage}'`;
      displayLanguageToast(toast, title, description);
    }
};

export default i18n;
