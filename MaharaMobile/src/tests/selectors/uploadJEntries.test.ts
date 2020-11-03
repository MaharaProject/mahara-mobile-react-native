import {selectJEntryById} from '../../store/reducers/uploadJEntriesReducer';
import {
  MOCK_JENTRY_IDS,
  MOCK_PENDING_JOURNAL_ENTRY_0,
  MOCK_ROOT_STATE
} from '../mockConstants';

describe('uploadJEntrieReducers', () => {
  it('should select journal entry by id ', () => {
    // do nothing
  });
  const result = selectJEntryById(MOCK_ROOT_STATE, {id: MOCK_JENTRY_IDS[0]});
  expect(result).toEqual(MOCK_PENDING_JOURNAL_ENTRY_0);
});
