import {useEffect, useRef} from 'react';
import {StackActions} from 'react-navigation';
import {
  JournalEntry,
  MaharaFileFormData,
  MaharaPendingFile,
  PendingJournalEntry,
  UserBlog,
  UserBlogJSON,
  UserTag
} from '../models/models';

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

export function userBlogJSONtoUserBlog(blogJSON: UserBlogJSON) {
  const userBlog: UserBlog = {
    description: blogJSON.description,
    id: blogJSON.id,
    locked: blogJSON.locked,
    numBlogPosts: blogJSON.numblogposts,
    title: blogJSON.title
  };
  return userBlog;
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
    sendFormData.append('title', item.name);
    sendFormData.append('description', item.description);
    sendFormData.append('filetoupload', (item.filetoupload as unknown) as Blob);
    return {
      method: 'POST',
      body: sendFormData
    };
  }
  return null;
}

export function uploadItemToMahara(url: string, item: object) {
  const uploadObject = buildObject(item);
  return async () => {
    try {
      return await fetch(url, uploadObject)
        .then(response => response.json())
        .then(result => result);
    } catch (error) {
      // the way Mahara works, we will always receive a 200 status from the backend on upload
      // therefore, this catch will never get triggered
    }
    return null;
  };
}

export const popNavigationStack = StackActions.pop({n: 1});

// to use prevProps in Hooks
export function usePreviousProps(value: number) {
  const ref: React.MutableRefObject<number> = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const findUserTagByString = (tagString: string, tags: Array<UserTag>) =>
  tags.find((t: UserTag) => t.tag === tagString);
