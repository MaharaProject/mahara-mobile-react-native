import { LoginInfoActions } from 'models/loginInfoTypes';
import {
    ADD_TOKEN,
    CLEAR_LOGIN_INFO,
    SET_DEFAULT_BLOG,
    SET_DEFAULT_FOLDER,
    SET_DID_TRY_AL,
    UPDATE_GUEST_STATUS,
    UPDATE_LOGIN_TYPES,
    UPDATE_PROFILE_ICON,
    UPDATE_SERVER_URL,
    UPDATE_URL,
    UPDATE_USERNAME
} from 'utils/constants';
import { RootState } from './rootReducer';

type LoginInfoState = {
    url: string;
    token: string;
    userName: string;
    profileIcon: string;
    isGuest: boolean;
    didTryAutoLogin: boolean;
    // available login methods
    tokenLogin: boolean;
    ssoLogin: boolean;
    localLogin: boolean;
    // default preferences
    defaultFolderTitle: string;
    defaultBlogTitle: string;
};

// Helpers

const initialState: LoginInfoState = {
    url: '',
    tokenLogin: false,
    ssoLogin: false,
    localLogin: false,
    token: '',
    userName: '',
    isGuest: false,
    didTryAutoLogin: false,
    profileIcon: '',
    defaultBlogTitle: '',
    defaultFolderTitle: ''
};

export const loginInfoReducer = (
    state = initialState,
    action: LoginInfoActions
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
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            };
        case SET_DEFAULT_BLOG:
            return {
                ...state,
                defaultBlogTitle: action.blogTitle
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
export const selectSsoLogin = (state: RootState) => state.domainData.loginInfo.ssoLogin;
export const selectLocalLogin = (state: RootState) => state.domainData.loginInfo.localLogin;
export const selectToken = (state: RootState) => state.domainData.loginInfo.token;
export const selectUserName = (state: RootState) => state.domainData.loginInfo.userName;
export const selectAllLoginInfo = (state: RootState) => state.domainData.loginInfo;
export const selectProfileIcon = (state: RootState) => state.domainData.loginInfo.profileIcon;
export const selectDefaultBlogTitle = (state: RootState) =>
    state.domainData.loginInfo.defaultBlogTitle;
export const selectDefaultFolderTitle = (state: RootState) =>
    state.domainData.loginInfo.defaultFolderTitle;
export const selectIsGuestStatus = (state: RootState) => state.domainData.loginInfo.isGuest;
