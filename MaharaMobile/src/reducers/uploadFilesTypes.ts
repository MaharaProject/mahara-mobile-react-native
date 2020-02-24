import {MaharaPendingFile, UserFolder} from '../models/models';

export type UploadFilesActions = {
  type: string;
  file: MaharaPendingFile;
  id: string;
  token: string;
  urlDomain: string;
  userFolders: UserFolder[];
};
