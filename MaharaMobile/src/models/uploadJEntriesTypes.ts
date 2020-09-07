import {PendingJEntry, UserBlog} from './models';

export type UploadJEntriesActions = {
  type: string;
  journalEntry: PendingJEntry;
  id: string;
  token: string;
  urlDomain: string;
  userBlogs: UserBlog[];
};
