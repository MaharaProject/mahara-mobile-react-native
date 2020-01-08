import { MaharaPendingFile } from '../models/models';
import { RootState } from './reducers';
import { ADD_UPLOAD_FILE, REMOVE_UPLOAD_FILE } from '../utils/constants';

type UploadFilesState = {
  uploadFiles: Record<string, MaharaPendingFile>;
  uploadFilesIds: Array<string>;
};

const initialState: UploadFilesState = {
  uploadFiles: {},
  uploadFilesIds: [],
};

// Helper functions
const addFileToUploadList = (
  state: UploadFilesState,
  file: MaharaPendingFile,
) => {
  const updatedUploadFilesIds = new Set([
    ...state.uploadFilesIds,
    file.id,
  ])
  const updatedUploadFiles = {
    ...state.uploadFiles,
    [file.id]: file,
  };

  return {
    uploadFiles: updatedUploadFiles,
    uploadFilesIds: Array.from(updatedUploadFilesIds,)
  };
};

const removeUploadFile = (
  state: UploadFilesState,
  id: string,
): UploadFilesState => {
  // Filter out given id from state
  const updatedFileIds = state.uploadFilesIds.filter(
    (uploadFilesId: string) => uploadFilesId !== id,
  );

  // Delete the file matching id
  const updatedUploadFiles = { ...state.uploadFiles };
  delete updatedUploadFiles[id];

  return {
    uploadFiles: updatedUploadFiles,
    uploadFilesIds: updatedFileIds,
  };
};

// REDUCER
export const uploadFilesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_UPLOAD_FILE:
      return addFileToUploadList(state, action.file);
    case REMOVE_UPLOAD_FILE:
      return removeUploadFile(state, action.id);
    default:
      return state;
  }
};

const uploadFilesState = (state: RootState) => state.appState.uploadFiles;

// Selectors
export const selectAllUploadFiles = (
  state: RootState,
): Array<MaharaPendingFile> => {
  const { uploadFiles } = uploadFilesState(state);
  const { uploadFilesIds } = uploadFilesState(state);
  const files = uploadFilesIds.map((id: string) => uploadFiles[id]);
  return files;
};

export const selectAllUploadFilesIds = (state: RootState) => [
  ...state.appState.uploadFiles.uploadFilesIds,
];

export const selectUploadFileById = (state: RootState, { id }: { id: string }): MaharaPendingFile => {
  const { uploadFiles } = uploadFilesState(state);
  return uploadFiles[id];
};
