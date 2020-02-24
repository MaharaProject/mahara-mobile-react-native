import { combineReducers } from 'redux';
import { loginInfoReducer } from './loginInfoReducer';
import { uploadFilesReducer } from './uploadFilesReducer';
import { uploadJEntriesReducer } from './uploadJEntriesReducer';
import { userBlogsReducer, userFoldersReducer } from './userArtefactsReducer';
import { userTagsReducer } from './userTagsReducer';

// Reducers specify how the application's state changes in response to actions sent to the store.
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  domainData: combineReducers({
    loginInfo: loginInfoReducer,
    userTagsInfo: userTagsReducer,
    userFolders: userFoldersReducer,
    userBlogs: userBlogsReducer
  }),
  appState: combineReducers({
    uploadFiles: uploadFilesReducer,
    uploadJEntries: uploadJEntriesReducer
  })
});

export type RootState = ReturnType<typeof rootReducer>;
