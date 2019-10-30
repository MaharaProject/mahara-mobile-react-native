export const ADD_TOKEN = 'ADD_TOKEN';
export const USER_NAME = 'USER_NAME';
export const USER_FOLDERS = 'USER_FOLDERS';
export const USER_TAGS = 'USER_TAGS';
export const USER_BLOGS = 'USER_BLOGS';
export const UPDATE_UPLOAD_LIST = 'UPDATE_UPLOAD_LIST';

export function addToken(token) {
  return { type: ADD_TOKEN, token }
}

export function addUserName(userName) {
  return { type: USER_NAME, userName }
}

export function addUserFolders(userFolders) {
  return { type: USER_FOLDERS, userFolders }
}

export function addUserTags(userTags) {
  return { type: USER_TAGS, userTags }
}

export function addUserBlogs(userBlogs) {
  return { type: USER_BLOGS, userBlogs }
}

export function uploadToMahara(uploadList:Array<any>) { //update later to be Array<File> & import File model

}

export function updateUploadList(uploadList:Array<any>) { //update later to be Array<File> & import File model
  return { type: UPDATE_UPLOAD_LIST, uploadList }
}
