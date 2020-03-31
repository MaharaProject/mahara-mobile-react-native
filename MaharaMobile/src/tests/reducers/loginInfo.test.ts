import {loginInfoReducer} from '../../reducers/loginInfoReducer';

// LOGIN INFO REDUCER

describe('LoginInfo state ', () => {
  it('should set up default LoginInfo values', () => {
    const state = loginInfoReducer(undefined, {type: ''});
    const userBlogs = [];
    const userFolders = [];
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
