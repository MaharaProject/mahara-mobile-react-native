import {WS_FUNCTION_UPLOAD_BLOGPOST} from '../utils/constants';
import {
  JournalEntry,
  MaharaFile,
  MaharaFileFormData,
  PendingJournalEntry,
  UserTag,
  UserFolder,
  UserBlog
} from './models';

export const newMaharaFile = (
  uri: string,
  type: string,
  name: string,
  size: number
): MaharaFile => {
  return {uri, type, name, size};
};

export const newMaharaFileFormData = (
  webService: string,
  token: string,
  folderName: string,
  fileName: string,
  desc: string,
  file: MaharaFile
): MaharaFileFormData => {
  return {
    description: desc,
    name: fileName,
    filetoupload: file,
    foldername: folderName,
    webservice: webService,
    wstoken: token
  };
};

export const newJournalEntry = (
  blogId: number,
  wsToken: string,
  title: string,
  body: string,
  isDraft: boolean
): JournalEntry => {
  return {
    blogid: blogId,
    wsfunction: WS_FUNCTION_UPLOAD_BLOGPOST,
    wstoken: wsToken,
    title,
    body,
    isdraft: isDraft
  };
};

export const newPendingJournalEntry = (
  url: string,
  journalEntry: JournalEntry
): PendingJournalEntry => {
  const id = Math.random() * 10 + journalEntry.title;

  return {
    id,
    url,
    journalEntry
  };
};

export const newMaharaPendingFile = (
  itemId = '',
  url: string,
  maharaFormData: MaharaFileFormData,
  mimetype: string,
  type: string
) => {
  let id = itemId;
  if (!id) {
    id = Math.random() * 10 + url;
  }
  return {
    id,
    url,
    maharaFormData,
    mimetype,
    type
  };
};

/**
 * Creates a new UserTag and returns the object.
 * @param tagName string
 */
export const newUserTag = (tagName: string): UserTag => ({
  id: Math.round(Math.random() * 1000),
  tag: tagName
});
// id is just external from Mahara, for structure in this app

export const newUserFolder = (title: string): UserFolder => {
  return {
    id: Math.round(Math.random() * 1000),
    title
  };
};

export const newUserBlog = (
  desc: string,
  locked = false,
  numBlogPosts = 0,
  title: string
): UserBlog => {
  return {
    description: desc,
    id: Math.round(Math.random() * 1000),
    locked,
    numBlogPosts,
    title
  };
};
