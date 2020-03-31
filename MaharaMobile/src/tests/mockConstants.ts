import {
  MaharaPendingFile,
  PendingJournalEntry,
  UserBlog,
  UserTag
} from '../models/models';
import {
  newJournalEntry,
  newMaharaFile,
  newMaharaFileFormData,
  newUserFolder
} from '../models/typeCreators';
import {RootState} from '../reducers/rootReducer';
import {UploadFilesState} from '../reducers/uploadFilesReducer';
import {UploadJEntriesState} from '../reducers/uploadJEntriesReducer';
import {
  UserBlogsState,
  UserFoldersState
} from '../reducers/userArtefactsReducer';
import {UserTagInfoState} from '../reducers/userTagsReducer';

// General constants

export const MOCK_DESCRIPTION = 'description abcdefghijkl...';
export const MOCK_FILE_IDS = ['f0', 'f1', 'f2'];
export const MOCK_FILE_TITLES = ['cat photo', 'dog photo', 'turtle photo'];
export const MOCK_FOLDERNAME = 'foldernameA';
export const MOCK_SIZE_ZERO = 0;
export const MOCK_TOKEN = 'token';
export const MOCK_TYPE = 'mock type';
export const MOCK_URI = '/file';
export const MOCK_URL = 'www.mock.com';
export const MOCK_USERNAME = 'phoebe the phoenix';
export const MOCK_WEB_SERVICE = 'www ... webservice';
export const NUMBERS_ARR = [0, 1, 2];
export const RAND_STRING = 'abc123';

export const MOCK_MIMETYPES = {
  audio: 'audio/ogg',
  image: 'image/png',
  video: 'video/mpeg',
  app: 'application/pdf'
};

// Blog constants

export const MOCK_BLOG_DESCRIPTION = '... blog description';
export const MOCK_BLOG_IDS = NUMBERS_ARR;
export const MOCK_BLOG_TITLES = ['juice blog', 'donuts blog', 'coffee blog'];
export const MOCK_BLOGPOST_BODY = '...';

export const MOCK_BLOG_0: UserBlog = {
  description: `${MOCK_BLOG_DESCRIPTION}0`,
  id: MOCK_BLOG_IDS[0],
  locked: false,
  numBlogPosts: 0,
  title: MOCK_BLOG_TITLES[0]
};

export const MOCK_BLOG_1: UserBlog = {
  description: `${MOCK_BLOG_DESCRIPTION}1`,
  id: MOCK_BLOG_IDS[1],
  locked: false,
  numBlogPosts: 0,
  title: MOCK_BLOG_TITLES[1]
};

export const MOCK_BLOG_2: UserBlog = {
  description: `${MOCK_BLOG_DESCRIPTION}2`,
  id: MOCK_BLOG_IDS[2],
  locked: false,
  numBlogPosts: 0,
  title: MOCK_BLOG_TITLES[2]
};

export const MOCK_BLOGS = [MOCK_BLOG_0, MOCK_BLOG_1, MOCK_BLOG_2];

// User folder constants
export const MOCK_USER_FOLDERS = [newUserFolder(RAND_STRING)];

// Journal entry constants
export const MOCK_JENTRY_IDS = ['j1', 'j2', 'j3'];

export const MOCK_JENTRY_TITLES = {
  title1: 'monday mood',
  title2: 'tuesday tea',
  title3: 'wednesday wildberries'
};

export const MOCK_JOURNAL_ENTRY_0 = newJournalEntry(
  MOCK_BLOG_IDS[0],
  MOCK_TOKEN,
  MOCK_BLOG_TITLES[0],
  MOCK_BLOGPOST_BODY,
  false
);

export const MOCK_JOURNAL_ENTRY_1 = newJournalEntry(
  MOCK_BLOG_IDS[1],
  MOCK_TOKEN,
  MOCK_BLOG_TITLES[1],
  MOCK_BLOGPOST_BODY,
  false
);

export const MOCK_JOURNAL_ENTRY_2 = newJournalEntry(
  MOCK_BLOG_IDS[2],
  MOCK_TOKEN,
  MOCK_BLOG_TITLES[2],
  MOCK_BLOGPOST_BODY,
  false
);

export const MOCK_PENDING_JOURNAL_ENTRY_0: PendingJournalEntry = {
  id: MOCK_JENTRY_IDS[0],
  journalEntry: MOCK_JOURNAL_ENTRY_0,
  url: MOCK_URL
};

export const MOCK_PENDING_JOURNAL_ENTRY_1: PendingJournalEntry = {
  id: MOCK_JENTRY_IDS[1],
  journalEntry: MOCK_JOURNAL_ENTRY_1,
  url: MOCK_URL
};

export const MOCK_PENDING_JOURNAL_ENTRY_2: PendingJournalEntry = {
  id: MOCK_JENTRY_IDS[2],
  journalEntry: MOCK_JOURNAL_ENTRY_2,
  url: MOCK_URL
};

// File constants
export const MOCK_TYPES = {
  audio: 'audio',
  image: 'image',
  video: 'video',
  app: 'application'
};

export const MOCK_MAHARA_FILE = newMaharaFile(
  MOCK_URI,
  MOCK_TYPE,
  'maharaFile',
  MOCK_SIZE_ZERO
);

export const MOCK_MAHARA_FORM_DATA_0 = newMaharaFileFormData(
  MOCK_WEB_SERVICE,
  MOCK_TOKEN,
  MOCK_FOLDERNAME,
  'maharaFileImage',
  MOCK_DESCRIPTION,
  MOCK_MAHARA_FILE
);

