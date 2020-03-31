import {
  userBlogsReducer,
  userFoldersReducer
} from '../../reducers/userArtefactsReducer';

// USER ARTEFACTS REDUCER

describe('set up the different userArtefacts state ', () => {
  it('should set up default userBlogs state values', () => {
    const state = userBlogsReducer(undefined, {type: ''});
    expect(state).toEqual([]);
  });

  it('should set up default userFolders state values', () => {
    const state = userFoldersReducer(undefined, {type: ''});
    expect(state).toEqual([]);
  });
});
