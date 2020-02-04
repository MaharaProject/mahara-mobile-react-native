export type RequestErrorPayload = {
  code: number;
  message: string;
  previousError?: Error;
};

export type MaharaFile = {
  uri: string;
  type: string;
  name: string;
  size: number;
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
  tags?: Array<string>;
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
  title: string;
};

export type UserTag = {
  id: number;
  tag: string;
  usage: number;
};

export type UserBlog = {
  description: string;
  id: number;
  locked: boolean;
  numBlogPosts: number;
  title: string;
};

export type MaharaFileFormData = {
  webservice: string;
  wstoken: string;
  foldername: string;
  title: string;
  description: string;
  filetoupload: {
    uri: string;
    type: string;
    name: string;
  };
  tags?: string[];
};

// as stated in LinguiJS docs: https://lingui.js.org/ref/macro.html#usage
export type MessageDescriptor = {
  id: string;
  defaults?: string;
  values?: object;
  formats?: object;
};
