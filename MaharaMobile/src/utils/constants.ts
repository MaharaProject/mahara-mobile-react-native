import { UserBlog, UserFolder } from '../models/models';

// action types - payloads of information that send data from your application to your store

// DOMAIN DATA
// userTagsReducer
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const UPDATE_USER_TAGS = 'UPDATE_USER_TAGS';
export const CLEAR_USER_TAGS = 'CLEAR_USER_TAGS';
// loginInfoReducer
export const ADD_TOKEN = 'ADD_TOKEN';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_SERVER_URL = 'UPDATE_SERVER_URL';
export const CLEAR_LOGIN_INFO = 'CLEAR_LOGIN_INFO';
export const UPDATE_LOGIN_TYPES = 'UPDATE_LOGIN_TYPES';
export const UPDATE_URL = 'UPDATE_URL';
export const UPDATE_PROFILE_ICON = 'UPDATE_PROFILE_ICON';
export const UPDATE_GUEST_STATUS = 'UPDATE_GUEST_STATUS';
export const SET_DEFAULT_FOLDER = 'SET_DEFAULT_FOLDER';
export const SET_DEFAULT_BLOG = 'SET_DEFAULT_BLOG';
// userArtefactsReducer
export const UPDATE_USER_BLOGS = 'UPDATE_USER_BLOGS';
export const UPDATE_USER_FOLDERS = 'UPDATE_USER_FOLDERS';
export const CLEAR_USER_BLOGS = 'CLEAR_USER_BLOGS';
export const CLEAR_USER_FOLDERS = 'CLEAR_USER_FOLDERS';

// APP STATE
// uploadFilesReducer
export const ADD_UPLOAD_FILE = 'ADD_FILE_TO_UPLOAD_LIST';
export const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE';
export const CLEAR_UPLOAD_FILES = 'CLEAR_UPLOAD_FILES';
export const UPDATE_UPLOAD_FILES_ON_LOGIN = 'UPDATE_UPLOAD_FILES_ON_LOGIN';
// uploadJEntriesReducer
export const ADD_UPLOAD_JOURNAL_ENTRY = 'ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST';
export const REMOVE_UPLOAD_JOURNAL_ENTRY = 'REMOVE_UPLOAD_JOURNAL_ENTRY';
export const CLEAR_UPLOAD_J_ENTRIES = 'CLEAR_UPLOAD_J_ENTRIES';
export const UPDATE_J_ENTRIES_ON_LOGIN = 'UPDATE_J_ENTRIES_ON_LOGIN';

// form types
export const JOURNAL_ENTRY = 'journal entry';
export const FILE = 'file';
export const PHOTO = 'photo';
export const AUDIO = 'audio';

// AsyncStorage keys
export const DEFAULT_BLOG_ID = 'DEFAULT_BLOG_ID';
export const DEFAULT_FOLDER_TITLE = 'DEFAULT_FOLDER_TITLE';

// OTHER DATA
// guest blog and folder objects
export const GUEST_USERNAME = 'GUEST_USERNAME';
export const GUEST_TOKEN = 'GUEST_TOKEN';
export const GUEST_BLOG: UserBlog = {
  id: -1,
  title: 'Guest Blog',
  description: null,
  locked: false,
  numBlogPosts: -1
};

export const GUEST_FOLDER: UserFolder = {
  id: -1,
  title: 'Guest Images'
};
