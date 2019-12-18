import { UserFolder, UserBlog } from '../models/models';
import { RootState } from './reducers';
import { UPDATE_USER_FOLDERS, UPDATE_USER_BLOGS } from '../utils/constants';

// UserFolders
type UserFoldersState = Array<UserFolder>;
const initialUserFoldersState: UserFoldersState = [];

export const userFoldersReducer = (
  state = initialUserFoldersState,
  action: any,
) => {
  switch (action.type) {
    case UPDATE_USER_FOLDERS:
      return [...state, ...action.userFolders];
    default:
      return state;
  }
};

// UserFolders Selectors
export const selectUserFolders = (state: RootState) =>
  state.domainData.userFolders;

// UserBlogs
type UserBlogsState = Array<UserBlog>;
const initialUserBlogsState: UserBlogsState = [];

export const userBlogsReducer = (
  state = initialUserBlogsState,
  action: any,
) => {
  switch (action.type) {
    case UPDATE_USER_BLOGS:
      return [...state, ...action.userBlogs];
    default:
      return state;
  }
};

// UserBlogs Selectors
export const selectUserBlogs = (state: RootState) => state.domainData.userBlogs;
