import {
  ADD_UPLOAD_FILE,
  CLEAR_UPLOAD_FILES,
  REMOVE_UPLOAD_FILE,
  UPDATE_UPLOAD_FILES_ON_LOGIN
} from '../../utils/constants';
import {PendingMFile, UserFolder} from '../../models/models';

// uploadFilesReducer

export function addFileToUploadList(file: PendingMFile) {
  return {type: ADD_UPLOAD_FILE, file};
}

export function removeUploadFile(id: string) {
  return {type: REMOVE_UPLOAD_FILE, id};
}

export function clearUploadFiles() {
  return {type: CLEAR_UPLOAD_FILES};
}

export function updateUploadFilesOnLogin(
  token: string,
  urlDomain: string,
  userFolders: Array<UserFolder>
) {
  return {type: UPDATE_UPLOAD_FILES_ON_LOGIN, token, urlDomain, userFolders};
}
