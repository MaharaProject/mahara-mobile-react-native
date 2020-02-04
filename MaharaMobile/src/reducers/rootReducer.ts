import { combineReducers } from 'redux';
import { uploadFilesReducer } from './uploadFilesReducer';
import { userTagsReducer } from './userTagsReducer';
import { loginInfoReducer } from './loginInfoReducer';
import { userFoldersReducer, userBlogsReducer } from './userArtefactsReducer';
import { uploadJEntriesReducer } from './uploadJEntriesReducer';

// Reducers specify how the application's state changes in response to actions sent to the store.
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  domainData: combineReducers({
    loginInfo: loginInfoReducer,
    userTags: userTagsReducer,
    userFolders: userFoldersReducer,
    userBlogs: userBlogsReducer
  }),
  appState: combineReducers({
    uploadFiles: uploadFilesReducer,
    uploadJEntries: uploadJEntriesReducer
  })
});

export type RootState = ReturnType<typeof rootReducer>;
