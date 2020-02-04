import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {
  UserBlog,
  UserFolder,
  MaharaPendingFile,
  PendingJournalEntry
} from '../models/models';
import {
  clearLoginInfo,
  clearUploadFiles,
  clearUploadJEntires,
  clearUserFolders,
  clearUserTags,
  clearUserBlogs,
  addToken,
  updateUserName,
  updateUserFolders,
  updateUserBlogs,
  updateJEntriesOnLogin,
  updateUploadFilesOnLogin,
  updateUserTags,
  updateGuestStatus,
  addJournalEntryToUploadList,
  addFileToUploadList,
  updateProfilePic
} from '../actions/actions';

export function fetchUserOnTokenLogin(serverUrl: string, requestOptions: any) {
  return async function(dispatch: any) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      if (json.error) {
        return Promise.reject();
      }
      dispatch(updateUserName(json.userprofile.myname));
      dispatch(updateUserTags(json.tags.tags));
      dispatch(updateUserBlogs(json.blogs.blogs));
      dispatch(updateUserFolders(json.folders.folders));
    } catch (error) {
      console.log(error);
    }
  };
}

export const clearReduxData = async (dispatch: any) => {
  try {
    dispatch(clearLoginInfo());
    dispatch(clearUploadFiles());
    dispatch(clearUploadJEntires());
    dispatch(clearUserBlogs());
    dispatch(clearUserFolders());
    dispatch(clearUserTags());
  } catch (error) {
    console.log('clearReduxData$', error);
  }
};

export const setUpGuest = async (dispatch: any) => {
  await dispatch(addToken('guest'));
  await dispatch(updateUserName('guest'));
  await dispatch(updateUserFolders([{id: -1, title: 'images'}]));
  await dispatch(
    updateUserBlogs([
      {
        id: -1,
        title: 'Guest Blog',
        description: null,
        locked: false,
        numblogposts: -1
      }
    ])
  );
  await AsyncStorage.getItem('uploadFiles').then(async (result: any) => {
    if (result) {
      const uploadFilesList = parseJSON(result);
      uploadFilesList.forEach((uploadFile: MaharaPendingFile) =>
        dispatch(addFileToUploadList(uploadFile))
      );
    }
  });

  await AsyncStorage.getItem('uploadJEntries').then(async (result: any) => {
    if (result) {
      const uploadJEntries = parseJSON(result);
      uploadJEntries.forEach((jEntry: PendingJournalEntry) =>
        dispatch(addJournalEntryToUploadList(jEntry))
      );
    }
  });
  await dispatch(updateGuestStatus(true));
};

const parseJSON = (jsonString: string) => JSON.parse(jsonString);

export const arrayToObject = (array: Array<any>) => {
  const arrayCopy = [...array];
  return arrayCopy.reduce((obj, item) => {
    const objCopy = {...obj};
    objCopy[item.id] = item;
    return objCopy;
  }, {});
};

/**
 * Updates default guest data to user info once logged in.
 * - Tokens, blogs, folders as well as their respective ids need to be updated
 * - Existing pending uploadFiles and uploadJEntries once users login
 * - Rerieved Mahara data to replace guest data be able to upload items.
 */
export const updatePendingItemsOnLogin = async (
  dispatch: any,
  userBlogs: Array<UserBlog>,
  userFolders: Array<UserFolder>,
  token: string,
  urlDomain: string
) => {
  await dispatch(updateJEntriesOnLogin(token, urlDomain, userBlogs));
  await dispatch(updateUploadFilesOnLogin(token, urlDomain, userFolders));
};

export const fetchProfilePic = async (dispatch: any, token: string, url: string) => {
  const api = 'module_mobileapi_get_user_profileicon&height=100&width=100';
  const wstoken = token;
  const serverUrl = url + `module/mobileapi/download.php?wsfunction=${api}&wstoken=${wstoken}`;

  let profilePic = '';

  RNFetchBlob.config({
    fileCache: true
  })
    .fetch('GET', serverUrl)
    .then((res) => {
      profilePic = `file://${res.path()}`;
      dispatch(updateProfilePic(profilePic));
    })
    .catch((error) => {
      // error handling
      console.log(error);
    });

  return profilePic;
};
