import { RootState } from './rootReducer';
import { UPDATE_SERVER_URL, ADD_TOKEN, UPDATE_USERNAME, CLEAR_LOGIN_INFO, UPDATE_LOGIN_TYPES, UPDATE_URL, UPDATE_PROFILE_ICON, UPDATE_GUEST_STATUS, SET_DEFAULT_BLOG, SET_DEFAULT_FOLDER } from '../utils/constants';
import { UserFolder, UserBlog } from '../models/models';
import { selectUserBlogs, selectUserFolders } from './userArtefactsReducer';
import { useSelector } from 'react-redux';

type LoginInfoState = {
  url: string;
  token: string;
  userName: string;
  profileIcon: string;
  // available login methods
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  // default preferences
  defaultFolderTitle: string;
  defaultBlogId: number;
};

// Helpers
const userBlogs = (state: RootState) => state.domainData.userBlogs;
const userFolders = (state: RootState) => state.domainData.userFolders;

const initialState: LoginInfoState = {
  url: '',
  tokenLogin: false,
  ssoLogin: false,
  localLogin: false,
  token: '',
  userName: '',
  profileIcon: '',
  defaultBlogId: userBlogs[0],
  defaultFolderTitle: userFolders[0]
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
    case SET_DEFAULT_BLOG:
      return {
        ...state,
        defaultBlogId: action.blogId
      };
    case SET_DEFAULT_FOLDER:
      return {
        ...state,
        defaultFolderTitle: action.folderTitle
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
export const selectDefaultBlogId = (state: RootState) => state.domainData.loginInfo.defaultBlogId;
export const selectDefaultFolderTitle = (state: RootState) => state.domainData.loginInfo.defaultFolderTitle;

