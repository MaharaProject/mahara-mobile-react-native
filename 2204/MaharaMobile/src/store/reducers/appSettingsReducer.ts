// import {Catalogs} from '@lingui/core';
import {SET_CATALOGS, SET_LANGUAGE} from '../../utils/constants';
import {RootState} from './rootReducer';

export type AppSettingsState = {
  language: string;
  // catalogs: Catalogs;
};

const initialState: AppSettingsState = {
  language: 'en',
  catalogs: {}
};

export const appSettingsReducer = (
  state = initialState,
  action: any
): AppSettingsState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.lang
      };
    case SET_CATALOGS:
      return {
        ...state,
        catalogs: action.catalogs
      };
    default:
      return state;
  }
};

// Selector
export const selectLanguage = (state: RootState) =>
  state.uiState.appSettings.language;
export const selectCatalogs = (state: RootState) =>
  state.uiState.appSettings.catalogs;