export const MOCK_MAHARA_FORM_DATA_1 = newMaharaFileFormData(
  MOCK_WEB_SERVICE,
  MOCK_TOKEN,
  MOCK_FOLDERNAME,
  'maharaFileAudio',
  MOCK_DESCRIPTION,
  MOCK_MAHARA_FILE
);

export const MOCK_MAHARA_FORM_DATA_2 = newMaharaFileFormData(
  MOCK_WEB_SERVICE,
  MOCK_TOKEN,
  MOCK_FOLDERNAME,
  'maharaFileVideo',
  MOCK_DESCRIPTION,
  MOCK_MAHARA_FILE
);

export const MOCK_MAHARA_PENDING_FILE_0: MaharaPendingFile = {
  id: MOCK_FILE_IDS[0],
  url: MOCK_URL,
  maharaFormData: MOCK_MAHARA_FORM_DATA_1,
  mimetype: MOCK_MIMETYPES.image,
  type: MOCK_TYPES.image
};

export const MOCK_MAHARA_PENDING_FILE_1: MaharaPendingFile = {
  id: MOCK_FILE_IDS[1],
  url: MOCK_URL,
  maharaFormData: MOCK_MAHARA_FORM_DATA_1,
  mimetype: MOCK_MIMETYPES.audio,
  type: MOCK_TYPES.audio
};

export const MOCK_MAHARA_PENDING_FILE_2: MaharaPendingFile = {
  id: MOCK_FILE_IDS[2],
  url: MOCK_URL,
  maharaFormData: MOCK_MAHARA_FORM_DATA_2,
  mimetype: MOCK_MIMETYPES.video,
  type: MOCK_TYPES.video
};

export const MOCK_MAHARA_PENDING_FILES_ARR = [
  MOCK_MAHARA_PENDING_FILE_0,
  MOCK_MAHARA_PENDING_FILE_1,
  MOCK_MAHARA_PENDING_FILE_2
];

// Mock Root State

export const MOCK_STATE_LOGIN_INFO = {
  defaultBlogId: MOCK_BLOG_IDS[0],
  defaultFolderTitle: MOCK_BLOG_TITLES[0],
  isGuest: false,
  localLogin: false,
  profileIcon: MOCK_URI,
  ssoLogin: true,
  token: MOCK_TOKEN,
  tokenLogin: true,
  url: MOCK_URL,
  userName: MOCK_USERNAME
};

export const MOCK_STATE_UPLOAD_J_ENTRIES: UploadJEntriesState = {
  uploadJEntries: {
    [MOCK_JENTRY_IDS[0]]: MOCK_PENDING_JOURNAL_ENTRY_0,
    [MOCK_JENTRY_IDS[1]]: MOCK_PENDING_JOURNAL_ENTRY_1,
    [MOCK_JENTRY_IDS[2]]: MOCK_PENDING_JOURNAL_ENTRY_2
  },
  uploadJEntriesIds: []
};

export const MOCK_STATE_UPLOAD_FILES: UploadFilesState = {
  uploadFiles: {
    [MOCK_FILE_IDS[0]]: MOCK_MAHARA_PENDING_FILE_0,
    [MOCK_FILE_IDS[1]]: MOCK_MAHARA_PENDING_FILE_1,
    [MOCK_FILE_IDS[2]]: MOCK_MAHARA_PENDING_FILE_2
  },
  uploadFilesIds: MOCK_FILE_IDS
};

export const MOCK_STATE_USER_FOLDERS: UserFoldersState = [];

export const MOCK_STATE_USER_BLOGS: UserBlogsState = MOCK_BLOGS;

// Items with tags

// Tag constants
export const MOCK_TAG_IDS = NUMBERS_ARR;

export const MOCK_TAGS: Array<UserTag> = [
  {id: MOCK_TAG_IDS[0], tag: 'tag0'},
  {id: MOCK_TAG_IDS[1], tag: 'tag1'},
  {id: MOCK_TAG_IDS[2], tag: 'tag2'}
];

export const MOCK_TAGIDS_SET_0 = new Set<number>();
MOCK_TAGIDS_SET_0.add(MOCK_TAGS[2].id);

export const MOCK_TAGIDS_SET_1 = new Set<number>();
MOCK_TAGIDS_SET_1.add(MOCK_TAGS[0].id);
MOCK_TAGIDS_SET_1.add(MOCK_TAGS[1].id);

export const MOCK_TAGIDS_SET_2 = new Set<number>();
MOCK_TAGIDS_SET_2.add(MOCK_TAGS[1].id);
MOCK_TAGIDS_SET_2.add(MOCK_TAGS[2].id);

export const TAGGED_ITEMS_IDS = [MOCK_FILE_IDS[0], MOCK_JENTRY_IDS[1]];

export const MOCK_STATE_USER_TAGS_INFO: UserTagInfoState = {
  taggedItems: {
    [MOCK_FILE_IDS[0]]: MOCK_TAGIDS_SET_0,
    [MOCK_JENTRY_IDS[1]]: MOCK_TAGIDS_SET_1
  },
  taggedItemsIds: TAGGED_ITEMS_IDS,
  userTags: MOCK_TAGS,
  userTagsIds: MOCK_TAG_IDS
};

export const MOCK_ROOT_STATE: RootState = {
  appState: {
    uploadFiles: MOCK_STATE_UPLOAD_FILES,
    uploadJEntries: MOCK_STATE_UPLOAD_J_ENTRIES
  },
  domainData: {
    loginInfo: MOCK_STATE_LOGIN_INFO,
    userBlogs: MOCK_STATE_USER_BLOGS,
    userFolders: MOCK_STATE_USER_FOLDERS,
    userTagsInfo: MOCK_STATE_USER_TAGS_INFO
  }
};
