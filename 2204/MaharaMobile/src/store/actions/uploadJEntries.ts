import {
  ADD_UPLOAD_JOURNAL_ENTRY,
  CLEAR_UPLOAD_J_ENTRIES,
  REMOVE_UPLOAD_JOURNAL_ENTRY,
  UPDATE_J_ENTRIES_ON_LOGIN
} from '../../utils/constants';
import {PendingJEntry, UserBlog} from '../../models/models';

// uploadJEntriesReducer

export function addJournalEntryToUploadList(journalEntry: PendingJEntry) {
  return {type: ADD_UPLOAD_JOURNAL_ENTRY, journalEntry};
}

export function removeUploadJEntry(id: string) {
  return {type: REMOVE_UPLOAD_JOURNAL_ENTRY, id};
}

export function clearUploadJEntires() {
  return {type: CLEAR_UPLOAD_J_ENTRIES};
}

export function updateJEntriesOnLogin(
  token: string,
  urlDomain: string,
  userBlogs: Array<UserBlog>
) {
  return {type: UPDATE_J_ENTRIES_ON_LOGIN, token, urlDomain, userBlogs};
}
