export type RequestErrorPayload = {
    code: number;
    message: string;
    previousError?: Error;
};

export type UploadItemType = 'FILE' | 'PHOTO' | 'AUDIO' | 'J_ENTRY';

export type MessageInfoType = 'success' | 'warning' | 'error';

// Mahara file creation and for uploading

export type File = {
    uri: string | null | undefined;
    name: string | null | undefined;
    type: string | null | undefined;
    size: number | null | undefined; // Not used in upload
};

export type MaharaFile = {
    webservice: string;
    wstoken: string;
    foldername: string;
    name: string;
    description: string;
    alttext: string;
    filetoupload: File;
};

export type PendingMFile = {
    id: string;
    url: string; // for files, this url includes tags
    maharaFormData: MaharaFile;
    mimetype: string;
    type: UploadItemType;
};

// Journal entry creation and for uploading

export type JournalEntry = {
    blogid: string;
    wsfunction: string;
    wstoken: string;
    title: string;
    body: string;
    isdraft: boolean;
};

export type PendingJEntry = {
    id: string;
    url: string;
    journalEntry: JournalEntry;
};

export type UserTag = {
    id: number;
    tag: string;
};

export type UserFolder = {
    id: string;
    title: string;
};

export type UserBlog = {
    description: string;
    id: string;
    locked: boolean;
    numBlogPosts: number;
    title: string;
};

export type Tags = Array<UserTag>;
export type Folders = Array<UserFolder>;
export type Blogs = Array<UserBlog>;
export type Username = Array<UserFolder>;

export type User = {
    userName: Username;
    userFolders: Folders;
    userTags: Tags;
    userBlogs: Blogs;
};

export type UserBlogJSON = {
    id: string;
    title: string;
    description: string;
    locked: boolean;
    numblogposts: number;
};

// as stated in LinguiJS docs: https://lingui.js.org/ref/macro.html#usage
// replaced with updated in in library
// export type MessageDescriptor = {
//   id: string;
//   defaults?: string;
//   values?: object;
//   formats?: object;
// };

export type LoginType = 'basic' | 'sso' | 'token';

export type LoginInfo = {
    maharaversion: string;
    wwwroot: string;
    sitename: string;
    wsenabled: boolean;
    wsprotocols: Array<string>;
    mobileapienabled: boolean;
    mobileapiversion: string;
    logintypes: Array<string>;
};

export type UploadResponse = {
    error?: object;
    file?: number;
    error_name: string;
    error_class: string;
    error_message: string;
    error_rendered: string;
};

export type DisplayItems = Array<PendingJEntry | PendingMFile>;

export type PlayBackType = {
    isMuted?: boolean;
    currentPosition: number;
    duration: number;
};

export type RecordBackType = {
    isRecording?: boolean;
    currentPosition: number;
    currentMetering?: number;
};

export type ItemId = string;
export type TagId = number;
export type TagsIds = Array<number>;
export type TaggedItems = Record<ItemId, TagId[]>;
