import { combineReducers } from 'redux';
import { InitialState } from '../models/models';
import { ADD_TOKEN, ADD_USER, UPDATE_UPLOAD_LIST, ERROR_MESSAGE, SERVER_URL } from '../actions/actions';

const initialAppState: InitialState = {
  url: '',
  token: '',
  tokenLogin: false,
  ssoLogin: false,
  localLogin: false,
  userName: '',
  userFolders: [],
  userTags: [],
  uploadList: [],
  userBlogs: []
};

const app = (state = initialAppState, action: any) => {
  switch (action.type) {
    case SERVER_URL:
      return {
        ...state,
        url: action.url,
        localLogin: action.localLogin,
        ssoLogin: action.ssoLogin,
        tokenLogin: action.tokenLogin
      }
    case ADD_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case ADD_USER:
      return {
        ...state,
        userName: action.userName,
        userFolders: action.userFolders,
        userTags: action.userTags,
        userBlogs: action.userBlogs
      }
    case UPDATE_UPLOAD_LIST:
      return {
        ...state,
        uploadList: action.uploadList
      }
    default:
      return state;
  }
}

export default combineReducers({
  app
})
