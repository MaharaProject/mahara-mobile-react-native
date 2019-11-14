import { MaharaFile, JournalEntry } from '../models/models';

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

// TODO: add function for adding tags to loca state
// function for adding tag start
// export function addTag(tag: string) {
//   return {
//     type: ADD_TAG,
//     tag: tag
//   }
// }

export function addToken(token: string) {
  return { type: ADD_TOKEN, token }
}

export function updateUploadList(uploadList: Array<MaharaFile>) {
  return { type: UPDATE_UPLOAD_LIST, uploadList }
}

export function sendTokenLogin(serverUrl: string, requestOptions: any) {
  return async function (dispatch: any) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      dispatch(addUser(json));
    } catch (error) {
      // errorHandle(error);
    }
  }
}

export function uploadToMahara(url: string, formData: any) {
  return async function () {
    try {
      console.log('formData:', formData)
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('Success:', JSON.stringify(result));
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

export function uploadJournalToMahara(url: string, body: JournalEntry) {
  const journalEntry = JSON.stringify(body);

  return async function () {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: journalEntry
      });
      const result = await response.json();
      console.log('Success:', JSON.stringify(result));
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
