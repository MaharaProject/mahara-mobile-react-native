import { StackActions } from 'react-navigation';
import { useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { JournalEntry, MaharaFileFormData, MaharaPendingFile, PendingJournalEntry } from '../models/models';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJournalEntry(x: any): x is JournalEntry {
  return (x as JournalEntry).blogid !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPendingJournalEntry(x: any): x is PendingJournalEntry {
  return (x as PendingJournalEntry).journalEntry !== undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMaharaFileFormData(x: any): x is MaharaFileFormData {
  return (x as MaharaFileFormData).filetoupload !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMaharaPendingFile(x: any): x is MaharaPendingFile {
  return (x as MaharaPendingFile).maharaFormData !== undefined;
}

export function buildObject(item: object) {
  if (isJournalEntry(item)) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    };
  }
  if (isMaharaFileFormData(item)) {
    const sendFormData = new FormData();
    sendFormData.append('wsfunction', item.webservice);
    sendFormData.append('wstoken', item.wstoken);
    sendFormData.append('foldername', item.foldername);
    sendFormData.append('title', item.title);
    sendFormData.append('description', item.description);
    sendFormData.append('filetoupload', item.filetoupload);
    return {
      method: 'POST',
      body: sendFormData
    };
  }
  return null;
}

export function uploadItemToMahara(url: string, item: object) {
  const uploadObject = buildObject(item);
  return async function (dispatch: Dispatch) {
    try {
      return await fetch(url, uploadObject)
        .then(response => response.json())
        .then(result => result);
    } catch (error) {
      // the way Mahara works, we will always receive a 200 status from the backend on upload
      // therefore, this catch will never get triggered
    }
  };
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
