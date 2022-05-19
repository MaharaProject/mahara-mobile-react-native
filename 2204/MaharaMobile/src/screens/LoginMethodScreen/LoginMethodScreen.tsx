import {I18n} from '@lingui/core';
// // import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  addToken,
  setDefaultBlogId,
  setDefaultFolder,
  updateGuestStatus,
  updateUserName
} from '../../store/actions/loginInfo';
import generic from '../../assets/styles/generic';
import LocalLogin from '../../components/LocalLogin/LocalLogin';
import SSOLogin from '../../components/SSOLogin/SSOLogin';
import TokenInput from '../../components/TokenInput/TokenInput';
import {
  LoginType,
  UserBlog,
  UserBlogJSON,
  UserFolder,
  UserTag
} from '../../models/models';
import {
  selectIsGuestStatus,
  selectLocalLogin,
  selectSsoLogin,
  selectTokenLogin,
  selectUrl
} from '../../store/reducers/loginInfoReducer';
import {RootState} from '../../store/reducers/rootReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../store/reducers/userArtefactsReducer';
import {
  fetchUserWithToken,
  onCheckAuthJSON,
  updatePendingItemsOnGuestToUser
} from '../../utils/authHelperFunctions';
import {newUserTag} from '../../models/typeCreators';
import {updateUserTags, updateUserTagsIds} from '../../store/actions/actions';
import {
  updateUserBlogs,
  updateUserFolders
} from '../../store/actions/userArtefacts';
import {userBlogJSONtoUserBlog} from '../../utils/helperFunctions';
import flashMessage from '../../components/FlashMessage/FlashMessage';

type Props = {
  dispatch: Dispatch;
  route: {params: {loginType: LoginType}};
  url: string;
  userFolders: Array<UserFolder>;
  userBlogs: Array<UserBlog>;
  i18n: I18n;
  isGuest: boolean;
};

type State = {
  token: string;
  loading: boolean;
};

export const LoginMethodScreen = (props: Props) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Validate the new token
   */
  const updateToken = (newToken: string | null) => {
    if (newToken !== null) {
      setToken(newToken);
    } else {
      const {loginType} = props.route.params;
      if (newToken == null) {
        switch (loginType) {
          case 'basic':
            Alert.alert(
              props.i18n._(t`Login failed`),
              props.i18n._(
                t`Your username or password was incorrect. Please try again.`
              )
            );
            break;
          case 'token':
            Alert.alert(
              props.i18n._(t`Login failed`),
              props.i18n._(t`Invalid token: please try again.`)
            );
            break;
          case 'sso':
            Alert.alert(
              props.i18n._(t`Login failed`),
              props.i18n._(t`Please try again.`)
            );
            break;
          default:
            break;
        }
      }
    }
  };

  const login = () => {
    const {url} = props;
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

    // TODO check this function
    /**
     * Convert pending items after a guest has logged into Mahara
     */
    const onGuestToUser = async () => {
      props.dispatch(updateGuestStatus(false));
      updatePendingItemsOnGuestToUser(
        props.dispatch,
        props.userBlogs,
        props.userFolders,
        token,
        props.url
      );
      console.log('updatedGuestDetailsToProvidedUser');
    };

    let userData: any = null;
    setLoading(true);
    fetchUserWithToken(serverUrl, requestOptions)
      .then((json) => {
        onCheckAuthJSON(
          json,
          () => updateToken(json.token),
          () => {
            updateToken(null);
            setLoading(false);
          }
        );

        userData = json;

        if (props.isGuest) {
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
        // failed to log in
        if (!userData.userprofile) {
          return;
        }
        props.dispatch(updateUserName(userData.userprofile.myname));

        type FetchedTag = {
          tag: string;
          usage: number;
        };
        props.dispatch(addToken(token));

        // Create UserTags with id and string.
        const newUserTags: Array<UserTag> = userData.tags.tags.map(
          (tag: FetchedTag) => newUserTag(tag.tag)
        );
        props.dispatch(updateUserTags(newUserTags));
        props.dispatch(
          updateUserTagsIds(newUserTags.map((tag: UserTag) => tag.id))
        );

        props.dispatch(
          updateUserBlogs(
            userData.blogs.blogs.map((b: UserBlogJSON) =>
              userBlogJSONtoUserBlog(b)
            )
          )
        );

        // Check if user has folders (they can be deleted on Mahara)
        if (userData.folders.folders.length !== 0) {
          props.dispatch(updateUserFolders(userData.folders.folders));
        }

        props.dispatch(setDefaultBlogId(userData.blogs.blogs[0].id));
        props.dispatch(setDefaultFolder(userData.folders.folders[0].title));
        setLoading(false);
        flashMessage(t`Logged in: ${userData.userprofile.myname}`, 'success');

        // checkValidInitialState(props.userBlogs, props.userFolders)
      });
  };

  useEffect(() => {
    if (token !== '' && token !== null) {
      login();
    }
  }, [token]);

  const {loginType} = props.route.params;

  return (
    <View style={generic.view}>
      {loginType === 'token' ? (
        <TokenInput isLoading={loading} onGetToken={updateToken} />
      ) : null}
      {loginType === 'sso' ? (
        <SSOLogin url={props.url} onGetToken={updateToken} />
      ) : null}
      {loginType === 'basic' ? (
        <LocalLogin
          url={props.url}
          isLoading={loading}
          onGetToken={updateToken}
        />
      ) : null}
    </View>
  );
};

export const LoginMethodScreenOptions = (navData) => {
  const headerTitle = navData.route.params?.loginType;

  if (headerTitle === 'sso') {
    return {
      headerTitle: 'SSO'
    };
  }
  return {
    headerShown: false
  };
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state),
  userBlogs: selectUserBlogs(state),
  userFolders: selectUserFolders(state),
  isGuest: selectIsGuestStatus(state)
});

export default connect(mapStateToProps)(withI18n()(LoginMethodScreen));
