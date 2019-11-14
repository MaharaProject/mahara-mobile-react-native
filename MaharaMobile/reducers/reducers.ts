import { combineReducers } from 'redux';
import { InitialState } from '../models/models';

const initialAppState: InitialState = {
  token: '',
  userName: '',
  userFolders: [],
  userTags: [],
  uploadList: [{ name: 'name test', size: 10, mimetype: 'image', uri: 'test uri' }]
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
        userFolders: action.userFolders,
        userTags: action.userTags,
        userBlogs: action.userBlogs
      }
    case 'UPDATE_UPLOAD_LIST':
      return {
        ...state,
        uploadList: state.uploadList.concat(action.uploadList)
      }
    default:
      return state;
  }
}

export default combineReducers({
  app
})
