import { combineReducers } from 'redux';
import { addToken, userName, userFolders, userTags } from '../actions/actions.tsx';

const initialAppState = {
  token: '',
  username: '',
  userfolders: [],
  usertags: []
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
    default:
      return state;
  }
}

export default combineReducers({
  app
})
