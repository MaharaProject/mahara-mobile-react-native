import { SET_LANGUAGE, TOGGLE_LANGUAGE } from 'utils/constants';

// appSettingsReducer

export function setLanguage(lang: string) {
  return {
    type: SET_LANGUAGE,
    lang
  };
}

export function toggleLanguage() {
  return {
    type: TOGGLE_LANGUAGE
  };
}
