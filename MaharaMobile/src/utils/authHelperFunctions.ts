import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { Dispatch } from 'redux';
import RNFetchBlob from 'rn-fetch-blob';
import { addFileToUploadList, addJournalEntryToUploadList, addToken, clearLoginInfo, clearUploadFiles, clearUploadJEntires, clearUserBlogs, clearUserFolders, clearUserTags, setDefaultBlogId, setDefaultFolder, updateGuestStatus, updateJEntriesOnLogin, updateProfilePic, updateUploadFilesOnLogin, updateUserBlogs, updateUserFolders, updateUserName, updateUserTags } from '../actions/actions';
import { MaharaPendingFile, PendingJournalEntry, UserBlog, UserBlogJSON, UserFolder } from '../models/models';
import { GUEST_BLOG, GUEST_FOLDER } from './constants';
import { userBlogJSONtoUserBlog } from './helperFunctions';

export function fetchUserOnTokenLogin(serverUrl: string, requestOptions: any) {
  return async function(dispatch: Dispatch) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      if (json.error) {
        return Promise.reject();
      }
      dispatch(updateUserName(json.userprofile.myname));
      dispatch(updateUserTags(json.tags.tags));

      dispatch(
        updateUserBlogs(
          json.blogs.blogs.map((b: UserBlogJSON) => userBlogJSONtoUserBlog(b))
        )
      );
      dispatch(updateUserFolders(json.folders.folders));
      dispatch(setDefaultBlogId(json.blogs.blogs[0].id));
      dispatch(setDefaultFolder(json.folders.folders[0].title));
    } catch (error) {
      console.log(error);
    }
  };
}

export const clearReduxData = async (dispatch: Dispatch) => {
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

const parseJSON = (jsonString: string) => JSON.parse(jsonString);

export const setUpGuest = async (dispatch: Dispatch) => {
  await dispatch(addToken('guest'));
  await dispatch(updateUserName('guest'));
  await dispatch(updateUserFolders([GUEST_FOLDER]));
  await dispatch(updateUserBlogs([GUEST_BLOG]));
  await dispatch(setDefaultBlogId(GUEST_BLOG.id));
  await dispatch(setDefaultFolder(GUEST_FOLDER.title));
  await AsyncStorage.getItem('uploadFiles').then(async (result: any) => {
    if (result) {
      const uploadFilesList = parseJSON(result);
      uploadFilesList.forEach((uploadFile: MaharaPendingFile) => dispatch(addFileToUploadList(uploadFile)));
    }
  });

  await AsyncStorage.getItem('uploadJEntries').then(async (result: any) => {
    if (result) {
      const uploadJEntries = parseJSON(result);
      uploadJEntries.forEach((jEntry: PendingJournalEntry) => dispatch(addJournalEntryToUploadList(jEntry)));
    }
  });
  await dispatch(updateGuestStatus(true));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  dispatch: Dispatch,
  userBlogs: Array<UserBlog>,
  userFolders: Array<UserFolder>,
  token: string,
  urlDomain: string
) => {
  await dispatch(updateJEntriesOnLogin(token, urlDomain, userBlogs));
  await dispatch(updateUploadFilesOnLogin(token, urlDomain, userFolders));
};

export const fetchProfilePic = async (dispatch: Dispatch, token: string, url: string) => {
  const api = 'module_mobileapi_get_user_profileicon&height=100&width=100';
  const wstoken = token;
  const serverUrl = `${url}module/mobileapi/download.php?wsfunction=${api}&wstoken=${wstoken}`;

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

export const signOutAsync = async (navigation, dispatch) => {
  Alert.alert(
    'Are you sure?',
    'Items in upload queue will not be retrievable once logged out.',
    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.clear();
          clearReduxData(dispatch);
          navigation.navigate('SiteCheck');
        }
      }
    ],
    { cancelable: false }
  );
};
