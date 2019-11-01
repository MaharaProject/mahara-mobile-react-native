import { combineReducers } from 'redux';

export interface State {
  token: string,
  userName: string,
  userFolders: Array<object>,
  userTags: Array<object>,
  uploadList: Array<object>
}

const initialAppState:State = {
  token: '',
  userName: '',
  userFolders: [],
  userTags: [],
  uploadList: []
};

const app = (state = initialAppState, action: any) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.token
      }
    case 'ADD_USER':
      return {
        ...state,
        userName: action.userName,
        userFolders: action.userFolder,
        userTags: action.userTags,
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
