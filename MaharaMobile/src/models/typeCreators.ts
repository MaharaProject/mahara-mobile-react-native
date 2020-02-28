import {MaharaFile, MaharaFileFormData, UserTag} from './models';

export const createMaharaFileFormData = (
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

export const newJournalEntry = () => {};

export const newMaharaPendingFile = (
  itemId: string = null,
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
// TODO: id is just external from Mahara, for structure in this app
