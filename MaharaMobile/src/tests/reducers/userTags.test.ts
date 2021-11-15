import {userTagsReducer} from '../../store/reducers/userTagsReducer';
import {UPDATE_ITEM_TAGS} from '../../utils/constants';
import {
  MOCK_MAHARA_PENDING_FILE_0,
  MOCK_PENDING_JOURNAL_ENTRY_0,
  MOCK_TAGIDS_SET_0,
  MOCK_TAG_IDS
} from '../mockConstants';

// USER ARTEFACTS REDUCER
const state = userTagsReducer(undefined, {type: ''});

describe('userTags state ', () => {
  it('should set up default userBlogs state values', () => {
    expect(state).toEqual({
      userTags: [],
      userTagsIds: [],
      taggedItems: {}
      // taggedItemsKeys: []
    });
  });

  const oneTagState = userTagsReducer(undefined, {
    type: UPDATE_ITEM_TAGS,
    tagsIds: [MOCK_TAG_IDS[0]],
    itemId: MOCK_PENDING_JOURNAL_ENTRY_0.id
  });

  it('should add first tag to item', () => {
    expect(oneTagState.taggedItems).toEqual({
      [MOCK_PENDING_JOURNAL_ENTRY_0.id]: new Set([MOCK_TAG_IDS[0]])
    });
  });

  // After adding a teg to item
  const twoTagsState = userTagsReducer(oneTagState, {
    type: UPDATE_ITEM_TAGS,
    tagsIds: [MOCK_TAG_IDS[0], MOCK_TAG_IDS[1]],
    itemId: MOCK_PENDING_JOURNAL_ENTRY_0.id
  });

  it('should add second tag with first tag to item', () => {
    const targetTaggedItems = {
      [MOCK_PENDING_JOURNAL_ENTRY_0.id]: new Set([
        MOCK_TAG_IDS[0],
        MOCK_TAG_IDS[1]
      ])
    };

    expect(twoTagsState.taggedItems).toEqual(targetTaggedItems);
  });

  const threeTagsState = userTagsReducer(twoTagsState, {
    type: UPDATE_ITEM_TAGS,
    tagsIds: MOCK_TAGIDS_SET_0,
    itemId: MOCK_MAHARA_PENDING_FILE_0.id
  });
  it('should add a new tagged item along side other tagged items', () => {
    expect(threeTagsState.taggedItems).toEqual({
      [MOCK_PENDING_JOURNAL_ENTRY_0.id]: new Set([
        MOCK_TAG_IDS[0],
        MOCK_TAG_IDS[1]
      ]),
      [MOCK_MAHARA_PENDING_FILE_0.id]: new Set(MOCK_TAGIDS_SET_0)
    });
  });
});
