import {userTagsReducer} from '../../store/reducers/userTagsReducer';
import {TAGS_IDS, TAG_ITEM} from '../../utils/constants';
import {
  MOCK_MAHARA_PENDING_FILE_0,
  MOCK_PENDING_JOURNAL_ENTRY_0,
  MOCK_TAGIDS_SET_0
} from '../mockConstants';

// USER ARTEFACTS REDUCER

describe('userTags state ', () => {
  it('should set up default userBlogs state values', () => {
    const state = userTagsReducer(undefined, {type: ''});
    expect(state).toEqual({
      userTags: [],
      userTagsIds: [],
      taggedItems: {},
      taggedItemsIds: []
    });
  });

  const state = userTagsReducer(undefined, {
    type: TAG_ITEM,
    tagIds: TAGS_IDS[0],
    itemId: MOCK_PENDING_JOURNAL_ENTRY_0.id
  });

  it('should add first tag to item', () => {
    expect(state.taggedItems).toEqual({
      [MOCK_PENDING_JOURNAL_ENTRY_0.id]: new Set(TAGS_IDS[0])
    });

    expect(state.taggedItemsIds).toEqual([MOCK_PENDING_JOURNAL_ENTRY_0.id]);
  });

  // After adding a teg to item
  const state1 = userTagsReducer(state, {
    type: TAG_ITEM,
    tagIds: TAGS_IDS[1],
    itemId: MOCK_PENDING_JOURNAL_ENTRY_0.id
  });

  it('should add second tag with first tag to item', () => {
    expect(state1.taggedItems).toEqual({
      [MOCK_PENDING_JOURNAL_ENTRY_0.id]: new Set([TAGS_IDS[0], TAGS_IDS[1]])
    });
    expect(state.taggedItemsIds).toEqual([MOCK_PENDING_JOURNAL_ENTRY_0.id]);
  });

  const state2 = userTagsReducer(state1, {
    type: TAG_ITEM,
    tagIds: MOCK_TAGIDS_SET_0,
    itemId: MOCK_MAHARA_PENDING_FILE_0.id
  });
  it('should add a new tagged item along side other tagged items', () => {
    expect(state2.taggedItems).toEqual({
      [MOCK_PENDING_JOURNAL_ENTRY_0.id]: new Set([TAGS_IDS[0], TAGS_IDS[1]]),
      [MOCK_MAHARA_PENDING_FILE_0.id]: MOCK_TAGIDS_SET_0
    });
    expect(state2.taggedItemsIds).toEqual([
      MOCK_PENDING_JOURNAL_ENTRY_0.id,
      MOCK_MAHARA_PENDING_FILE_0.id
    ]);
  });
});
