import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SET_DID_TRY_AL,
  ADD_TOKEN,
  UPDATE_GUEST_STATUS,
  UPDATE_PROFILE_ICON,
  UPDATE_URL,
  UPDATE_USERNAME,
  CLEAR_LOGIN_INFO,
  DEFAULT_BLOG_ID,
  DEFAULT_FOLDER_TITLE,
  SET_DEFAULT_BLOG,
  SET_DEFAULT_FOLDER
} from '../../utils/constants';

// loginInfoReducer
/**
 * When a guest wants to upload items, they must log in as a user.
 * Manage that state through this action creator.
 */

export function updateGuestStatus(isGuest: boolean) {
  return { type: UPDATE_GUEST_STATUS, isGuest };
}

export function setDidTryAL() {
  return { type: SET_DID_TRY_AL };
}

export function addToken(token: string) {
  AsyncStorage.setItem('userToken', token);
  return { type: ADD_TOKEN, token };
}

export function updateUserName(username: string) {
  AsyncStorage.setItem('username', username);
  return { type: UPDATE_USERNAME, userName: username };
}

export function updateUrl(address: string) {
  AsyncStorage.setItem('url', address);
  return {
    type: UPDATE_URL,
    url: address
  };
}

export function updateProfilePic(filepath: string) {
  AsyncStorage.setItem('profileIcon', filepath);
  return {
    type: UPDATE_PROFILE_ICON,
    profileIcon: filepath
  };
}

export function clearLoginInfo() {
  return { type: CLEAR_LOGIN_INFO };
}

export function setDefaultFolder(folderTitle: string) {
  AsyncStorage.setItem(DEFAULT_FOLDER_TITLE, folderTitle);
  return { type: SET_DEFAULT_FOLDER, folderTitle };
}

export function setDefaultBlogId(blogId: number) {
  AsyncStorage.setItem(DEFAULT_BLOG_ID, JSON.stringify(blogId));
  return { type: SET_DEFAULT_BLOG, blogId };
}
