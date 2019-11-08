export interface Store {
  app: InitialState;
}

export interface InitialState {
  token: string;
  userName: string;
  userFolders: Array<UserFolders>;
  userTags: Array<UserTags>;
  uploadList: Array<File>;
  userBlogs: Array<any>;
}

export interface Blob {
  readonly uri: any;
  readonly type: string;
  readonly name: string;
  readonly size: number;
  slice(start?: number, end?: number, contentType?: string): Blob;
}

export interface File {
  uri: string;
  type: string;
  name: string;
  size: number;
}

export interface User {
  userName: string;
  userFolders: Array<UserFolders>;
  userTags: Array<UserTags>;
  userBlogs: Array<UserBlogs>;
}

export interface UserFolders {
  title: string;
}

export interface UserTags {
  tag: string;
  usage: number;
}

export interface UserBlogs {
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
