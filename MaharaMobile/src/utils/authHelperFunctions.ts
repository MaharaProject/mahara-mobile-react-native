import { t } from '@lingui/macro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Dispatch } from 'redux';
import RNFetchBlob from 'rn-fetch-blob';
import flashMessage from 'components/FlashMessage/FlashMessage';
import { UserBlog, UserBlogJSON, UserFolder, UserTag } from 'models/models';
import { newUserTag } from 'models/typeCreators';
import { clearUserTags, updateUserTags, updateUserTagsIds } from 'store/actions/actions';
import {
  addToken,
  clearLoginInfo,
  setDefaultBlogId,
  setDefaultFolder,
  updateGuestStatus,
  updateProfilePic,
  updateUserName
} from 'store/actions/loginInfo';
import { clearUploadFiles, updateUploadFilesOnLogin } from 'store/actions/uploadFiles';
import { clearUploadJEntires, updateJEntriesOnLogin } from 'store/actions/uploadJEntries';
import {
  clearUserBlogs,
  clearUserFolders,
  updateUserBlogs,
  updateUserFolders
} from 'store/actions/userArtefacts';
import { GUEST_BLOG, GUEST_FOLDER, GUEST_TOKEN, GUEST_USERNAME } from './constants';
import { userBlogJSONtoUserBlog } from './helperFunctions';

/**
 * Attempt to fetch user info based on given token

 * @param serverUrl
 * @param requestOptions
 * @returns true if successful log in and data loading
 * @returns Promise.reject() on fail
 */
export async function fetchUserWithToken(serverUrl: string, requestOptions: RequestInit) {
  const response = await fetch(serverUrl, requestOptions);
  const json = await response.json().catch((e) => {
    console.warn(
      `Expected ERROR:  because we have been auto logged out and cannot retrieve any data${e}`
    );
  });
  if (json != null) {
    // if json.error is true, meaning failed to log in, we don't reject the promise
    // and instead use the information inside i.e. the Mahara error message inside
    // onCheckAuthJSON() to decide on next the next action
    return Promise.resolve(json);
  }
  return null;
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
    // console.log('clearReduxData$', error);
  }
};

export const setUpGuest = async (dispatch: Dispatch) => {
  dispatch(updateGuestStatus(true));
  dispatch(addToken(GUEST_TOKEN));
  dispatch(updateUserName(GUEST_USERNAME));
  dispatch(updateUserFolders([GUEST_FOLDER]));
  dispatch(updateUserBlogs([GUEST_BLOG]));
  dispatch(setDefaultBlogId(GUEST_BLOG.id));
  dispatch(setDefaultFolder(GUEST_FOLDER.title));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayToObject = (array: Array<any>) => {
  const arrayCopy = [...array];
  return arrayCopy.reduce((obj, item) => {
    const objCopy = { ...obj };
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
export const updatePendingItemsOnGuestToUser = async (
  dispatch: Dispatch,
  userBlogs: Array<UserBlog>,
  userFolders: Array<UserFolder>,
  token: string,
  urlDomain: string
) => {
  dispatch(updateJEntriesOnLogin(token, urlDomain, userBlogs));
  dispatch(updateUploadFilesOnLogin(token, urlDomain, userFolders));
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
    .catch((e) => {
      console.error(e.error_message);
      flashMessage(e.error_class, 'warning');
    });

  return profilePic;
};

export const signOutAsync = async (dispatch: Dispatch) => {
  Alert.alert(
    t`Are you sure?`,
    t`Items in the upload queue will not be retrievable once logged out.`,
    [
      {
        text: t`Cancel`,
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: t`Logout`,
        onPress: async () => {
          await AsyncStorage.clear();
          clearReduxData(dispatch);
        }
      }
    ],
    { cancelable: false }
  );
};

/**
 * Check that the state is valid before entering the application:
 * - minimum of one user blog
 * - minimum of one user folder
 *
 * Reasons that the authentication would bypass could be
 * - something odd in a site upgrade
 * - users missing a folder or blog will cause issues
 */
export const checkValidInitialState = (blogs: UserBlog[], folders: UserFolder[]): boolean => {
  if (blogs.length === 0 || folders.length === 0) {
    return false;
  }
  return true;
};

/**
 *
 * @param json JSON returned from Mahara API
 * @param successCallback e.g. props.onGetToken(json.token);
 * @param failCallback e.g. props.onGetToken(null);
 */
export const onCheckAuthJSON = (
  json: any,
  successCallback: () => void,
  failCallback: () => void
) => {
  if (json) {
    if (json.error) {
      console.warn('Failed to log in: ', json.error);
      failCallback();
    }
    if (json.token != null) {
      console.warn('success! token received: ', json.token);
      successCallback();
    }
  }
};

export const login = (
  url,
  dispatch,
  userBlogs,
  userFolders,
  token,
  setLoading,
  updateToken,
  isGuest
) => {
  const serverUrl = `${url}webservice/rest/server.php?alt=json`;

  const body = {
    blogs: {},
    folders: {},
    tags: {},
    userprofile: {},
    userprofileicon: {},
    wsfunction: 'module_mobileapi_sync',
    wstoken: token
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  /**
   * Convert pending items after a guest has logged into Mahara
   */
  const onGuestToUser = async () => {
    dispatch(updateGuestStatus(false));
    updatePendingItemsOnGuestToUser(dispatch, userBlogs, userFolders, token, url);
    console.log('updatedGuestDetailsToProvidedUser');
  };

  let userData: any = null;
  setLoading(true);
  fetchUserWithToken(serverUrl, requestOptions)
    .then((json) => {
      console.log(json.token);
      onCheckAuthJSON(
        json,
        () => updateToken(json.token),
        () => {
          updateToken(null);
          setLoading(false);
        }
      );
      userData = json;
      if (isGuest) {
        onGuestToUser();
      }
    })
    .catch((e) => {
      // We expect the error when use has been logged out, but dispatch continues because
      // if we catch too early, not all the items won't dispatch ^
      console.warn(`Error on fetchUserTokenLogin :) ${e}`);
      // other failures e.g. failed to login are not caught because we want to use the
      // information at onCheckAuthJSON()
    })
    .finally(() => {
      //   // failed to log in
      //   if (!userData.userprofile) {
      //     return;
      //   }
      dispatch(addToken(token));
      dispatch(updateUserName(userData.userprofile.myname));
      type FetchedTag = {
        tag: string;
        usage: number;
      };
      // Create UserTags with id and string.
      const newUserTags: Array<UserTag> = userData.tags.tags.map((tag: FetchedTag) =>
        newUserTag(tag.tag)
      );
      dispatch(updateUserTags(newUserTags));
      dispatch(updateUserTagsIds(newUserTags.map((tag: UserTag) => tag.id)));
      dispatch(
        updateUserBlogs(userData.blogs.blogs.map((b: UserBlogJSON) => userBlogJSONtoUserBlog(b)))
      );
      // Check if user has folders (they can be deleted on Mahara)
      if (userData.folders.folders.length !== 0) {
        dispatch(updateUserFolders(userData.folders.folders));
      }
      dispatch(setDefaultBlogId(userData.blogs.blogs[0].id));
      dispatch(setDefaultFolder(userData.folders.folders[0].title));
      // checkValidInitialState(props.userBlogs, props.userFolders)
    });
};
