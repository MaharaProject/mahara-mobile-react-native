import { UserFolder, UserBlog } from '../models/models';
import { RootState } from './rootReducer';
import { UPDATE_USER_FOLDERS, CLEAR_USER_FOLDERS, UPDATE_USER_BLOGS, CLEAR_USER_BLOGS } from '../utils/constants';

// UserFolders
type UserFoldersState = Array<UserFolder>;
const initialUserFoldersState: UserFoldersState = [{ title: 'images' }];

export const userFoldersReducer = (
  state = initialUserFoldersState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_USER_FOLDERS:
      if (action.userFolders.includes('images') && action.userFolders.length === 1) return state;
      return [...state, ...action.userFolders];
    case CLEAR_USER_FOLDERS:
      return initialUserFoldersState;
    default:
      return state;
  }
};

// UserFolders Selectors
export const selectUserFolders = (state: RootState) => state.domainData.userFolders;

// UserBlogs
type UserBlogsState = Array<UserBlog>;
const initialUserBlogsState: UserBlogsState = [];

export const userBlogsReducer = (
  state = initialUserBlogsState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_USER_BLOGS:
      return [...state, ...action.userBlogs];
    case CLEAR_USER_BLOGS:
      return initialUserBlogsState;
    default:
      return state;
  }
};

// UserBlogs Selectors
export const selectUserBlogs = (state: RootState) => state.domainData.userBlogs;
