import {
  addJournalEntryToUploadList,
  clearUploadJEntires,
  removeUploadJEntry,
  updateJEntriesOnLogin
} from '../../actions/actions';
import {
  ADD_UPLOAD_JOURNAL_ENTRY,
  CLEAR_UPLOAD_J_ENTRIES,
  REMOVE_UPLOAD_JOURNAL_ENTRY,
  UPDATE_J_ENTRIES_ON_LOGIN
} from '../../utils/constants';
import {
  RAND_STRING,
  MOCK_BLOGS,
  MOCK_PENDING_JOURNAL_ENTRY_0
} from '../mockConstants';

// UPLOAD JOURNAL ENTRIES REDUCER ACTION CREATORS

describe('UploadJEntries reducer action creators', () => {
  it('should set up add journal entry to upload list', () => {
    const action = addJournalEntryToUploadList(MOCK_PENDING_JOURNAL_ENTRY_0);
    expect(action).toEqual({
      type: ADD_UPLOAD_JOURNAL_ENTRY,
      journalEntry: MOCK_PENDING_JOURNAL_ENTRY_0
    });
  });

  describe('removeUploadJEntry', () => {
    it('should set up remove upload journal entry', () => {
      const action = removeUploadJEntry(RAND_STRING);
      expect(action).toEqual({
        type: REMOVE_UPLOAD_JOURNAL_ENTRY,
        id: RAND_STRING
      });
    });
  });

  describe('clearUploadJEntires', () => {
    it('should set up clear upload journal entries', () => {
      const action = clearUploadJEntires();
      expect(action).toEqual({type: CLEAR_UPLOAD_J_ENTRIES});
    });
  });

  describe('updateJEntriesOnLogin', () => {
    it('should set up update journal entries on login', () => {
      const action = updateJEntriesOnLogin(
        RAND_STRING,
        RAND_STRING,
        MOCK_BLOGS
      );
      expect(action).toEqual({
        type: UPDATE_J_ENTRIES_ON_LOGIN,
        token: RAND_STRING,
        urlDomain: RAND_STRING,
        userBlogs: MOCK_BLOGS
      });
    });
  });
});
