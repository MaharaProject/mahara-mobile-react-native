import {
  addFileToUploadList,
  clearUploadFiles,
  removeUploadFile,
  updateUploadFilesOnLogin
} from '../../store/actions/uploadFiles';
import {
  ADD_UPLOAD_FILE,
  CLEAR_UPLOAD_FILES,
  REMOVE_UPLOAD_FILE,
  UPDATE_UPLOAD_FILES_ON_LOGIN
} from '../../utils/constants';
import {
  RAND_STRING,
  MOCK_MAHARA_PENDING_FILE_0,
  MOCK_USER_FOLDERS
} from '../mockConstants';

// UPLOAD FILES REDUCER ACTION CREATORS

describe('UploadFiles reducer action creators', () => {
  describe('addFileToUploadList', () => {
    it('should set up add file to upload list', () => {
      const action = addFileToUploadList(MOCK_MAHARA_PENDING_FILE_0);
      expect(action).toEqual({
        type: ADD_UPLOAD_FILE,
        file: MOCK_MAHARA_PENDING_FILE_0
      });
    });
  });

  describe('removeUploadFile', () => {
    it('should set up remove upload file', () => {
      const action = removeUploadFile(RAND_STRING);
      expect(action).toEqual({type: REMOVE_UPLOAD_FILE, id: RAND_STRING});
    });
  });

  describe('clearUploadFiles', () => {
    it('should set up clear upload files', () => {
      const action = clearUploadFiles();
      expect(action).toEqual({type: CLEAR_UPLOAD_FILES});
    });
  });

  describe('updateUploadFilesOnLogin', () => {
    it('should set up update upload files on login', () => {
      const action = updateUploadFilesOnLogin(
        RAND_STRING,
        RAND_STRING,
        MOCK_USER_FOLDERS
      );
      expect(action).toEqual({
        type: UPDATE_UPLOAD_FILES_ON_LOGIN,
        token: RAND_STRING,
        urlDomain: RAND_STRING,
        userFolders: MOCK_USER_FOLDERS
      });
    });
  });
});
