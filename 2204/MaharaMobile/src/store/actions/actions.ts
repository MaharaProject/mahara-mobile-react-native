import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_USER_TAGS,
  CLEAR_USER_TAGS,
  SAVE_TAGGED_ITEMS_TO_ASYNC,
  TAGS_IDS,
  UPDATE_ITEM_TAGS,
  UPDATE_LOGIN_TYPES,
  UPDATE_TAGGED_ITEMS,
  UPDATE_TAGS_IDS,
  UPDATE_USER_TAGS,
  USER_TAGS
} from '../../utils/constants';
import {LoginInfo, UserTag} from '../../models/models';

// action creators - functions that create actions

// userTagsReducer
export function addUserTags(tags: Array<UserTag>) {
  // saved to async storage inside the reducer
  return {type: ADD_USER_TAGS, userTags: tags};
}

export function updateUserTags(tags: Array<UserTag>) {
  AsyncStorage.setItem(USER_TAGS, JSON.stringify(tags));
  return {type: UPDATE_USER_TAGS, userTags: tags};
}

export function updateUserTagsIds(userTagsIds: Array<number>) {
  AsyncStorage.setItem(TAGS_IDS, JSON.stringify(userTagsIds));
  return {type: UPDATE_TAGS_IDS, userTagsIds};
}

export function updateItemTags(itemId: string, tagsIds: Array<number>) {
  // saved to async storage inside reducer
  return {type: UPDATE_ITEM_TAGS, tagsIds, itemId};
}

/**
 * Action to save taggedItems to AsyncStorage, as we cannot action
 * this until after an item has been tagged and the new state has been
 * returned.
 */
export function saveTaggedItemsToAsync() {
  return {type: SAVE_TAGGED_ITEMS_TO_ASYNC};
}

export function updateTaggedItemsFromAsync(taggedItems: string) {
  return {type: UPDATE_TAGGED_ITEMS, taggedItems};
}

export function clearUserTags() {
  return {type: CLEAR_USER_TAGS};
}

/**
 * Update stored boolean login types
 *  - response retrieved when users login the first time
 *  - localL, tokenL, and ssoL are retrieved from AsyncStorage
 */
export function updateLoginTypes(
  response: LoginInfo,
  localL = false,
  tokenL = false,
  ssoL = false
) {
  let tokenLogin;
  let localLogin;
  let ssoLogin;
  if (response) {
    tokenLogin = response.logintypes.includes('manual');
    localLogin = response.logintypes.includes('basic');
    ssoLogin = response.logintypes.includes('sso');
  } else {
    tokenLogin = tokenL;
    localLogin = localL;
    ssoLogin = ssoL;
  }

  AsyncStorage.setItem('tokenLogin', JSON.stringify(tokenLogin));
  AsyncStorage.setItem('localLogin', JSON.stringify(localLogin));
  AsyncStorage.setItem('ssoLogin', JSON.stringify(ssoLogin));

  return {
    type: UPDATE_LOGIN_TYPES,
    tokenLogin,
    localLogin,
    ssoLogin
  };
}
