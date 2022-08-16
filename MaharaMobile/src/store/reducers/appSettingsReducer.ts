import { SET_LANGUAGE } from 'utils/constants';
import { RootState } from './rootReducer';

export type AppSettingsState = {
  language: string;
};

const initialState: AppSettingsState = {
  language: 'en'
};

export const appSettingsReducer = (state = initialState, action: any): AppSettingsState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.lang
      };

    default:
      return state;
  }
};

// Selector
export const selectLanguage = (state: RootState) => state.uiState.appSettings.language;
