import {WS_FUNCTION_UPLOAD_BLOGPOST} from '../utils/constants';
import {
  File,
  JournalEntry,
  MaharaFile,
  PendingJEntry,
  UploadItemType,
  UploadResponse,
  UserBlog,
  UserFolder,
  UserTag
} from './models';

// Mahara file creation

export const newFile = (
  uri: string,
  mimetype: string,
  name: string,
  size: number
): File => {
  return {uri, type: mimetype, name, size};
};

export const newMaharaFile = (
  webService: string,
  token: string,
  folderName: string,
  fileName: string,
  desc: string,
  file: File
): MaharaFile => ({
  description: desc,
  name: fileName,
  filetoupload: file,
  foldername: folderName,
  webservice: webService,
  wstoken: token
});

export const newPendingMFile = (
  itemId = '',
  url: string,
  maharaFormData: MaharaFile,
  mimetype: string,
  type: UploadItemType
) => {
  let id = itemId;
  if (!id) {
    id = Math.random() * 10 + maharaFormData.name.substring(0, 5);
  }
  return {
    id,
    url,
    maharaFormData,
    mimetype,
    type
  };
};

// Journal entry creation

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

export const newPendingJEntry = (
  itemId = '',
  url: string,
  journalEntry: JournalEntry
): PendingJEntry => {
  let id = itemId;
  if (!id) {
    id = Math.floor(Math.random() * 100) + journalEntry.title;
  }

  return {
    id,
    url,
    journalEntry
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

export const newUploadResponse = (
  errorClass: string,
  errorMessage: string,
  errorRendered: string,
  errorName: string,
  error: object,
  file: number
): UploadResponse => {
  return {
    error_class: errorClass,
    error_message: errorMessage,
    error_name: errorName,
    error_rendered: errorRendered,
    error,
    file
  };
};
