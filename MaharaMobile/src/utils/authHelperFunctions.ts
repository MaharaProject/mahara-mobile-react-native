import {t} from '@lingui/macro';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {Dispatch} from 'redux';
import RNFetchBlob from 'rn-fetch-blob';
import {
  clearUserTags,
  updateUserTags,
  updateUserTagsIds
} from '../store/actions/actions';
import {
  clearLoginInfo,
  setDefaultBlogId,
  setDefaultFolder,
  addToken,
  updateGuestStatus,
  updateProfilePic,
  updateUserName
} from '../store/actions/loginInfo';
import {
  clearUserBlogs,
  clearUserFolders,
  updateUserBlogs,
  updateUserFolders
} from '../store/actions/userArtefacts';
import {
  clearUploadJEntires,
  updateJEntriesOnLogin
} from '../store/actions/uploadJEntries';
import {
  clearUploadFiles,
  updateUploadFilesOnLogin
} from '../store/actions/uploadFiles';

import i18n from '../i18n';
import {UserBlog, UserBlogJSON, UserFolder, UserTag} from '../models/models';
import {newUserTag} from '../models/typeCreators';
import {
  GUEST_BLOG,
  GUEST_FOLDER,
  GUEST_TOKEN,
  GUEST_USERNAME
} from './constants';
import {userBlogJSONtoUserBlog} from './helperFunctions';

/**
 * Attempt to fetch user info based on given token

 * @param serverUrl
 * @param requestOptions
 * @returns true if successful log in and data loading
 * @returns Promise.reject() on fail
 */
export function fetchUserOnTokenLogin(
  serverUrl: string,
  requestOptions: RequestInit
) {
  return async function(dispatch: Dispatch) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      if (json.error) {
        return Promise.reject();
      }
      dispatch(updateUserName(json.userprofile.myname));

      type FetchedTag = {
        tag: string;
        usage: number;
      };

      // Create UserTags with id and string.
      const newUserTags: Array<UserTag> = json.tags.tags.map(
        (tag: FetchedTag) => newUserTag(tag.tag)
      );
      dispatch(updateUserTags(newUserTags));
      dispatch(updateUserTagsIds(newUserTags.map((tag: UserTag) => tag.id)));

      dispatch(
        updateUserBlogs(
          json.blogs.blogs.map((b: UserBlogJSON) => userBlogJSONtoUserBlog(b))
        )
      );

      // Check if user has folders (they can be deleted on Mahara)
      if (json.folders.folders.length !== 0) {
        dispatch(updateUserFolders(json.folders.folders));
      }

      dispatch(setDefaultBlogId(json.blogs.blogs[0].id));
      dispatch(setDefaultFolder(json.folders.folders[0].title));
    } catch (e) {
      //
    }
    return null;
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

export const fetchProfilePic = async (
  dispatch: Dispatch,
  token: string,
  url: string
) => {
  const api = 'module_mobileapi_get_user_profileicon&height=100&width=100';
  const wstoken = token;
  const serverUrl = `${url}module/mobileapi/download.php?wsfunction=${api}&wstoken=${wstoken}`;

  let profilePic = '';

  RNFetchBlob.config({
    fileCache: true
  })
    .fetch('GET', serverUrl)
    .then(res => {
      profilePic = `file://${res.path()}`;
      dispatch(updateProfilePic(profilePic));
    })
    .catch(() => {
      // TODO error handling
    });

  return profilePic;
};

export const signOutAsync = async (navigation, dispatch) => {
  Alert.alert(
    i18n._(t`Are you sure?`),
    i18n._(
      t`Items in the upload queue will not be retrievable once logged out.`
    ),

    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: async () => {
          // navigation.navigate('SiteCheck');
          await AsyncStorage.clear();
          clearReduxData(dispatch);
        }
      }
    ],
    {cancelable: false}
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
export const checkValidInitialState = (
  blogs: UserBlog[],
  folders: UserFolder[]
): boolean => {
  if (blogs.length === 0 || folders.length === 0) {
    return false;
  }
  return true;
};
