import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ItemId,
  TaggedItemKeys,
  TaggedItems,
  TagsIds,
  UserTag
} from '../../models/models';
import {
  ADD_USER_TAGS,
  CLEAR_USER_TAGS,
  REMOVE_USER_TAG,
  SAVE_TAGGED_ITEMS_TO_ASYNC,
  TAGGED_ITEMS,
  TAGGED_ITEMS_IDS,
  TAGS_IDS,
  UPDATE_ITEM_TAGS,
  UPDATE_TAGGED_ITEMS,
  UPDATE_TAGS_IDS,
  UPDATE_USER_TAGS,
  USER_TAGS
} from '../../utils/constants';
import {RootState} from './rootReducer';

/**
 * taggedItems: PendingJournalEntry.id | MaharaPendingFile(s).id -> set of tag ids
 */
export type UserTagInfoState = {
  userTags: Array<UserTag>;
  userTagsIds: TagsIds;
  taggedItems: TaggedItems;
  taggedItemsKeys: TaggedItemKeys;
};

const initialState: UserTagInfoState = {
  userTags: [],
  userTagsIds: [],
  taggedItems: {},
  taggedItemsKeys: []
};

// Helper functions

/**
 * Add UserTag to userTags and userTagsIds array and save to AsyncStorage
 * @param state RootState
 * @param tags Array of UserTag instances
 */
const addTags = (
  state: UserTagInfoState,
  tags: Array<UserTag>
): UserTagInfoState => {
  const updatedTags = new Set([...state.userTags]);

  tags.forEach((t) => {
    updatedTags.add(t);
  });

  AsyncStorage.setItem(USER_TAGS, JSON.stringify(Array.from(updatedTags)));
  AsyncStorage.setItem(
    TAGS_IDS,
    JSON.stringify([...state.userTagsIds, ...tags.map((t: UserTag) => t.id)])
  );

  return {
    ...state,
    userTags: state.userTags.concat(tags),
    userTagsIds: state.userTagsIds.concat(tags.map((t: UserTag) => t.id))
  };
};

// TODO: is not used yet
const removeTag = (state: UserTagInfoState, tag: UserTag) => {
  const newState = {...state};
  delete newState.userTags[tag.id];
  newState.userTagsIds.splice(
    newState.userTagsIds.findIndex((id: number) => id === tag.id),
    1
  );
  AsyncStorage.setItem(USER_TAGS, JSON.stringify(newState.userTagsIds));
  return newState;
};

/**
 * Updates/Create the entries (if there are no tags) in the set for the given itemId
 * in the taggiedItems object in state. Once updated, sets the 'taggedItems' in AsyncStorage
 *
 * Overrides the set with new tagIds
 * @param state RootState
 * @param tagsIds Array of tags ids to add to item
 * @param itemId The item id for tags to be added to
 */
const updateItemTags = (
  state: UserTagInfoState,
  tagsIds: TagsIds,
  itemId: ItemId
): UserTagInfoState => {
  // Update tags for this item
  let updatedTaggedItems: TaggedItems = {};
  const updatedTaggedItemsKeysSet = new Set<ItemId>(state.taggedItemsKeys);

  // Remove all tags from this item and reference
  if (tagsIds.length === 0) {
    updatedTaggedItems[itemId] = new Set();
    updatedTaggedItemsKeysSet.delete(itemId);
  } else {
    // Overriding the tags of an item with new updated ones
    updatedTaggedItems = {
      ...state.taggedItems,
      [itemId]: new Set(tagsIds)
    };
    updatedTaggedItemsKeysSet.add(itemId);
  }

  const newState: UserTagInfoState = {
    ...state,
    taggedItems: updatedTaggedItems,
    taggedItemsKeys: Array.from(updatedTaggedItemsKeysSet)
  };
  return newState;
};

/**
 * Convert taggedItems which are of type Record<string, Set<number>>
 * to type Record<string, Array<number>> so that we can JSON.stringify
 * it and save to AsyncStorage.
 */
const saveTaggedItemsToAsync = (state: UserTagInfoState) => {
  AsyncStorage.setItem(
    TAGGED_ITEMS_IDS,
    JSON.stringify(Array.from(state.taggedItemsKeys))
  );

  let asyncObject = {};
  state.taggedItemsKeys.forEach((id: string) => {
    const tagIdSet = state.taggedItems[id];
    const tagIdArr = Array.from(tagIdSet);
    asyncObject = {...asyncObject, [id]: tagIdArr};
  });

  AsyncStorage.setItem(TAGGED_ITEMS, JSON.stringify(asyncObject));
};

