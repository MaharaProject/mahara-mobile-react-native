import {updateLoginTypes} from '../../store/actions/actions';
import {
  clearLoginInfo,
  setDefaultBlogId,
  setDefaultFolder,
  addToken,
  updateGuestStatus,
  updateProfilePic,
  updateUrl,
  updateUserName
} from '../../store/actions/loginInfo';

import {LoginInfo} from '../../models/models';
import {
  ADD_TOKEN,
  CLEAR_LOGIN_INFO,
  SET_DEFAULT_BLOG,
  SET_DEFAULT_FOLDER,
  UPDATE_GUEST_STATUS,
  UPDATE_LOGIN_TYPES,
  UPDATE_PROFILE_ICON,
  UPDATE_URL,
  UPDATE_USERNAME
} from '../../utils/constants';
import {RAND_STRING} from '../mockConstants';

// LOGIN INFO REDUCER ACTION CREATORS

describe('LoginInfo reducer action creators', () => {
  it.each([
    [true, {type: UPDATE_GUEST_STATUS, isGuest: true}],
    [false, {type: UPDATE_GUEST_STATUS, isGuest: false}]
  ])('should set up update guest status on %p', (input, expected) => {
    const action = updateGuestStatus(input as boolean);
    expect(action).toEqual(expected);
  });

  describe('addToken', () => {
    it('should set up add token', () => {
      const action = addToken(RAND_STRING);
      expect(action).toEqual({type: ADD_TOKEN, token: RAND_STRING});
    });
  });

  describe('updateUserName', () => {
    it('should set up update username', () => {
      const action = updateUserName(RAND_STRING);
      expect(action).toEqual({type: UPDATE_USERNAME, userName: RAND_STRING});
    });
  });

  describe('updateUrl', () => {
    it('should set up update url', () => {
      const action = updateUrl(RAND_STRING);
      expect(action).toEqual({
        type: UPDATE_URL,
        url: RAND_STRING
      });
    });
  });

  describe('updateProfilePic', () => {
    it('should set up update profile pic', () => {
      const action = updateProfilePic(RAND_STRING);
      expect(action).toEqual({
        type: UPDATE_PROFILE_ICON,
        profileIcon: RAND_STRING
      });
    });
  });

  describe('updateLoginTypes', () => {
    it.each([
      [
        ['manual', 'basic', 'sso'],
        {
          type: UPDATE_LOGIN_TYPES,
          tokenLogin: true,
          localLogin: true,
          ssoLogin: true
        }
      ],
      [
        ['manual'],
        {
          type: UPDATE_LOGIN_TYPES,
          tokenLogin: true,
          localLogin: false,
          ssoLogin: false
        }
      ],
      [
        ['basic'],
        {
          type: UPDATE_LOGIN_TYPES,
          tokenLogin: false,
          localLogin: true,
          ssoLogin: false
        }
      ],
      [
        ['sso'],
        {
          type: UPDATE_LOGIN_TYPES,
          tokenLogin: false,
          localLogin: false,
          ssoLogin: true
        }
      ]
    ])('should set up update login types %p', (loginTypes, expected) => {
      const loginInfo: LoginInfo = {
        logintypes: loginTypes as Array<string>,
        maharaversion: '',
        mobileapienabled: true,
        mobileapiversion: '',
        sitename: '',
        wsenabled: true,
        wsprotocols: [],
        wwwroot: ''
      };
      const action = updateLoginTypes(loginInfo);
      expect(action).toEqual(expected);
    });
  });

  describe('clearLoginInfo', () => {
    it('should set up clear login info', () => {
      const action = clearLoginInfo();
      expect(action).toEqual({type: CLEAR_LOGIN_INFO});
    });
  });

  describe('setDefaultFolder', () => {
    it('should set up set default folder', () => {
      const action = setDefaultFolder(RAND_STRING);
      expect(action).toEqual({
        type: SET_DEFAULT_FOLDER,
        folderTitle: RAND_STRING
      });
    });
  });

  describe('setDefaultBlogId', () => {
    it('should set up set default blog id', () => {
      const action = setDefaultBlogId(0);
      expect(action).toEqual({type: SET_DEFAULT_BLOG, blogId: 0});
    });
  });
});
