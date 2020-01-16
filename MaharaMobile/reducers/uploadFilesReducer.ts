import AsyncStorage from '@react-native-community/async-storage';
import {MaharaPendingFile, UserFolder} from '../models/models';
import { RootState } from './rootReducer';
import {
  ADD_UPLOAD_FILE,
  REMOVE_UPLOAD_FILE,
  CLEAR_UPLOAD_FILES,
  UPDATE_UPLOAD_FILES_ON_LOGIN
} from '../utils/constants';
import { arrayToObject } from '../utils/authHelperFunctions';

type UploadFilesState = {
  uploadFiles: Record<string, MaharaPendingFile>;
  uploadFilesIds: Array<string>;
};

const initialState: UploadFilesState = {
  uploadFiles: {},
  uploadFilesIds: []
};

// Helper functions
const getFiles = (ids: string[], arr: any) => ids.map((id: string) => arr[id]);

const updateAsyncStorageUploadFiles = (uploadFiles: MaharaPendingFile[]) => {
  AsyncStorage.setItem('uploadFiles', JSON.stringify(uploadFiles));
};

const addFileToUploadList = (
  state: UploadFilesState,
  file: MaharaPendingFile
) => {
  const updatedFilesIdsSet = new Set([...state.uploadFilesIds, file.id]);
  const updatedFiles = {
    ...state.uploadFiles,
    [file.id]: file
  };

  const updatedFileIds = Array.from(updatedFilesIdsSet);
  updateAsyncStorageUploadFiles(getFiles(updatedFileIds, updatedFiles));
  return {
    uploadFiles: updatedFiles,
    uploadFilesIds: updatedFileIds
  };
};

const removeUploadFile = (
  state: UploadFilesState,
  id: string
): UploadFilesState => {
  // Filter out given id from state
  const updatedFileIds = state.uploadFilesIds.filter(
    (uploadFilesId: string) => uploadFilesId !== id
  );

  // Delete the file matching id
  const updatedFiles = { ...state.uploadFiles };
  delete updatedFiles[id];

  updateAsyncStorageUploadFiles(getFiles(updatedFileIds, updatedFiles));
  return {
    uploadFiles: updatedFiles,
    uploadFilesIds: updatedFileIds
  };
};

const updateUploadFilesOnLogin = (
  state: UploadFilesState,
  token: string,
  urlDomain: string,
  userFolders: Array<UserFolder>
): UploadFilesState => {
  const uploadJEntries = {
    ...state.uploadFiles
  };

  const updatedFiles: Array<MaharaPendingFile> = [];
  const filesArray = Object.values(uploadJEntries);
  filesArray.forEach((file: MaharaPendingFile) => {
    const newFile: MaharaPendingFile = {
      ...file,
      maharaFormData: {
        ...file.maharaFormData,
        wstoken: token,
        foldername: userFolders[0].title
      },
      url: urlDomain + file.url
    };
    updatedFiles.push(newFile);
  });

  const updatedFilesObj = arrayToObject(updatedFiles);
  const newState: UploadFilesState = {
    ...state,
    uploadFiles: updatedFilesObj
  };
  updateAsyncStorageUploadFiles(updatedFiles);
  return newState;
};

// REDUCER
export const uploadFilesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_UPLOAD_FILE:
      return addFileToUploadList(state, action.file);
    case REMOVE_UPLOAD_FILE:
      return removeUploadFile(state, action.id);
    case CLEAR_UPLOAD_FILES:
      return initialState;
    case UPDATE_UPLOAD_FILES_ON_LOGIN:
      return updateUploadFilesOnLogin(
        state,
        action.token,
        action.urlDomain,
        action.userFolders
      );
    default:
      return state;
  }
};

const uploadFilesState = (state: RootState) => state.appState.uploadFiles;

// Selectors
export const selectAllUploadFiles = (
  state: RootState
): Array<MaharaPendingFile> => {
  const { uploadFiles } = uploadFilesState(state);
  const { uploadFilesIds } = uploadFilesState(state);
  return getFiles(uploadFilesIds, uploadFiles);
};

export const selectAllUploadFilesIds = (state: RootState) => [
  ...state.appState.uploadFiles.uploadFilesIds
];

export const selectUploadFileById = (
  state: RootState,
  { id }: {id: string}
): MaharaPendingFile => {
  const { uploadFiles } = uploadFilesState(state);
  return uploadFiles[id];
};
