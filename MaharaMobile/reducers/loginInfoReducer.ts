import {
  UPDATE_SERVER_URL,
  ADD_TOKEN,
  UPDATE_USERNAME,
} from '../utils/constants';
import { RootState } from './reducers';

type LoginInfoState = {
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  token: string;
  userName: string;
};

const initialState: LoginInfoState = {
  url: '',
  tokenLogin: false,
  ssoLogin: false,
  localLogin: false,
  token: '',
  userName: '',
};

export const loginInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_SERVER_URL:
      return {
        ...state,
        url: action.url,
        tokenLogin: action.tokenLogin,
        ssoLogin: action.ssoLogin,
        localLogin: action.localLogin,
      };
    case ADD_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
};

// Selector
export const selectUrl = (state: RootState) => state.domainData.loginInfo.url;
export const selectTokenLogin = (state: RootState) => state.domainData.loginInfo.tokenLogin;
export const selectSsoLogin = (state: RootState) => state.domainData.loginInfo.ssoLogin;
export const selectLocalLogin = (state: RootState) => state.domainData.loginInfo.localLogin;
export const selectToken = (state: RootState) => state.domainData.loginInfo.token;
export const selectUserName = (state: RootState) => state.domainData.loginInfo.userName;
