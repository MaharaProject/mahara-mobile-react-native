export type MaharaStore = {
  app: InitialState;
}

export type InitialState = {
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  token: string;
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  uploadList: {
    files: Array<MaharaPendingFile>,
    journalEntries: Array<PendingJournalEntry>
  }
  userBlogs: Array<any>;
}

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
}

export type MaharaPendingFile = {
  maharaFormData: MaharaFileFormData;
  id: string;
  mimetype: string;
  url: string; // for files, this url includes tags
}

export type JournalEntry = {
  blogid: number;
  wsfunction: string;
  wstoken: string; // aka: ws function
  title: string;
  body: string;
  isdraft: boolean;
  tags?: Array<string>;
}

export type PendingJournalEntry = {
  journalEntry: JournalEntry,
  id: string;
  url: string;
}

export type User = {
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
}

export type UserFolder = {
  title: string;
}

export type UserTag = {
  tag: string;
  usage: number;
}

export type UserBlog = {
  description: string;
  id: number;
  locked: boolean;
  numBlogPosts: number;
  title: string;
}

export type MaharaFileFormData = {
  webservice: string;
  wstoken: string;
  foldername: string;
  title: string;
  description: string;
  filetoupload: {
    uri: string,
    type: string,
    name: string,
  }
}
