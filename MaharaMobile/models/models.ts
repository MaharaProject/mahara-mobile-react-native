
export interface file {
  uri: string;
  type: string;
  name: string;
  size: number;
}

export interface userFolders {
  title: string;
}

export interface user {
  userName: string;
  userFolders: userFolders;
  userTags: Array<object>;
  userBlogs: Array<object>;
}

export interface formData {
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
