import {PendingJournalEntry, UserBlog} from '../models/models';

export type UploadJEntriesActions = {
  type: string;
  journalEntry: PendingJournalEntry;
  id: string;
  token: string;
  urlDomain: string;
  userBlogs: UserBlog[];
};
