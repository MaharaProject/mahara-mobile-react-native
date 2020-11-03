import {UserFolder} from '../../models/models';
import {uploadFilesReducer} from '../../store/reducers/uploadFilesReducer';
import {
  ADD_UPLOAD_FILE,
  UPDATE_UPLOAD_FILES_ON_LOGIN
} from '../../utils/constants';
import {
  MOCK_MAHARA_PENDING_FILE_0,
  MOCK_TOKEN,
  MOCK_URL
} from '../mockConstants';

// UPLOAD FILES REDUCER
const state = uploadFilesReducer(undefined, {type: ''});

const state1 = uploadFilesReducer(state, {
  type: ADD_UPLOAD_FILE,
  file: MOCK_MAHARA_PENDING_FILE_0
});

describe('UploadFiles state logged in', () => {
  it('should set up default UploadFiles values', () => {
    expect(state).toEqual({
      uploadFiles: {},
      uploadFilesIds: []
    });
  });

  it('should add an uplaod file to state', () => {
    expect(state1.uploadFiles).toEqual({
      [MOCK_MAHARA_PENDING_FILE_0.id]: MOCK_MAHARA_PENDING_FILE_0
    });
    expect(state1.uploadFilesIds).toEqual([MOCK_MAHARA_PENDING_FILE_0.id]);
  });
});

describe('Set up uploadFiles state on logging in from guest', () => {
  const newUserFolders: Array<UserFolder> = [{id: 1, title: 'new folder'}];

  const guestLoggedInState = uploadFilesReducer(state1, {
    type: UPDATE_UPLOAD_FILES_ON_LOGIN,
    token: MOCK_TOKEN,
    urlDomain: MOCK_URL,
    userFolders: newUserFolders
  });
  it('should change folders of files from guest folder to user folder ', () => {
    expect(guestLoggedInState.uploadFiles.f0.maharaFormData.foldername).toEqual(
      'new folder'
    );
  });
});
