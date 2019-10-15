export const ADD_TOKEN = 'ADD_TOKEN';
export const USER_NAME = 'USER_NAME';
export const USER_FOLDERS = 'USER_FOLDERS';
export const USER_TAGS = 'USER_TAGS';

export function addToken(token) {
  return { type: ADD_TOKEN, token }
}

export function userName(username) {
  return { type: USER_NAME, username }
}

export function userFolders(userfolders) {
  return { type: USER_FOLDERS, userfolders }
}

export function userTags(usertags) {
  return { type: USER_TAGS, usertags }
}
