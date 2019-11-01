import { user, file } from '../models/models';

export const ADD_TOKEN = 'ADD_TOKEN';
export const ADD_USER = 'ADD_USER';
export const UPDATE_UPLOAD_LIST = 'UPDATE_UPLOAD_LIST';

export function addUser(json: any) {
  return {
    type: ADD_USER,
    userName: json.userprofile.myname,
    userTags: json.tags.tags,
    userBlogs: json.blogs.blogs,
    userFolders: json.folders.folders
  }
}

export function addToken(token: string) {
  return { type: ADD_TOKEN, token }
}

export function uploadToMahara(uploadList:Array<file>) {

}

export function updateUploadList(uploadList:Array<file>) {
  return { type: UPDATE_UPLOAD_LIST, uploadList }
}

export function sendTokenLogin(serverUrl: string, requestOptions: any) {
  return async function(dispatch: any) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      dispatch(addUser(json));
    } catch (error) {
      // errorHandle(error);
    }
  }
}
