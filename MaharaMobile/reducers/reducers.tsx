import { combineReducers } from 'redux';

const initialAppState = {
  token: '',
  username: '',
  userfolders: [],
  usertags: [],
  uploadList: []
};

const app = (state = initialAppState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.token
      }
    case 'USER_NAME':
      return {
        ...state,
        username: action.username
      }
    case 'USER_FOLDERS':
      return {
        ...state,
        userfolders: action.userfolders
      }
    case 'USER_TAGS':
      return {
        ...state,
        usertags: action.usertags
      }
    case 'UPDATE_UPLOAD_LIST':
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
