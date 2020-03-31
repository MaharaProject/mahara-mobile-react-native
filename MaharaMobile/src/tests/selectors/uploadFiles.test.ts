import {
  selectAllUploadFiles,
  selectUploadFileById,
  selectNumOfFiles,
  selectAllUploadFilesIds
} from '../../reducers/uploadFilesReducer';
import {
  MOCK_MAHARA_PENDING_FILES_ARR,
  MOCK_MAHARA_PENDING_FILE_0,
  MOCK_ROOT_STATE,
  MOCK_FILE_IDS
} from '../mockConstants';

describe('selectUploadFileById', () => {
  it('should return undefined when given a non-existent id of a file ', () => {
    const result = selectUploadFileById(MOCK_ROOT_STATE, {id: 'test'});
    expect(result).toBe(undefined);
  });

  it('should return the matching Record for given id', () => {
    const result = selectUploadFileById(MOCK_ROOT_STATE, {id: 'f0'});
    expect(result).toEqual(MOCK_MAHARA_PENDING_FILE_0);
  });
});

describe('select general upload files information', () => {
  it('should select all upload files ', () => {
    const result = selectAllUploadFiles(MOCK_ROOT_STATE);
    expect(result).toEqual(MOCK_MAHARA_PENDING_FILES_ARR);
  });

  it('should return the number of upload files', () => {
    const result = selectNumOfFiles(MOCK_ROOT_STATE);
    expect(result).toBe(3);
  });

  it('should select all uploadFilesIds', () => {
    const result = selectAllUploadFilesIds(MOCK_ROOT_STATE);
    expect(result).toEqual(MOCK_FILE_IDS);
  });
});
