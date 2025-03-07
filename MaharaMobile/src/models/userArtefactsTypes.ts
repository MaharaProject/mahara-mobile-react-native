import { UserBlog, UserFolder } from 'models/models';

export type UserFoldersActions = {
    type: string;
    userFolders: Array<UserFolder>;
};

export type UserBlogsActions = { type: string; userBlogs: Array<UserBlog> };
