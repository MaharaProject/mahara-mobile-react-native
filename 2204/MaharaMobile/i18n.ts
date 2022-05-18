import {setupI18n} from '@lingui/core';
import catalogEn from './locales/en/messages';
import catalogKo from './locales/ko/messages';

const i18n = setupI18n();
i18n.load({
  en: catalogEn
});

export const changeActiveLanguage = (newActiveLanguage: string) => {
  const catalog = {
    en: catalogEn,
    ko: catalogKo
  };
  i18n.load(catalog);
  i18n.activate(newActiveLanguage);
  return i18n;
};

export default i18n;
