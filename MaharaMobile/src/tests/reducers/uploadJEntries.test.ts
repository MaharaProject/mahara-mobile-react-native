import {uploadJEntriesReducer} from '../../store/reducers/uploadJEntriesReducer';

// UPLOAD J ENTRIES REDUCER

describe('UploadJEntires state ', () => {
  it('should set up default LoginInfo values', () => {
    const state = uploadJEntriesReducer(undefined, {type: ''});
    expect(state).toEqual({
      uploadJEntries: {},
      uploadJEntriesIds: []
    });

    it.todo('should update blog details once user is loggin in from guest');
  });
});
