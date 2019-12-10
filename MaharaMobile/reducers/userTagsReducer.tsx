import { combineReducers } from 'redux';
import { InitialState, UserTag } from '../models/models';
import { ADD_TOKEN, ADD_USER, UPDATE_UPLOAD_LIST, ADD_FILE_TO_UPLOAD_LIST, ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST } from '../actions/actions';

const initialAppState: InitialState = {
  token: '',
  userName: '',
  userFolders: [],
  userTags: [],
  uploadList: {
    files: [],
    journalEntries: []
  },
  userBlogs: []
};

// Reducer
const updateTag = (state: any, tag: UserTag) => {
  return {
    ...state,
    [tag.id]: tag
  };
}

const removeTag = (state: any, tag: UserTag) => {
  const newState = { ...state };
  delete newState[tag.id];
  return newState;
}

export const userTagsReducer = (state: Record<number, UserTag> = {}, action: any) => {

  switch (action.type) {
    case "Add_Tag":
      return updateTag(state, action.payload);
    case "Update_Tag":
      return updateTag(state, action.payload);
    case "Remove_Tag":
      return removeTag(state, action.payload);
    default:
      return state;
  }
}

const thorReducer = (state: any, action: any) => {
  switch (action.type) {
    case "Add_Tag":
      // do bad things
      console.log(action);
      return state;
    default:
      return state;
  }
}

// Selector
const selectUserTagState = (state: InitialState) => state.domainData.userTags;

const selectUserTagWithTypeB = (state: Record<number, UserTag>) => {
  // CreateSelector

}


const rootReducer = combineReducers({
  domainData: combineReducers({
    userTags: userTagsReducer,
  }),
  appState: combineReducers({
    uploadingFiles: () => [],
    loaindg: () => []
  })
});

type RootState = ReturnType<typeof rootReducer>

// const app = (state = initialAppState, action: any) => {
//   switch (action.type) {
//     case ADD_TOKEN:
//       return {
//         ...state,
//         token: action.token
//       }
//     case ADD_USER:
//       return {
//         ...state,
//         userName: action.userName,
//         userFolders: action.userFolders,
//         userTags: action.userTags,
//         userBlogs: action.userBlogs
//       }
//     case UPDATE_UPLOAD_LIST:
//       return {
//         ...state,
//         uploadList: action.uploadList
//       }
//     case ADD_FILE_TO_UPLOAD_LIST:
//       return {
//         ...state,
//         uploadList: {
//           files: [...state.uploadList.files.concat(action.file)],
//           journalEntries: [...state.uploadList.journalEntries]
//         }
//       }
//     case ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST:
//       return {
//         ...state,
//         uploadList: {
//           files: [...state.uploadList.files],
//           journalEntries: [...state.uploadList.journalEntries.concat(action.journalEntry)]
//         }
//       }
//     default:
//       return state;
//   }
// }

// export default combineReducers({
//   app
// })

// TODO: Remove demo code

