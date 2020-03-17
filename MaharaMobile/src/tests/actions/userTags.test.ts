import {
  addTagsToItem,
  addUserTags,
  clearUserTags,
  removeUploadFile,
  removeUploadJEntry,
  saveTaggedItemsToAsync,
  updateTaggedItemsFromAsync,
  updateUserTags,
  updateUserTagsIds
} from '../../actions/actions';
import {
  ADD_USER_TAGS,
  CLEAR_USER_TAGS,
  REMOVE_UPLOAD_FILE,
  REMOVE_UPLOAD_JOURNAL_ENTRY,
  SAVE_TAGGED_ITEMS_TO_ASYNC,
  TAG_ITEM,
  UPDATE_TAGGED_ITEMS,
  UPDATE_TAGS_IDS,
  UPDATE_USER_TAGS
} from '../../utils/constants';
import {NUMBERS_ARR, RAND_STRING, MOCK_TAGS} from '../mockConstants';

// USER TAGS REDUCER ACTION CREATORS
describe('UserTags reducer action creators', () => {
  describe('removeUploadJEntry', () => {
    it('should set up remove upload journal entry', () => {
      const action = removeUploadJEntry(RAND_STRING);
      expect(action).toEqual({
        type: REMOVE_UPLOAD_JOURNAL_ENTRY,
        id: RAND_STRING
      });
    });
  });

  describe('removeUploadFile', () => {
    it('should set up remove upload file', () => {
      const action = removeUploadFile(RAND_STRING);
      expect(action).toEqual({
        type: REMOVE_UPLOAD_FILE,
        id: RAND_STRING
      });
    });
  });

  describe('addUserTags', () => {
    it('should set up add user tags', () => {
      const action = addUserTags(MOCK_TAGS);
      expect(action).toEqual({
        type: ADD_USER_TAGS,
        userTags: MOCK_TAGS
      });
    });
  });

  describe('updateUserTags', () => {
    it('should set up update user tags', () => {
      const action = updateUserTags(MOCK_TAGS);
      expect(action).toEqual({type: UPDATE_USER_TAGS, userTags: MOCK_TAGS});
    });
  });

  describe('updateUserTagsIds', () => {
    it('should set up update user tags ids', () => {
      const action = updateUserTagsIds(NUMBERS_ARR);
      expect(action).toEqual({type: UPDATE_TAGS_IDS, userTagsIds: NUMBERS_ARR});
    });
  });

  describe('addTagsToItem', () => {
    it('should set up add tags to item', () => {
      const tagsIdsSet = new Set<number>(NUMBERS_ARR);
      const action = addTagsToItem(RAND_STRING, tagsIdsSet);
      expect(action).toEqual({
        type: TAG_ITEM,
        tagIds: tagsIdsSet,
        itemId: RAND_STRING
      });
    });
  });

  describe('saveTaggedItemsToAsync', () => {
    it('should set up save tagged items to async', () => {
      const action = saveTaggedItemsToAsync();
      expect(action).toEqual({type: SAVE_TAGGED_ITEMS_TO_ASYNC});
    });
  });

  describe('updateTaggedItemsFromAsync', () => {
    it('should set up update tagged items from async', () => {
      const action = updateTaggedItemsFromAsync(RAND_STRING);
      expect(action).toEqual({
        type: UPDATE_TAGGED_ITEMS,
        taggedItems: RAND_STRING
      });
    });
  });

  describe('clearUserTags', () => {
    it('should set up clear user tags', () => {
      const action = clearUserTags();
      expect(action).toEqual({type: CLEAR_USER_TAGS});
    });
  });
});
