import {t} from '@lingui/macro';
import AsyncStorage from '@react-native-community/async-storage';
import {
  LoginInfo,
  MaharaPendingFile,
  PendingJournalEntry,
  RequestErrorPayload,
  UserBlog,
  UserFolder,
  UserTag
} from '../models/models';
import {
  ADD_TOKEN,
  ADD_UPLOAD_FILE,
  ADD_UPLOAD_JOURNAL_ENTRY,
  ADD_USER_TAGS,
  CLEAR_LOGIN_INFO,
  CLEAR_UPLOAD_FILES,
  CLEAR_UPLOAD_J_ENTRIES,
  CLEAR_USER_BLOGS,
  CLEAR_USER_FOLDERS,
  CLEAR_USER_TAGS,
  DEFAULT_BLOG_ID,
  DEFAULT_FOLDER_TITLE,
  REMOVE_UPLOAD_FILE,
  REMOVE_UPLOAD_JOURNAL_ENTRY,
  SAVE_TAGGED_ITEMS_TO_ASYNC,
  SET_DEFAULT_BLOG,
  SET_DEFAULT_FOLDER,
  TAGS_IDS,
  TAG_ITEM,
  UPDATE_J_ENTRIES_ON_LOGIN,
  UPDATE_LOGIN_TYPES,
  UPDATE_PROFILE_ICON,
  UPDATE_TAGGED_ITEMS,
  UPDATE_TAGS_IDS,
  UPDATE_UPLOAD_FILES_ON_LOGIN,
  UPDATE_URL,
  UPDATE_USERNAME,
  UPDATE_USER_BLOGS,
  UPDATE_USER_FOLDERS,
  UPDATE_USER_TAGS,
  USER_TAGS
} from '../utils/constants';

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

export function addTagsToItem(itemId: string, tagIds: Set<number>) {
  // saved to async storage inside reducer
  return {type: TAG_ITEM, tagIds, itemId};
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

// loginInfoReducer
export function addToken(token: string) {
  AsyncStorage.setItem('userToken', token);
  return {type: ADD_TOKEN, token};
}

export function updateUserName(username: string) {
  AsyncStorage.setItem('username', username);
  return {type: UPDATE_USERNAME, userName: username};
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

export function clearLoginInfo() {
  return {type: CLEAR_LOGIN_INFO};
}

export function setDefaultFolder(folderTitle: string) {
  AsyncStorage.setItem(DEFAULT_FOLDER_TITLE, folderTitle);
  return {type: SET_DEFAULT_FOLDER, folderTitle};
}

export function setDefaultBlogId(blogId: number) {
  AsyncStorage.setItem(DEFAULT_BLOG_ID, JSON.stringify(blogId));
  return {type: SET_DEFAULT_BLOG, blogId};
}

// uploadFilesReducer
export function addFileToUploadList(file: MaharaPendingFile) {
  return {type: ADD_UPLOAD_FILE, file};
}

export function removeUploadFile(id: string) {
  return {type: REMOVE_UPLOAD_FILE, id};
}

export function clearUploadFiles() {
  return {type: CLEAR_UPLOAD_FILES};
}

export function updateUploadFilesOnLogin(
  token: string,
  urlDomain: string,
  userFolders: Array<UserFolder>
) {
  return {type: UPDATE_UPLOAD_FILES_ON_LOGIN, token, urlDomain, userFolders};
}

// uploadJEntriesReducer
export function addJournalEntryToUploadList(journalEntry: PendingJournalEntry) {
  return {type: ADD_UPLOAD_JOURNAL_ENTRY, journalEntry};
}

export function removeUploadJEntry(id: string) {
  return {type: REMOVE_UPLOAD_JOURNAL_ENTRY, id};
}

export function clearUploadJEntires() {
  return {type: CLEAR_UPLOAD_J_ENTRIES};
}

export function updateJEntriesOnLogin(
  token: string,
  urlDomain: string,
  userBlogs: Array<UserBlog>
) {
  return {type: UPDATE_J_ENTRIES_ON_LOGIN, token, urlDomain, userBlogs};
}

// userArtefactsReducer
export function updateUserBlogs(blogs: Array<UserBlog>) {
  AsyncStorage.setItem('userBlogs', JSON.stringify(blogs));
  return {type: UPDATE_USER_BLOGS, userBlogs: blogs};
}

export function clearUserFolders() {
  AsyncStorage.removeItem('userFolders');
  return {type: CLEAR_USER_FOLDERS};
}

export function updateUserFolders(folders: Array<UserFolder>) {
  AsyncStorage.setItem('userFolders', JSON.stringify(folders));
  return {type: UPDATE_USER_FOLDERS, userFolders: folders};
}

export function clearUserBlogs() {
  AsyncStorage.removeItem('userBlogs');
  return {type: CLEAR_USER_BLOGS};
}

export class RequestError extends Error {
  code: number;

  name = 'RequestError';

  previousError: Error | null = null;

  constructor({
    code = 400,
    message = 'Request Error',
    previousError
  }: RequestErrorPayload) {
    super(String(message) || 'Request Error');
    this.code = Number(code);
    if (previousError) {
      this.previousError = previousError;
    }
  }

  static createRequestError(e: RequestError): RequestError {
    if (e.name === 'RequestError') {
      return e;
    }

    return new RequestError({code: 500, message: e.message, previousError: e});
  }
}

const requestJSON = async (url: string, config: object, error?: string) => {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new RequestError({
        code: response.status,
        message: error
      });
    }
    const json = await response.json();
    return json;
  } catch (e) {
    throw RequestError.createRequestError(e);
  }
};

const getJSON = (url: string, error?: string) =>
  requestJSON(url, {method: 'GET'}, error);

export function checkLoginTypes(url: string) {
  const serverUrl = `${url}module/mobileapi/json/info.php`;

  // TODO: eslint-disable-next-line func-names
  // eslint-disable-next-line func-names
  return async function(dispatch: Function, getState: Function, {i18n}) {
    try {
      // TODO: dispatch loading state for spinner
      const result: LoginInfo = await getJSON(
        serverUrl,
        i18n._(t`Network Error`)
      );
      // check that there is a mahara version, and therefore a Mahara instance
      if (!result.maharaversion) {
        throw new Error(i18n._(t`This is not a Mahara site.`));
      }
      // check that webservices is enabled on the Mahara instance
      if (!result.wsenabled) {
        throw new Error(
          i18n._(
            t`Web services are not enabled on the Mahara site. Please contact the administrator of your site to have them enabled.`
          )
        );
      }
      dispatch(updateLoginTypes(result));
      dispatch(updateUrl(url));
    } catch (error) {
      if (error.code === 404) {
        throw new Error(i18n._(t`This is not a Mahara site.`));
      }
      throw error;
    }
  };
}
