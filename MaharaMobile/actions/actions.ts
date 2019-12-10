import { JournalEntry, MaharaPendingFile, PendingJournalEntry, MaharaFileFormData, RequestErrorPayload } from '../models/models';

export const ADD_TOKEN = 'ADD_TOKEN';
export const ADD_USER = 'ADD_USER';
export const SERVER_URL = 'SERVER_URL';
export const UPDATE_UPLOAD_LIST = 'UPDATE_UPLOAD_LIST';
export const ADD_FILE_TO_UPLOAD_LIST = 'ADD_FILE_TO_UPLOAD_LIST';
export const ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST = 'ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST';

export function loginTypes(url: string, response: any) {
  const tokenLogin = response.logintypes.includes('manual') ? true : false;
  const localLogin = response.logintypes.includes('basic') ? true : false;
  const ssoLogin = response.logintypes.includes('sso') ? true : false;
  return {
    type: SERVER_URL,
    url: url,
    tokenLogin: tokenLogin,
    localLogin: localLogin,
    ssoLogin: ssoLogin
  }
}

export function addUser(json: any) {
  return {
    type: ADD_USER,
    userName: json.userprofile.myname,
    userTags: json.tags.tags,
    userBlogs: json.blogs.blogs,
    userFolders: json.folders.folders
  }
}

export function addToken(token: string) {
  return { type: ADD_TOKEN, token }
}

export function addFileToUploadList(file: MaharaPendingFile) {
  return { type: ADD_FILE_TO_UPLOAD_LIST, file }
}

export function addJournalEntryToUploadList(journalEntry: PendingJournalEntry) {
  return { type: ADD_JOURNAL_ENTRY_TO_UPLOAD_LIST, journalEntry }
}

export function updateUploadList(uploadList: { files: Array<MaharaPendingFile>, journalEntries: Array<PendingJournalEntry> }) {
  return { type: UPDATE_UPLOAD_LIST, uploadList }
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
    body: body
  })
};

const requestJSON = async (url: any, config: any) => {
  try {
    const response = await fetch(url, config);
    if(!response.ok) {
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
      if(!result.maharaversion) {
        throw new Error('This is not a Mahara site');
      }

      // check that webservices is enabled on the Mahara instance
      if(!result.wsenabled) {
        throw new Error('Webservices is not enabled.');
      }

      dispatch(loginTypes(url, result));
    } catch (error) {
      throw error;
    }
  }
}

export function sendTokenLogin(serverUrl: string, requestOptions: any) {
  return async function (dispatch: any) {
    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      dispatch(addUser(json));
    } catch (error) {
      // errorHandle(error);
    }
  }
}

export function uploadItemToMahara(url: string, item: any) {
  const uploadObject = buildObject(item);
  return async function () {
    try {
      const response = await fetch(url, uploadObject);
      const result = await response.json();
      console.log('Success:', JSON.stringify(result));
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

function buildObject(item: any) {
  if (isJournalEntry(item)) {
    return ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  }
  else if (isMaharaFileFormData(item)) {
    const sendFormData = new FormData();
    sendFormData.append('wsfunction', item.webservice);
    sendFormData.append('wstoken', item.wstoken);
    sendFormData.append('foldername', item.foldername);
    sendFormData.append('title', item.title);
    sendFormData.append('description', item.description);
    sendFormData.append('filetoupload', item.filetoupload);
    return ({
      method: 'POST',
      body: sendFormData
    })
  }
}

function isJournalEntry(x: any): x is JournalEntry {
  return (x as JournalEntry).blogid !== undefined;
}

function isMaharaFileFormData(x: any): x is MaharaFileFormData {
  return (x as MaharaFileFormData).filetoupload !== undefined;
}
