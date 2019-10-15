import { combineReducers } from 'redux';
import { addToken } from '../actions/actions.tsx';

const initialAppState = {
  token: ''
};

const app = (state = initialAppState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}

export default combineReducers({
  app
})
