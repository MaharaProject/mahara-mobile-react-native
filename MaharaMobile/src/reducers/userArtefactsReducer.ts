import { UserBlog, UserFolder } from '../models/models';
import { CLEAR_USER_BLOGS, CLEAR_USER_FOLDERS, UPDATE_USER_BLOGS, UPDATE_USER_FOLDERS } from '../utils/constants';
import { RootState } from './rootReducer';

// UserFolders
type UserFoldersState = Array<UserFolder>;
const initialUserFoldersState: UserFoldersState = [];

export const userFoldersReducer = (
  state = initialUserFoldersState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_USER_FOLDERS:
      // TODO: this doesn't update folders but just overwrites.
      // TODO: response to when users have no folders, maybe like tags have a create new folder
      return [...action.userFolders];
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
      // TODO: this doesn't update blogs but just overwrites.
      // TODO: response to when users have no folders, maybe like tags have a create new folder
      return [...action.userBlogs];
    case CLEAR_USER_BLOGS:
      return initialUserBlogsState;
    default:
      return state;
  }
};

// UserBlogs Selectors
export const selectUserBlogs = (state: RootState) => state.domainData.userBlogs;
