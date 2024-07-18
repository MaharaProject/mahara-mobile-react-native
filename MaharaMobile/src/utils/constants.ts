import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import {
  File,
  JournalEntry,
  MaharaFile,
  PendingJEntry,
  PendingMFile,
  UserBlog,
  UserFolder
} from 'models/models';

// action types - payloads of information that send data from your application to your store

// DOMAIN DATA
// userTagsReducer
export const ADD_USER_TAGS = 'ADD_USER_TAGS';
export const CLEAR_USER_TAGS = 'CLEAR_USER_TAGS';
export const UPDATE_ITEM_TAGS = 'UPDATE_ITEM_TAGS';

export const TAGGED_ITEMS = 'TAGGED_ITEMS';
export const UPDATE_TAGGED_ITEMS = 'UPDATE_TAGGED_ITEMS';
export const UPDATE_USER_TAGS = 'UPDATE_USER_TAGS';
export const USER_TAGS = 'USER_TAGS';

export const UPDATE_TAGS_IDS = 'UPDATE_TAGS_IDS';
export const TAGS_IDS = 'TAGS_IDS';
export const TAGGED_ITEMS_IDS = 'TAGGED_ITEMS_IDS';
export const SAVE_TAGGED_ITEMS_TO_ASYNC = 'SAVE_TAGGED_ITEMS_TO_ASYNC';

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
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
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

// AsyncStorage keys
export const DEFAULT_BLOG_TITLE = 'DEFAULT_BLOG_TITLE';
export const DEFAULT_FOLDER_TITLE = 'DEFAULT_FOLDER_TITLE';

// UI STATE
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_LANGUAGE = 'TOGGLE_LANGUAGE';

// OTHER DATA
// guest blog and folder objects
export const GUEST_USERNAME = 'Guest';
export const GUEST_TOKEN = 'GUEST_TOKEN';
export const GUEST_BLOG: UserBlog = {
  id: '-1',
  title: 'Guest Blog',
  description: '',
  locked: false,
  numBlogPosts: -1
};

export const GUEST_FOLDER: UserFolder = {
  id: -1,
  title: 'Guest Images'
};

// URLS
export const WS_FUNCTION_UPLOAD_BLOGPOST = 'module_mobileapi_upload_blog_post';

// AUDIO STATES
// recording
export const UNRECORDED = 'unrecorded';
export const RECORDING = 'recording';
export const RECORDED = 'recorded';

export const RECORD = 'Record';
export const STOP = 'Stop';
export const RERECORD = 'Re-record';
// playback
export const NOT_PLAYING = 'NOT_PLAYING';
export const PLAYING = 'PLAYING';

// Icons
export const LOG_IN_ICON = faArrowRight;
export const FOLDER_ICON = faFolder;
export const CAMERA_ICON = faCamera;

// SINGLETON EMPTY

export const emptyFile: File = { uri: '', type: '', name: '', size: 0 };
export const emptyMFile: MaharaFile = {
  webservice: '',
  wstoken: '',
  foldername: '',
  name: '',
  description: '',
  filetoupload: emptyFile
};
export const emptyPendingMFile: PendingMFile = {
  id: '',
  url: '',
  maharaFormData: emptyMFile,
  mimetype: '',
  type: 'FILE'
};

export const emptyJEntry: JournalEntry = {
  wstoken: '',
  blogid: '',
  wsfunction: '',
  title: '',
  body: '',
  isdraft: false
};
export const emptyPendingJEntry: PendingJEntry = {
  id: '',
  url: '',
  journalEntry: emptyJEntry
};
