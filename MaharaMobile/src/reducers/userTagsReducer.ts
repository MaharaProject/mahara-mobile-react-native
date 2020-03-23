import AsyncStorage from '@react-native-community/async-storage';
import {UserTag} from '../models/models';
import {
  ADD_USER_TAGS,
  CLEAR_USER_TAGS,
  REMOVE_USER_TAG,
  SAVE_TAGGED_ITEMS_TO_ASYNC,
  TAGGED_ITEMS,
  TAGGED_ITEMS_IDS,
  TAGS_IDS,
  TAG_ITEM,
  UPDATE_TAGGED_ITEMS,
  UPDATE_TAGS_IDS,
  UPDATE_USER_TAGS,
  USER_TAGS
} from '../utils/constants';
import {RootState} from './rootReducer';

/**
 * taggedItems: PendingJournalEntry.id | MaharaPendingFile(s).id -> set of tag ids
 */
export type UserTagInfoState = {
  userTags: Array<UserTag>;
  userTagsIds: Array<number>;
  taggedItems: Record<string, Set<number>>;
  taggedItemsIds: Array<string>;
};

const initialState: UserTagInfoState = {
  userTags: [],
  userTagsIds: [],
  taggedItems: {},
  taggedItemsIds: []
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
  AsyncStorage.setItem(USER_TAGS, JSON.stringify(state.userTags.concat(tags)));
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
 * in the taggiedItems object in state. Once updated, sets the 'taggedItems' in AyncStorage
 * @param state RootState
 * @param tagIds Set of tag ids to add to item
 * @param itemId The item id for tags to be added to
 */
const tagItem = (
  state: UserTagInfoState,
  tagIds: Set<number>,
  itemId: string
): UserTagInfoState => {
  let itemTags = state.taggedItems[itemId];

  // Updated taggedItems
  if (!itemTags) {
    itemTags = new Set();
  }
  const updatedItemTags = new Set([...itemTags, ...tagIds]);
  const updatedTaggedItems = {
    ...state.taggedItems,
    [itemId]: updatedItemTags
  };

  // Update taggedItemIds
  const updatedTaggedItemsIdsSet = new Set(state.taggedItemsIds);
  updatedTaggedItemsIdsSet.add(itemId);

  const newState: UserTagInfoState = {
    ...state,
    taggedItems: updatedTaggedItems,
    taggedItemsIds: Array.from(updatedTaggedItemsIdsSet)
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
    JSON.stringify(Array.from(state.taggedItemsIds))
  );

  let asyncObject = {};
  state.taggedItemsIds.forEach((id: string) => {
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
  const updatedTaggedItemIds = Object.keys(asyncTaggedItemsData);
  const updatedTaggeditems: Record<string, Set<number>> = {};
  updatedTaggedItemIds.forEach((itemId: string) => {
    updatedTaggeditems[itemId] = new Set(asyncTaggedItemsData[itemId]);
  });

  return {
    ...state,
    taggedItemsIds: updatedTaggedItemIds,
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
    case TAG_ITEM:
      return tagItem(state, action.tagIds, action.itemId);
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
export const selectUserTags = (state: RootState): Array<UserTag> =>
  state.domainData.userTagsInfo.userTags;
export const selectItemTagsStrings = (
  state: RootState,
  itemId: string
): Array<string> => {
  // Check itemId exists
  if (!state.domainData.userTagsInfo.taggedItemsIds.includes(itemId)) {
    return [];
  }
  // Check if there are tags attached to matched item
  const tagIds = Array.from(state.domainData.userTagsInfo.taggedItems[itemId]);
  if (tagIds.length === 0) {
    return [];
  }
  const tagsArr = [];

  tagIds.forEach((id: number) =>
    state.domainData.userTagsInfo.userTags.forEach((tag: UserTag) => {
      if (tag.id === id) tagsArr.push(tag.tag);
    })
  );

  return tagsArr;
};
