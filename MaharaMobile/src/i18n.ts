import { i18n } from '@lingui/core';
import { en, fr, ko } from 'make-plural';
import catalogEn from '../locales/en/messages';
import catalogFr from '../locales/fr/messages';
import catalogKo from '../locales/ko/messages';

i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
  ko: { plurals: ko }
});

i18n.load({ en: catalogEn.messages, fr: catalogFr.messages, ko: catalogKo.messages });

export const changeActiveLanguage = (newActiveLanguage: string) => {
  i18n.activate(newActiveLanguage);
};

export default i18n;
