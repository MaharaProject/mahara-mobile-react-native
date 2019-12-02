import { JournalEntry, MaharaPendingFile, PendingJournalEntry, MaharaFileFormData } from '../models/models';

export const ADD_TOKEN = 'ADD_TOKEN';
export const ADD_USER = 'ADD_USER';
export const UPDATE_UPLOAD_LIST = 'UPDATE_UPLOAD_LIST';
export const ADD_FILE_TO_UPLOAD_LIST = 'ADD_FILE_TO_UPLOAD_LIST';
export const ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST = 'ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST';

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

export function addFileToUploadList(file: MaharaPendingFile) {
  return { type: ADD_FILE_TO_UPLOAD_LIST, file }
}

export function addJournalEntryToUploadList(journalEntry: PendingJournalEntry) {
  return { type: ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST, journalEntry }
}

export function updateUploadList(uploadList: { files: Array<MaharaPendingFile>, journalEntries: Array<PendingJournalEntry> }) {
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

export function uploadItemToMahara(url: string, item: any) {
  const uploadObject = buildObject(item);
  return async function () {
    try {
      const response = await fetch(url, uploadObject);
      const result = await response.json();
      console.log('Success:', JSON.stringify(result));
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

function buildObject(item: any) {
  if (isJournalEntry(item)) {
    return ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  }
  else if (isMaharaFileFormData(item)) {
    const sendFormData = new FormData();
    sendFormData.append('wsfunction', item.webservice);
    sendFormData.append('wstoken', item.wstoken);
    sendFormData.append('foldername', item.foldername);
    sendFormData.append('title', item.title);
    sendFormData.append('description', item.description);
    sendFormData.append('filetoupload', item.filetoupload);
    return ({
      method: 'POST',
      body: sendFormData
    })
  }
}

function isJournalEntry(x: any): x is JournalEntry {
  return (x as JournalEntry).blogid !== undefined;
}

function isMaharaFileFormData(x: any): x is MaharaFileFormData {
  return (x as MaharaFileFormData).filetoupload !== undefined;
}