import { t } from '@lingui/macro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';
import { LoginInfo, UserBlog, UserFolder } from 'models/models';
import RequestError from 'utils/RequestError';
import {
  CLEAR_USER_BLOGS,
  CLEAR_USER_FOLDERS,
  UPDATE_USER_BLOGS,
  UPDATE_USER_FOLDERS
} from 'utils/constants';
import { updateLoginTypes } from './actions';
import { updateUrl } from './loginInfo';

export function updateUserBlogs(blogs: Array<UserBlog>) {
  AsyncStorage.setItem('userBlogs', JSON.stringify(blogs));
  return { type: UPDATE_USER_BLOGS, userBlogs: blogs };
}

export function clearUserFolders() {
  AsyncStorage.removeItem('userFolders');
  return { type: CLEAR_USER_FOLDERS };
}

export function updateUserFolders(folders: Array<UserFolder>) {
  AsyncStorage.setItem('userFolders', JSON.stringify(folders));
  return { type: UPDATE_USER_FOLDERS, userFolders: folders };
}

export function clearUserBlogs() {
  AsyncStorage.removeItem('userBlogs');
  return { type: CLEAR_USER_BLOGS };
}
const requestJSON = async (url: string, config: object, error?: string) => {
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new RequestError({
        code: response.status,
        message: error
      });
    }
    const json = await response.json();
    return json;
  } catch (e) {
    throw RequestError.createRequestError(e);
  }
};
const getJSON = (url: string, error?: string) => requestJSON(url, { method: 'GET' }, error);

export function checkLoginTypes(url: string) {
  const serverUrl = `${url}module/mobileapi/json/info.php`;

  // eslint-disable-next-line func-names
  return async function (dispatch: Dispatch) {
    try {
      const result: LoginInfo = await getJSON(serverUrl);

      // TODO: (t`Network Error. Please check internet connection.`)
      // check that there is a mahara version, and therefore a Mahara instance
      if (!result.maharaversion) {
        throw new Error(t`This is not a Mahara site. Please re-enter URL.`);
      }
      // check that webservices is enabled on the Mahara instance
      if (!result.wsenabled) {
        throw new Error(
          t`Web services are not enabled on the Mahara site. Please contact the administrator of your site to have them enabled.`
        );
      }
      dispatch(updateLoginTypes(result));
      dispatch(updateUrl(url));
      return true; // for success to turn loading spinner off
    } catch (error) {
      if (error.code >= 400 && error.code < 600) {
        throw new Error(t`Invalid Mahara site. Please re-enter URL.`);
      }

      throw error;
    }
  };
}
