import { useEffect, useRef } from 'react';
import { t } from '@lingui/macro';
import { StackActions } from '@react-navigation/native';
import {
  JournalEntry,
  MaharaFile,
  PendingJEntry,
  PendingMFile,
  UploadItemType,
  UserBlog,
  UserBlogJSON,
  UserTag
} from 'models/models';
import { newUploadResponse } from 'models/typeCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJournalEntry(x: any): x is JournalEntry {
  return (x as JournalEntry).blogid !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPendingJEntry(x: any): x is PendingJEntry {
  return (x as PendingJEntry).journalEntry !== undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMaharaFile(x: any): x is MaharaFile {
  return (x as MaharaFile).filetoupload !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPendingMFile(x: any): x is PendingMFile {
  return (x as PendingMFile).maharaFormData !== undefined;
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
  if (isMaharaFile(item)) {
    const sendFormData = new FormData();
    sendFormData.append('wsfunction', item.webservice);
    sendFormData.append('wstoken', item.wstoken);
    sendFormData.append('foldername', item.foldername);
    sendFormData.append('title', item.name);
    sendFormData.append('description', item.description);
    sendFormData.append('filetoupload', item.filetoupload as unknown as Blob);
    return {
      method: 'POST',
      body: sendFormData
    };
  }
  return null;
}

export function uploadItemToMahara(url: string, item: object) {
  let customResponse = null;
  const uploadObject = buildObject(item);
  return async () => {
    try {
      return await fetch(url, uploadObject)
        .then((response) => response.json())
        .then((result) => result);
    } catch (error) {
      customResponse = newUploadResponse(
        '',
        t`Please check the internet connection.`,
        '',
        '',
        {},
        0
      );
    }

    // the way Mahara works, we will always receive a 200 status from the backend on upload
    // therefore, this catch will never get triggered
    return customResponse;
  };
}

export const popNavigationStack = StackActions.pop({ n: 1 });

// to use prevProps in Hooks
export function usePreviousProps(value: number) {
  const ref: React.MutableRefObject<number> = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const findUserTagByString = (tagString: string, tags: Array<UserTag>) =>
  tags.find((tag: UserTag) => tag.tag === tagString);

export const getUploadTypeIntlStrings = (itemType: UploadItemType) => {
  switch (itemType) {
    case 'AUDIO':
      return t`Audio`;
    case 'FILE':
      return t`File`;
    case 'J_ENTRY':
      return t`Journal entry`;
    case 'PHOTO':
      return t`Photo`;
    default:
      return t`Invalid type`;
  }
};

/**
 * Checks for valid URL by searching for https:// and /
 * @param url
 */
export const addHttpTrims = (url: string): string => {
  let result = url.trim().toLowerCase();
  if (url.length > 0 && url.slice(-1) !== '/') {
    result += '/';
  }

  if (!/^https?:\/\//.test(result)) {
    result = `https://${result}`;
  }
  return result;
};
