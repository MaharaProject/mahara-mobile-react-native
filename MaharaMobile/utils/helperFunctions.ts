import { JournalEntry, MaharaFileFormData } from '../models/models';
import { updateUserName, updateUserBlogs, updateUserFolders, updateUserTags } from '../actions/actions';

export function sendTokenLogin(serverUrl: string, requestOptions: any) {
  return async function (dispatch: any) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      dispatch(updateUserName(json));
      dispatch(updateUserTags(json));
      dispatch(updateUserBlogs(json));
      dispatch(updateUserFolders(json));
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

export function buildObject(item: any) {
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

export function isJournalEntry(x: any): x is JournalEntry {
  return (x as JournalEntry).blogid !== undefined;
}

export function isMaharaFileFormData(x: any): x is MaharaFileFormData {
  return (x as MaharaFileFormData).filetoupload !== undefined;
}