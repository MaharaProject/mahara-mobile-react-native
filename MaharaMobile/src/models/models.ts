export type RequestErrorPayload = {
  code: number;
  message: string;
  previousError?: Error;
};

export type MaharaFile = {
  uri: string;
  type: string;
  name: string;
  size: number; // Not used in upload
};

export type MaharaPendingFile = {
  id: string;
  url: string; // for files, this url includes tags
  maharaFormData: MaharaFileFormData;
  mimetype: string;
  type: string;
};

export type JournalEntry = {
  blogid: number;
  wsfunction: string;
  wstoken: string; // aka: ws function
  title: string;
  body: string;
  isdraft: boolean;
};

export type PendingJournalEntry = {
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

export type MaharaFileFormData = {
  webservice: string;
  wstoken: string;
  foldername: string;
  title: string;
  description: string;
  filetoupload: MaharaFile;
};

// as stated in LinguiJS docs: https://lingui.js.org/ref/macro.html#usage
export type MessageDescriptor = {
  id: string;
  defaults?: string;
  values?: object;
  formats?: object;
};

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
};

export type DisplayItems = Array<PendingJournalEntry | MaharaPendingFile>;

export type Playback = {current_position: number; duration: number};
