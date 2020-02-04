import { UserTag } from '../models/models';
import { RootState } from './rootReducer';
import { ADD_TAG, REMOVE_TAG, UPDATE_USER_TAGS, CLEAR_USER_TAGS } from '../utils/constants';

const initialState: Array<UserTag> = [];

// Reducer
const addTag = (state: any, tag: UserTag) => [...state.concat(tag)];

const removeTag = (state: any, tag: UserTag) => {
  const newState = { ...state };
  delete newState[tag.id];
  return newState;
};

export const userTagsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TAG:
      return addTag(state, action.payload);
    case REMOVE_TAG:
      return removeTag(state, action.payload);
    case UPDATE_USER_TAGS:
      return [...state.concat(action.userTags)];
    case CLEAR_USER_TAGS:
      return initialState;
    default:
      return state;
  }
};

// Selector
export const selectUserTags = (state: RootState) => state.domainData.userTags;
