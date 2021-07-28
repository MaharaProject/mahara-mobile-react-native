export type RequestErrorPayload = {
  code: number;
  message: string;
  previousError?: Error;
};

export type UploadItemType = 'FILE' | 'PHOTO' | 'AUDIO' | 'J_ENTRY';

export type MessageInfoType = 'success' | 'warning' | 'error';

// Mahara file creation and for uploading

export type File = {
  uri: string;
  type: string;
  name: string;
  size: number; // Not used in upload
};

export type MaharaFile = {
  webservice: string;
  wstoken: string;
  foldername: string;
  name: string;
  description: string;
  filetoupload: File;
};

export type PendingMFile = {
  id: string;
  url: string; // for files, this url includes tags
  maharaFormData: MaharaFile;
  mimetype: string;
  type: UploadItemType;
};

// Journal entry creation and for uploading

export type JournalEntry = {
  blogid: number;
  wsfunction: string;
  wstoken: string;
  title: string;
  body: string;
  isdraft: boolean;
};

export type PendingJEntry = {
  id: string;
  url: string;
  journalEntry: JournalEntry;
};

export type User = {
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
};

export type UserFolder = {
  id: number;
  title: string;
};

export type UserTag = {
  id: number;
  tag: string;
};

export type UserBlog = {
  description: string;
  id: number;
  locked: boolean;
  numBlogPosts: number;
  title: string;
};

export type UserBlogJSON = {
  id: number;
  title: string;
  description: string;
  locked: boolean;
  numblogposts: number;
};

// as stated in LinguiJS docs: https://lingui.js.org/ref/macro.html#usage
export type MessageDescriptor = {
  id: string;
  defaults?: string;
  values?: object;
  formats?: object;
};

export type LoginType = 'basic' | 'sso' | 'token';

export type LoginInfo = {
  maharaversion: string;
  wwwroot: string;
  sitename: string;
  wsenabled: boolean;
  wsprotocols: Array<string>;
  mobileapienabled: boolean;
  mobileapiversion: string;
  logintypes: Array<string>;
};

export type UploadResponse = {
  error?: object;
  file?: number;
  error_name: string;
  error_class: string;
  error_message: string;
  error_rendered: string;
};

export type DisplayItems = Array<PendingJEntry | PendingMFile>;

export type PlayBackType = {
  isMuted?: boolean;
  currentPosition: number;
  duration: number;
};

export type RecordBackType = {
  isRecording?: boolean;
  currentPosition: number;
  currentMetering?: number;
};
