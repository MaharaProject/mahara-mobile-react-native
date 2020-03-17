import {PendingJournalEntry, UserBlog} from './models';

export type UploadJEntriesActions = {
  type: string;
  journalEntry: PendingJournalEntry;
  id: string;
  token: string;
  urlDomain: string;
  userBlogs: UserBlog[];
};
