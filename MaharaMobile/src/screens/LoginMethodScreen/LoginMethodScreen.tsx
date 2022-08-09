import { t } from '@lingui/macro';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import generic from '../../assets/styles/generic';
import LocalLogin from '../../components/LocalLogin/LocalLogin';
import SSOLogin from '../../components/SSOLogin/SSOLogin';
import TokenInput from '../../components/TokenInput/TokenInput';
import { LoginType, UserBlog, UserFolder } from '../../models/models';
import {
  selectIsGuestStatus,
  selectLocalLogin,
  selectSsoLogin,
  selectTokenLogin,
  selectUrl,
} from '../../store/reducers/loginInfoReducer';
import { RootState } from '../../store/reducers/rootReducer';
import {
  selectUserBlogs,
  selectUserFolders,
} from '../../store/reducers/userArtefactsReducer';
import { login } from '../../utils/authHelperFunctions';

type Props = {
  dispatch: Dispatch;
  route: { params: { loginType: LoginType } };
  url: string;
  userFolders: Array<UserFolder>;
  userBlogs: Array<UserBlog>;
  i18n: any;
  isGuest: boolean;
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
      const { loginType } = props.route.params;
      if (newToken == null) {
        switch (loginType) {
          case 'basic':
            Alert.alert(
              t`Login failed`,
              t`Your username or password was incorrect. Please try again.`
            );
            break;
          case 'token':
            Alert.alert(t`Login failed`, t`Invalid token: please try again.`);
            break;
          case 'sso':
            Alert.alert(t`Login failed`, t`Please try again.`);
            break;
          default:
            break;
        }
      }
    }
  };

  useEffect(() => {
    if (token !== '' && token !== null) {
      login(
        props.url,
        props.dispatch,
        props.userBlogs,
        props.userFolders,
        token,
        setLoading,
        updateToken,
        props.isGuest
      );
    }
  }, [token]);

  const { loginType } = props.route.params;

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
      headerTitle: 'SSO',
    };
  }
  return {
    headerShown: false,
  };
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state),
  userBlogs: selectUserBlogs(state),
  userFolders: selectUserFolders(state),
  isGuest: selectIsGuestStatus(state),
});

export default connect(mapStateToProps)(LoginMethodScreen);
