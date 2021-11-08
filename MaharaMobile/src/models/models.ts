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

export type Tags = Array<UserTag>;
export type Folders = Array<UserFolder>;
export type Blogs = Array<UserBlog>;
export type Username = Array<UserFolder>;

export type User = {
  userName: Username;
  userFolders: Folders;
  userTags: Tags;
  userBlogs: Blogs;
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
// replaced with updated in in library
// export type MessageDescriptor = {
//   id: string;
//   defaults?: string;
//   values?: object;
//   formats?: object;
// };

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

export type ItemId = string;
export type TagId = number;
export type TagsIds = Array<number>;
export type TaggedItems = Record<ItemId, Set<TagId>>;
export type TaggedItemKeys = Array<ItemId>;
// libraries

// react native image-picker
export type ReactNativeImagePickerResponse = {
  didCancel?: boolean;
  errorCode?: any;
  errorMessage?: string;
  assets?: ReactNativeImagePickerAsset;
};

export type ReactNativeImagePickerAsset = {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
  base64?: string;
  duration?: any;
};

export type ReactNativeImagePickerErrorCode = {
  camera_unavailable?: any;
  permission?: any;
  others?: any;
};
