import { combineReducers } from 'redux';

const initialAppState = {
  token: '',
  userName: '',
  userFolders: [],
  userTags: [],
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
        userName: action.userName
      }
    case 'USER_FOLDERS':
      return {
        ...state,
        userFolders: action.userFolders
      }
    case 'USER_TAGS':
      return {
        ...state,
        userTags: action.userTags
      }
    case 'USER_BLOGS':
      return {
        ...state,
        userBlogs: action.userBlogs
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
