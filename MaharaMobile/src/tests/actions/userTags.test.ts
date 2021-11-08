import {
  updateItemTags,
  addUserTags,
  clearUserTags,
  saveTaggedItemsToAsync,
  updateTaggedItemsFromAsync,
  updateUserTags,
  updateUserTagsIds
} from '../../store/actions/actions';
import {removeUploadJEntry} from '../../store/actions/uploadJEntries';
import {removeUploadFile} from '../../store/actions/uploadFiles';
import {
  ADD_USER_TAGS,
  CLEAR_USER_TAGS,
  REMOVE_UPLOAD_FILE,
  REMOVE_UPLOAD_JOURNAL_ENTRY,
  SAVE_TAGGED_ITEMS_TO_ASYNC,
  UPDATE_ITEM_TAGS,
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
      const tagsIdsArray = new Array<number>(...NUMBERS_ARR);
      const action = updateItemTags(RAND_STRING, tagsIdsArray);
      const target = {
        type: UPDATE_ITEM_TAGS,
        tagsIds: tagsIdsArray,
        itemId: RAND_STRING
      };
      expect(action).toEqual(target);
    });
  });

  describe('removeTagsFromItem', () => {
    it('should remove a tag from an item', () => {
      const tagsIdsArray = new Array<number>(...NUMBERS_ARR);
      tagsIdsArray.pop();
      const action = updateItemTags(RAND_STRING, tagsIdsArray);
      expect(action.tagsIds.length).toEqual(NUMBERS_ARR.length - 1);
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
