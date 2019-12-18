import { MaharaPendingFile, PendingJournalEntry, RequestErrorPayload } from '../models/models';
import { UPDATE_SERVER_URL, UPDATE_USERNAME, UPDATE_USER_TAGS, UPDATE_USER_BLOGS, UPDATE_USER_FOLDERS, ADD_TOKEN, ADD_UPLOAD_FILE, ADD_UPLOAD_JOURNAL_ENTRY, REMOVE_UPLOAD_FILE, REMOVE_UPLOAD_JOURNAL_ENTRY } from '../utils/constants';

// action creators - functions that create actions

export function loginTypes(url: string, response: any) {
  const tokenLogin = response.logintypes.includes('manual') ? true : false;
  const localLogin = response.logintypes.includes('basic') ? true : false;
  const ssoLogin = response.logintypes.includes('sso') ? true : false;
  return {
    type: UPDATE_SERVER_URL,
    url: url,
    tokenLogin: tokenLogin,
    localLogin: localLogin,
    ssoLogin: ssoLogin
  }
}

export function addToken(token: string) {
  return { type: ADD_TOKEN, token }
}

export function addFileToUploadList(file: MaharaPendingFile) {
  return { type: ADD_UPLOAD_FILE, file }
}

export function addJournalEntryToUploadList(journalEntry: PendingJournalEntry) {
  return { type: ADD_UPLOAD_JOURNAL_ENTRY, journalEntry }
}

export function updateUserName(json: any) {
  return { type: UPDATE_USERNAME, userName: json.userprofile.myname }
}

export function updateUserTags(json: any) {
  return { type: UPDATE_USER_TAGS, userTags: json.tags.tags }
}

export function updateUserBlogs(json: any) {
  return { type: UPDATE_USER_BLOGS, userBlogs: json.blogs.blogs }
}

export function updateUserFolders(json: any) {
  return { type: UPDATE_USER_FOLDERS, userFolders: json.folders.folders }
}

export function removeUploadFile(id: string) {
  return { type: REMOVE_UPLOAD_FILE, id }
}

export function removeUploadJEntry(id: string) {
  return { type: REMOVE_UPLOAD_JOURNAL_ENTRY, id }
}

export class RequestError extends Error {
  code: number;
  name = 'RequestError';
  previousError: Error | null = null;

  constructor({ code = 400, message = 'Request Error', previousError }: RequestErrorPayload) {
    super(String(message) || 'Request Error');
    this.code = Number(code);
    if (previousError) {
      this.previousError = previousError;
    }
  }

  static createFromError(e: any): RequestError {
    if (e.name === 'RequestError') {
      return e;
    }

    return new RequestError({ code: 500, message: e.message, previousError: e });
  }
}

const getJSON = (url: string) => {
  return requestJSON(url, {
    method: 'GET'
  })
};

// TODO: replace fetch calls with post
const postJSON = (url: string, body: any) => {
  return requestJSON(url, {
    method: 'POST',
    body: body,
  })
};

const requestJSON = async (url: any, config: any) => {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new RequestError({
        code: response.status,
        message: 'Network Error' // TODO: double check
      });
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw RequestError.createFromError(error);
  }
}

export function checkLoginTypes(url: string) {
  const serverUrl = url + 'module/mobileapi/json/info.php';

  return async function (dispatch: any) {
    try {
      // TODO: dispatch loading state for spinner

      const result: any = await getJSON(serverUrl);

      // check that there is a mahara version, and therefore a Mahara instance
      if (!result.maharaversion) {
        throw new Error('This is not a Mahara site');
      }

      // check that webservices is enabled on the Mahara instance
      if (!result.wsenabled) {
        throw new Error('Webservices is not enabled.');
      }

      dispatch(loginTypes(url, result));
    } catch (error) {
      throw error;
    }
  }
}