/**
 * Items saved in AsyncStorage are of type Record<string, Array<number>>
 * - We need to convert it back to type Record<string, Set<number>>
 * @param asyncTaggedItemsData parsed object from AuthLoadingScreen
 */
const updateTaggedItemsFromAsync = (
  state: UserTagInfoState,
  asyncTaggedItemsData: Record<number, Array<string>>
): UserTagInfoState => {
  const updatedTaggedItemIds: TaggedItemKeys =
    Object.keys(asyncTaggedItemsData);
  const updatedTaggeditems: TaggedItems = {};
  updatedTaggedItemIds.forEach((itemId: ItemId) => {
    updatedTaggeditems[itemId] = new Set(asyncTaggedItemsData[itemId]);
  });

  return {
    ...state,
    taggedItemsKeys: updatedTaggedItemIds,
    taggedItems: updatedTaggeditems
  };
};
// REDUCER
export const userTagsReducer = (
  state = initialState,
  action
): UserTagInfoState => {
  switch (action.type) {
    case ADD_USER_TAGS:
      return addTags(state, action.userTags);
    case REMOVE_USER_TAG:
      return removeTag(state, action.userTag);
    case UPDATE_USER_TAGS:
      return {...state, userTags: state.userTags.concat(action.userTags)};
    case UPDATE_TAGS_IDS:
      return {
        ...state,
        userTagsIds: state.userTagsIds.concat(action.userTagsIds)
      };
    case CLEAR_USER_TAGS:
      return initialState;
    case UPDATE_ITEM_TAGS:
      return updateItemTags(state, action.tagsIds, action.itemId);
    case UPDATE_TAGGED_ITEMS:
      return updateTaggedItemsFromAsync(state, action.taggedItems);
    case SAVE_TAGGED_ITEMS_TO_ASYNC:
      saveTaggedItemsToAsync(state);
      return state;
    default:
      return state;
  }
};

// Selector
export const getUserTags = (state: RootState): Array<UserTag> =>
  state.domainData.userTagsInfo.userTags;

export const getItemTags = (
  state: RootState,
  itemId: string
): Array<UserTag> => {
  // Check itemId exists
  if (!state.domainData.userTagsInfo.taggedItemsKeys.includes(itemId)) {
    return [];
  }
  // Check if there are tags attached to matched item
  const tagIds = Array.from(state.domainData.userTagsInfo.taggedItems[itemId]);
  if (tagIds.length === 0) {
    return [];
  }
  const tagsArr: Array<UserTag> = [];

  tagIds.forEach((id: number) =>
    state.domainData.userTagsInfo.userTags.forEach((tag: UserTag) => {
      if (tag.id === id) tagsArr.push(tag);
    })
  );

  return tagsArr;
};
export const getItemTagsIds = (
  state: RootState,
  itemId: string
): Array<number> => {
  // Check itemId exists
  if (!state.domainData.userTagsInfo.taggedItemsKeys.includes(itemId)) {
    return [];
  }
  // Check if there are tags attached to matched item
  const tagIds = Array.from(state.domainData.userTagsInfo.taggedItems[itemId]);
  if (tagIds.length === 0) {
    return [];
  }
  const tagsIdsArr: Array<number> = [];

  tagIds.forEach((id: number) =>
    state.domainData.userTagsInfo.userTags.forEach((tag: UserTag) => {
      if (tag.id === id) tagsIdsArr.push(tag.id);
    })
  );

  return tagsIdsArr;
};

export const getItemTagsStrings = (
  state: RootState,
  itemId: string
): Array<string> => {
  // check if this item is in the list of tagged items
  if (!state.domainData.userTagsInfo.taggedItemsKeys.includes(itemId)) {
    return [];
  }
  // Check if there are tags attached to matched item
  const tagIds = Array.from(state.domainData.userTagsInfo.taggedItems[itemId]);
  const tagsArr: Array<string> = [];

  tagIds.forEach((id: number) =>
    state.domainData.userTagsInfo.userTags.forEach((tag: UserTag) => {
      if (tag.id === id) tagsArr.push(tag.tag);
    })
  );

  return tagsArr;
};
