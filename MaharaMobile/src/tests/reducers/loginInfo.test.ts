import {UserFolder, UserBlog} from '../../models/models';

import {loginInfoReducer} from '../../reducers/loginInfoReducer';

// LOGIN INFO REDUCER

describe('LoginInfo state ', () => {
  it('should set up default LoginInfo values', () => {
    const state = loginInfoReducer(undefined, {type: ''});
    const userBlogs: UserBlog[] = [];
    const userFolders: UserFolder[] = [];
    expect(state).toEqual({
      url: '',
      tokenLogin: false,
      ssoLogin: false,
      localLogin: false,
      token: '',
      userName: '',
      isGuest: false,
      profileIcon: '',
      defaultBlogId: userBlogs[0],
      defaultFolderTitle: userFolders[0]
    });
  });
});
