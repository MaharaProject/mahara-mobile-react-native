export interface Store {
  app: InitialState;
}

export interface InitialState {
  token: string;
  userName: string;
  userFolders: Array<UserFolders>;
  userTags: Array<any>;
  uploadList: Array<File>;
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

export interface UserFolders {
  title: string;
}

export interface User {
  userName: string;
  userFolders: UserFolders;
  userTags: Array<object>;
  userBlogs: Array<object>;
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
