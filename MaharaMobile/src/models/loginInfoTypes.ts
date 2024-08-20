export type LoginInfoActions = {
    type: string;
    url: string;
    token: string;
    userName: string;
    localLogin: boolean;
    ssoLogin: boolean;
    tokenLogin: boolean;
    profileIcon: string;
    isGuest: boolean;
    blogId: number;
    folderTitle: string;
};
