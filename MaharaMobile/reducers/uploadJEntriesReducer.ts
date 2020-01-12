import { PendingJournalEntry } from '../models/models';
import { RootState } from './reducers';
import {
  ADD_UPLOAD_JOURNAL_ENTRY,
  REMOVE_UPLOAD_JOURNAL_ENTRY,
} from '../utils/constants';

type UploadJEntriesState = {
  uploadJEntries: Record<string, PendingJournalEntry>;
  uploadJEntriesIds: Array<string>;
};

const initialState: UploadJEntriesState = {
  uploadJEntries: {},
  uploadJEntriesIds: [],
};

// HELPER FUNCTIONS
const addJEntryToUploadList = (
  state: UploadJEntriesState,
  journalEntry: PendingJournalEntry,
) => {
  const uploadJEntries = {
    ...state.uploadJEntries,
    [journalEntry.id]: journalEntry,
  };
  const uploadJEntriesIdsSet = new Set([
    ...state.uploadJEntriesIds,
    journalEntry.id,
  ]);

  const uploadJEntriesIds = Array.from(uploadJEntriesIdsSet)
  const newState: UploadJEntriesState = {
    uploadJEntries,
    uploadJEntriesIds
  };

  return newState;
};

/**
 *  Filter out given id from state and delete the journal entry matching id
 */
const removeUploadJEntry = (
  state: UploadJEntriesState,
  id: string,
): UploadJEntriesState => {
  const updatedJEntriesIds = state.uploadJEntriesIds.filter(
    (uploadJEntriesId: string) => uploadJEntriesId !== id,
  );

  const updatedJEntries = { ...state.uploadJEntries };
  delete updatedJEntries[id];

  return {
    uploadJEntries: updatedJEntries,
    uploadJEntriesIds: updatedJEntriesIds,
  };
};

// REDUCER
export const uploadJEntriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_UPLOAD_JOURNAL_ENTRY:
      return addJEntryToUploadList(state, action.journalEntry);
    case REMOVE_UPLOAD_JOURNAL_ENTRY:
      return removeUploadJEntry(state, action.id);
    default:
      return state;
  }
};

// Selectors
const uploadJEntriesState = (state: RootState) => state.appState.uploadJEntries;

export const selectAllJEntries = (
  state: RootState,
): Array<PendingJournalEntry> => {
  const { uploadJEntries } = uploadJEntriesState(state);
  const { uploadJEntriesIds } = uploadJEntriesState(state);
  const jEntries = uploadJEntriesIds.map((id: string) => uploadJEntries[id]);
  return jEntries;
};

export const selectAllJEntriesIds = (state: RootState) => [
  ...state.appState.uploadJEntries.uploadJEntriesIds,
];

export const selectJEntryById = (
  state: RootState,
  { id }: { id: string },
): PendingJournalEntry => {
  const { uploadJEntries } = uploadJEntriesState(state);
  return uploadJEntries[id];
};
