import { PendingJEntry, UserBlog } from 'models/models';

export type UploadJEntriesActions = {
    type: string;
    journalEntry: PendingJEntry;
    id: string;
    token: string;
    urlDomain: string;
    userBlogs: UserBlog[];
};
