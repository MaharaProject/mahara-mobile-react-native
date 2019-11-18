export interface Store {
  app: InitialState;
}

export interface InitialState {
  token: string;
  userName: string;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  uploadList: Array<MaharaPendingFile>;
  userBlogs: Array<any>;
}

export interface MaharaFile {
  uri: string;
  type: string; // mimetype
  name: string;
  size: number;
}

export interface MaharaPendingFile {
  maharaFormData: MaharaFormData;
  id: string;
  tagsUrl: string;
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

export interface MaharaFormData {
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
