export interface Store {
  app: InitialState;
}

export interface InitialState {
  token: string;
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  uploadList: Array<MaharaFile>;
  userBlogs: Array<any>;
}

export interface Blob {
  readonly uri: any;
  readonly type: string;
  readonly name: string;
  readonly size: number;
  slice(start?: number, end?: number, contentType?: string): Blob;
}

export interface MaharaFile {
  uri: string;
  type: string; //mimetype
  name: string;
  size: number;
}

export interface JournalEntry {
  blogid: number;
  wsfunction: string;
  wstoken: string;
  title: string;
  body: string;
  isdraft: boolean;
  tags?: Array<string>;
}

export interface User {
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
}

export interface UserFolder {
  title: string;
}

export interface UserTag {
  tag: string;
  usage: number;
}

export interface UserBlog {
  description: string;
  id: number;
  locked: boolean;
  numBlogPosts: number;
  title: string;
}

export interface FormData {
  webservice: string;
  wstoken: string;
  foldername: string;
  title: string;
  description: string;
  filetoupload: {
    uri: string,
    type: string,
    name: string,
  };
}
