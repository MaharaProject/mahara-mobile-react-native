import { i18n } from '@lingui/core';
import catalogEn from './locales/en/messages';
import catalogKo from './locales/ko/messages';

i18n.load('en', catalogEn.messages);
i18n.load('ko', catalogKo.messages);

export const changeActiveLanguage = (newActiveLanguage: string) => {
  i18n.activate(newActiveLanguage);
};

export default i18n;
