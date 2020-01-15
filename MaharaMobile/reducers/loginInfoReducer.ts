import {
  UPDATE_SERVER_URL,
  ADD_TOKEN,
  UPDATE_USERNAME,
  CLEAR_LOGIN_INFO,
  UPDATE_LOGIN_TYPES,
  UPDATE_URL,
  UPDATE_PROFILE_ICON,
  UPDATE_GUEST_STATUS
} from '../utils/constants';
import { RootState } from './rootReducer';

type LoginInfoState = {
  url: string;
  token: string;
  userName: string;
  isGuest: boolean;
  profileIcon: string;
  // available login methods
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
};

const initialState: LoginInfoState = {
  url: '',
  tokenLogin: false,
  ssoLogin: false,
  localLogin: false,
  token: '',
  userName: '',
  isGuest: false,
  profileIcon: ''
};

export const loginInfoReducer = (
  state = initialState,
  action: any
): LoginInfoState => {
  switch (action.type) {
    case UPDATE_SERVER_URL:
      return {
        ...state,
        url: action.url
      };
    case ADD_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        userName: action.userName
      };
    case CLEAR_LOGIN_INFO:
      return initialState;
    case UPDATE_LOGIN_TYPES:
      return {
        ...state,
        localLogin: action.localLogin,
        ssoLogin: action.ssoLogin,
        tokenLogin: action.tokenLogin
      };
    case UPDATE_URL:
      return {
        ...state,
        url: action.url
      };
    case UPDATE_PROFILE_ICON:
      return {
        ...state,
        profileIcon: action.profileIcon
      };
    case UPDATE_GUEST_STATUS:
      return {
        ...state,
        isGuest: action.isGuest
      };
    default:
      return state;
  }
};

// Selector
export const selectUrl = (state: RootState) => state.domainData.loginInfo.url;
export const selectTokenLogin = (state: RootState) => state.domainData.loginInfo.tokenLogin;
export const selectSsoLogin = (state: RootState) =>  state.domainData.loginInfo.ssoLogin;
export const selectLocalLogin = (state: RootState) =>  state.domainData.loginInfo.localLogin;
export const selectToken = (state: RootState) =>  state.domainData.loginInfo.token;
export const selectUserName = (state: RootState) =>  state.domainData.loginInfo.userName;
export const selectAllLoginInfo = (state: RootState) =>  state.domainData.loginInfo;
export const selectProfileIcon = (state: RootState) =>  state.domainData.loginInfo.profileIcon;
export const selectIsGuestStatus = (state: RootState) =>  state.domainData.loginInfo.isGuest;
