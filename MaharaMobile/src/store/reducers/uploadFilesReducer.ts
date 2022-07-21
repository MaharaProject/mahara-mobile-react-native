import AsyncStorage from '@react-native-async-storage/async-storage';
import { PendingMFile, UserFolder } from '../../models/models';
import { arrayToObject } from '../../utils/authHelperFunctions';
import {
  ADD_UPLOAD_FILE,
  CLEAR_UPLOAD_FILES,
  REMOVE_UPLOAD_FILE,
  UPDATE_UPLOAD_FILES_ON_LOGIN,
} from '../../utils/constants';
import { RootState } from './rootReducer';
import { UploadFilesActions } from '../../models/uploadFilesTypes';

export type UploadFilesState = {
  uploadFiles: Record<string, PendingMFile>;
  uploadFilesIds: Array<string>;
};

const initialState: UploadFilesState = {
  uploadFiles: {},
  uploadFilesIds: [],
};

// Helper functions
const getFiles = (
  ids: string[] = [],
  arr: Record<string, PendingMFile>
): Array<PendingMFile> => {
  return ids.map((id: string) => arr[id]);
};

const updateAsyncStorageUploadFiles = (uploadFiles: PendingMFile[]) => {
  AsyncStorage.setItem('uploadFiles', JSON.stringify(uploadFiles));
};

const addFileToUploadList = (state: UploadFilesState, file: PendingMFile) => {
  const updatedFilesIdsSet = new Set([...state.uploadFilesIds, file.id]);
  const updatedFiles = {
    ...state.uploadFiles,
    [file.id]: file,
  };

  const updatedFileIds = Array.from(updatedFilesIdsSet);
  updateAsyncStorageUploadFiles(getFiles(updatedFileIds, updatedFiles));
  return {
    uploadFiles: updatedFiles,
    uploadFilesIds: updatedFileIds,
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
    uploadFilesIds: updatedFileIds,
  };
};

const updateUploadFilesOnLogin = (
  state: UploadFilesState,
  token: string,
  urlDomain: string,
  userFolders: Array<UserFolder>
): UploadFilesState => {
  const uploadJEntries = {
    ...state.uploadFiles,
  };

  const updatedFiles: Array<PendingMFile> = [];
  const filesArray = Object.keys(uploadJEntries).map((k) => uploadJEntries[k]);
  filesArray.forEach((file: PendingMFile) => {
    const newPendingMFile: PendingMFile = {
      ...file,
      maharaFormData: {
        ...file.maharaFormData,
        wstoken: token,
        foldername: userFolders[0].title,
      },
      url: urlDomain + file.url,
    };
    updatedFiles.push(newPendingMFile);
  });

  const updatedFilesObj = arrayToObject(updatedFiles);
  const newState: UploadFilesState = {
    ...state,
    uploadFiles: updatedFilesObj,
  };
  updateAsyncStorageUploadFiles(updatedFiles);
  return newState;
};

// REDUCER
export const uploadFilesReducer = (
  state = initialState,
  action: UploadFilesActions
) => {
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
export const selectAllUploadFiles = (state: RootState): Array<PendingMFile> => {
  const { uploadFiles } = uploadFilesState(state);
  const { uploadFilesIds } = uploadFilesState(state);
  return getFiles(uploadFilesIds, uploadFiles);
};

export const selectAllUploadFilesIds = (state: RootState) => [
  ...state.appState.uploadFiles.uploadFilesIds,
];

export const selectUploadFileById = (
  state: RootState,
  { id }: { id: string }
): PendingMFile => {
  const { uploadFiles } = uploadFilesState(state);
  return uploadFiles[id];
};

export const selectNumOfFiles = (state: RootState) =>
  state.appState.uploadFiles.uploadFilesIds.length;
