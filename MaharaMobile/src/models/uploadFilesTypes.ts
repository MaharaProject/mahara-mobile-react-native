import { PendingMFile, UserFolder } from './models';

export type UploadFilesActions = {
  type: string;
  file: PendingMFile;
  id: string;
  token: string;
  urlDomain: string;
  userFolders: UserFolder[];
};
