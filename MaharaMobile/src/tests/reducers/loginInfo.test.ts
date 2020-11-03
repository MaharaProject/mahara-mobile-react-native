import {loginInfoReducer} from '../../store/reducers/loginInfoReducer';

// LOGIN INFO REDUCER

describe('LoginInfo state ', () => {
  it('should set up default LoginInfo values', () => {
    const state = loginInfoReducer(undefined, {type: ''});
    expect(state).toEqual({
      url: '',
      tokenLogin: false,
      ssoLogin: false,
      localLogin: false,
      token: '',
      userName: '',
      isGuest: false,
      didTryAutoLogin: false,
      profileIcon: '',
      defaultBlogId: 0,
      defaultFolderTitle: ''
    });
  });
});
