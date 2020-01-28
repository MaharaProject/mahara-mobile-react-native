import { JournalEntry, MaharaFileFormData, MaharaPendingFile, PendingJournalEntry } from '../models/models';
import { updateUserName, updateUserBlogs, updateUserFolders, updateUserTags } from '../actions/actions';

import { StackActions } from 'react-navigation';
import { useEffect, useRef } from 'react';

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
  return async function (dispatch: any) {
    try {
      return await fetch(url, uploadObject)
        .then(response => response.json())
        .then(result => result);
    } catch (error) {
      // the way Mahara works, we will always receive a 200 status from the backend on upload
      // therefore, this catch will never get triggered
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

export function isPendingJournalEntry(x: any): x is PendingJournalEntry {
  return (x as PendingJournalEntry).journalEntry !== undefined;
}
export function isMaharaFileFormData(x: any): x is MaharaFileFormData {
  return (x as MaharaFileFormData).filetoupload !== undefined;
}

export function isMaharaPendingFile(x: any): x is MaharaPendingFile {
  return (x as MaharaPendingFile).maharaFormData !== undefined;
}

export const popNavigationStack = StackActions.pop({ n: 1 });

// to use prevProps in Hooks
export function usePreviousProps(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
