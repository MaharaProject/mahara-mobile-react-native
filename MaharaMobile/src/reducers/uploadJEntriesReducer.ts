import AsyncStorage from '@react-native-community/async-storage';
import { PendingJournalEntry, UserBlog } from '../models/models';
import { RootState } from './rootReducer';
import { arrayToObject } from '../utils/authHelperFunctions';
import { ADD_UPLOAD_JOURNAL_ENTRY, REMOVE_UPLOAD_JOURNAL_ENTRY, CLEAR_UPLOAD_J_ENTRIES, UPDATE_J_ENTRIES_ON_LOGIN } from '../utils/constants';

type UploadJEntriesState = {
  uploadJEntries: Record<string, PendingJournalEntry>;
  uploadJEntriesIds: Array<string>;
};

const initialState: UploadJEntriesState = {
  uploadJEntries: {},
  uploadJEntriesIds: []
};

// Helper functions
const getJEntries = (ids: string[], arr: Record<string, PendingJournalEntry>) => ids.map((id: string) => arr[id]);

const updateAsyncStorageJEntries = (jEntries: PendingJournalEntry[]) => {
  AsyncStorage.setItem('uploadJEntries', JSON.stringify(jEntries));
};

const addJEntryToUploadList = (
  state: UploadJEntriesState,
  journalEntry: PendingJournalEntry
) => {
  const updatedJEntries = {
    ...state.uploadJEntries,
    [journalEntry.id]: journalEntry
  };
  const updatedJEntriesIdsSet = new Set([
    ...state.uploadJEntriesIds,
    journalEntry.id
  ]);

  const updatedJEntriesIds = Array.from(updatedJEntriesIdsSet);
  updateAsyncStorageJEntries(getJEntries(updatedJEntriesIds, updatedJEntries));
  return {
    uploadJEntries: updatedJEntries,
    uploadJEntriesIds: updatedJEntriesIds
  };
};

/**
 *  Filter out given id from state and delete the journal entry matching id
 */
const removeUploadJEntry = (
  state: UploadJEntriesState,
  id: string
): UploadJEntriesState => {
  const updatedJEntriesIds = state.uploadJEntriesIds.filter(
    (uploadJEntriesId: string) => uploadJEntriesId !== id
  );

  const updatedJEntries = { ...state.uploadJEntries };
  delete updatedJEntries[id];

  updateAsyncStorageJEntries(getJEntries(updatedJEntriesIds, updatedJEntries));
  return {
    uploadJEntries: updatedJEntries,
    uploadJEntriesIds: updatedJEntriesIds
  };
};

const updateJEntriesOnLogin = (
  state: UploadJEntriesState,
  token: string,
  urlDomain: string,
  userBlogs: Array<UserBlog>
): UploadJEntriesState => {
  const uploadJEntries = {
    ...state.uploadJEntries
  };

  const newJournalEntries: Array<PendingJournalEntry> = [];
  const journalEntriesArr = Object.values(uploadJEntries);
  journalEntriesArr.forEach((pendingJEntry: PendingJournalEntry) => {
    const newPendingJEntry: PendingJournalEntry = {
      id: pendingJEntry.id,
      journalEntry: {
        ...pendingJEntry.journalEntry,
        blogid: userBlogs[1].id,
        wstoken: token
      },
      url: urlDomain + pendingJEntry.url
    };
    newJournalEntries.push(newPendingJEntry);
  });

  const updatedJEntries = arrayToObject(newJournalEntries);

  const newState: UploadJEntriesState = {
    ...state,
    uploadJEntries: updatedJEntries
  };
  updateAsyncStorageJEntries(newJournalEntries);
  return newState;
};

// REDUCER
export const uploadJEntriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_UPLOAD_JOURNAL_ENTRY:
      return addJEntryToUploadList(state, action.journalEntry);
    case REMOVE_UPLOAD_JOURNAL_ENTRY:
      return removeUploadJEntry(state, action.id);
    case CLEAR_UPLOAD_J_ENTRIES:
      return initialState;
    case UPDATE_J_ENTRIES_ON_LOGIN:
      return updateJEntriesOnLogin(state, action.token, action.urlDomain, action.userBlogs);
    default:
      return state;
  }
};

// Selectors
const uploadJEntriesState = (state: RootState) => state.appState.uploadJEntries;

export const selectAllJEntries = (
  state: RootState
): Array<PendingJournalEntry> => {
  const { uploadJEntries } = uploadJEntriesState(state);
  const { uploadJEntriesIds } = uploadJEntriesState(state);
  const jEntries = uploadJEntriesIds.map((id: string) => uploadJEntries[id]);
  return jEntries;
};

export const selectAllJEntriesIds = (state: RootState) => [
  ...state.appState.uploadJEntries.uploadJEntriesIds
];

export const selectJEntryById = (
  state: RootState,
  { id }: { id: string }
): PendingJournalEntry => {
  const { uploadJEntries } = uploadJEntriesState(state);
  return uploadJEntries[id];
};

export const selectNumOfJEntries = (state: RootState) => state.appState.uploadJEntries.uploadJEntriesIds.length;