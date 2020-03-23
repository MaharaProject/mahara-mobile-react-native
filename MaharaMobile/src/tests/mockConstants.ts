import {MaharaPendingFile, PendingJournalEntry} from '../models/models';
import {
  newJournalEntry,
  newMaharaFile,
  newMaharaFileFormData,
  newUserBlog,
  newUserFolder,
  newUserTag
} from '../models/typeCreators';
import {RootState} from '../reducers/rootReducer';
import {UploadFilesState} from '../reducers/uploadFilesReducer';
import {UploadJEntriesState} from '../reducers/uploadJEntriesReducer';
import {
  UserBlogsState,
  UserFoldersState
} from '../reducers/userArtefactsReducer';
import {UserTagInfoState} from '../reducers/userTagsReducer';

export const RAND_STRING = 'abc123';
export const NUMBERS_ARR = [1, 2, 3];

export const MOCK_BLOGS = [newUserBlog(RAND_STRING, false, 0, RAND_STRING)];
export const MOCK_DESCRIPTION = 'description abcdefghijkl...';
export const MOCK_BLOGPOST_BODY = '...';
// export const MOCK_FILENAME = 'filenameA';
export const MOCK_FOLDERNAME = 'foldernameA';
export const MOCK_SIZE_ZERO = 0;
export const MOCK_TOKEN = 'token';
export const MOCK_TYPE = 'mock type';
export const MOCK_URI = '/file';
export const MOCK_URL = 'www.mock.com';
export const MOCK_TAGS = [
  newUserTag('tagA'),
  newUserTag('tagB'),
  newUserTag('tagC')
];
export const MOCK_USER_FOLDERS = [newUserFolder(RAND_STRING)];
export const MOCK_WEB_SERVICE = 'www ... webservice';
export const MOCK_USERNAME = 'phoebe the phoenix';
export const MOCK_FILE_IDS = ['f1', 'f2', 'f3'];
export const MOCK_FILE_TITLES = ['cat photo', 'dog photo', 'turtle photo'];
export const MOCK_BLOG_IDS = NUMBERS_ARR;
export const MOCK_BLOG_TITLES = ['juice blog', 'donuts blog', 'coffee blog'];
export const MOCK_JENTRY_TITLES = {
  title1: 'monday mood',
  title2: 'tuesday tea',
  title3: 'wednesday wildberries'
};
export const MOCK_JENTRY_IDS = ['j1', 'j2', 'j3'];
export const MOCK_MIMETYPES = {
  audio: 'audio/ogg',
  image: 'image/png',
  video: 'video/mpeg',
  app: 'application/pdf'
};

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

export const MOCK_MAHARA_FORM_DATA_1 = newMaharaFileFormData(
  MOCK_WEB_SERVICE,
  MOCK_TOKEN,
  MOCK_FOLDERNAME,
  'maharaFileImage',
  MOCK_DESCRIPTION,
  MOCK_MAHARA_FILE
);

export const MOCK_MAHARA_FORM_DATA_2 = newMaharaFileFormData(
  MOCK_WEB_SERVICE,
  MOCK_TOKEN,
  MOCK_FOLDERNAME,
  'maharaFileAudio',
  MOCK_DESCRIPTION,
  MOCK_MAHARA_FILE
);

export const MOCK_MAHARA_FORM_DATA_3 = newMaharaFileFormData(
  MOCK_WEB_SERVICE,
  MOCK_TOKEN,
  MOCK_FOLDERNAME,
  'maharaFileVideo',
  MOCK_DESCRIPTION,
  MOCK_MAHARA_FILE
);

export const MOCK_MAHARA_PENDING_FILE_1: MaharaPendingFile = {
  id: MOCK_FILE_IDS[0],
  url: MOCK_URL,
  maharaFormData: MOCK_MAHARA_FORM_DATA_1,
  mimetype: MOCK_MIMETYPES.image,
  type: MOCK_TYPES.image
};

export const MOCK_MAHARA_PENDING_FILE_2: MaharaPendingFile = {
  id: MOCK_FILE_IDS[1],
  url: MOCK_URL,
  maharaFormData: MOCK_MAHARA_FORM_DATA_2,
  mimetype: MOCK_MIMETYPES.audio,
  type: MOCK_TYPES.audio
};

export const MOCK_MAHARA_PENDING_FILE_3: MaharaPendingFile = {
  id: MOCK_FILE_IDS[2],
  url: MOCK_URL,
  maharaFormData: MOCK_MAHARA_FORM_DATA_3,
  mimetype: MOCK_MIMETYPES.video,
  type: MOCK_TYPES.video
};

export const MOCK_MAHARA_PENDING_FILES_ARR = [
  MOCK_MAHARA_PENDING_FILE_1,
  MOCK_MAHARA_PENDING_FILE_2,
  MOCK_MAHARA_PENDING_FILE_3
];

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
  journalEntry: MOCK_JOURNAL_ENTRY_1,
  url: MOCK_URL
};

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
  uploadJEntries: {},
  uploadJEntriesIds: []
};

export const MOCK_STATE_UPLOAD_FILES: UploadFilesState = {
  uploadFiles: {
    [MOCK_FILE_IDS[0]]: MOCK_MAHARA_PENDING_FILE_1,
    [MOCK_FILE_IDS[1]]: MOCK_MAHARA_PENDING_FILE_2,
    [MOCK_FILE_IDS[2]]: MOCK_MAHARA_PENDING_FILE_3
  },
  uploadFilesIds: MOCK_FILE_IDS
};

export const MOCK_STATE_USER_FOLDERS: UserFoldersState = [];

export const MOCK_STATE_USER_BLOGS: UserBlogsState = [];

export const MOCK_STATE_USER_TAGS_INFO: UserTagInfoState = {
  taggedItems: {},
  taggedItemsIds: [],
  userTags: [],
  userTagsIds: []
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
