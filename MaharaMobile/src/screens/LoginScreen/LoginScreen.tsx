import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {Component, useState} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addToken, updateGuestStatus} from '../../store/actions/loginInfo';
import generic from '../../assets/styles/generic';
import LocalLogin from '../../components/LocalLogin/LocalLogin';
import SSOLogin from '../../components/SSOLogin/SSOLogin';
import TokenInput from '../../components/TokenInput/TokenInput';
import {LoginType, UserBlog, UserFolder} from '../../models/models';
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
  fetchProfilePic,
  fetchUserOnTokenLogin,
  updatePendingItemsOnGuestToUser,
  checkValidInitialState
} from '../../utils/authHelperFunctions';

type Props = {
  dispatch: Dispatch;
  navigation: any;
  route: {params: {loginType: LoginType}};
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  userFolders: Array<UserFolder>;
  userBlogs: Array<UserBlog>;
  i18n: I18n;
  isGuest: boolean;
};

const LoginScreen = (props: Props) => {
  const {loginType} = props.route.params;

  const login = (token: string) => {
    const {url} = props;
    const serverUrl = `${url}webservice/rest/server.php?alt=json`;
    console.log(`serverUrl: ${serverUrl}`);

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

    console.log(JSON.stringify(body));
    /**
     * Save user token to async storage
     */
    const validate = async token => {
      if (token.length < 1) {
        Alert.alert(props.i18n._(t`You didn't enter anything in this field.`));
        return;
      }

      if (props.isGuest) {
        console.log('a guest');
        props.dispatch(updateGuestStatus(false));
        updatePendingItemsOnGuestToUser(
          props.dispatch,
          props.userBlogs,
          props.userFolders,
          token,
          props.url
        );
      }
    };

    validate(token);
    console.log('fetch user on token login');
    fetchUserOnTokenLogin(serverUrl, requestOptions, props.dispatch, token);
    // props
    //   .dispatch(
    //     fetchUserOnTokenLogin(serverUrl, requestOptions, props.dispatch)
    //   )
    //   .then(() => {
    // props.dispatch(addToken(token));
    // onLogin(token);
    // fetchProfilePic(props.dispatch, token, url);
    // })
    // .then(() => {
    //   if (checkValidInitialState(props.userBlogs, props.userFolders)) {
    //     // props.navigation.navigate('App');
    //   }
    // })
    // .catch(() => {
    //   const {loginType} = props.route.params;

    //   switch (loginType) {
    //     case 'basic':
    //       Alert.alert(
    //         props.i18n._(t`Login failed`),
    //         props.i18n._(
    //           t`Your username or password was incorrect. Please try again.`
    //         )
    //       );
    //       break;
    //     case 'token':
    //       Alert.alert(
    //         props.i18n._(t`Login failed`),
    //         props.i18n._(t`Invalid token: please try again.`)
    //       );
    //       break;
    //     case 'SSO':
    //       Alert.alert(
    //         props.i18n._(t`Login failed`),
    //         props.i18n._(t`Please try again.`)
    //       );
    //       break;
    //     default:
    //       break;
    //   }
    // });
  };

  const updateToken = (token: string) => {
    login(token);
  };

  return (
    <View style={generic.view}>
      {loginType === 'token' ? (
        <TokenInput onUpdateToken={token => updateToken(token)} />
      ) : null}
      {loginType === 'sso' ? (
        <SSOLogin url={props.url} onUpdateToken={token => updateToken(token)} />
      ) : null}
      {loginType === 'basic' ? (
        <LocalLogin
          url={props.url}
          onUpdateToken={token => updateToken(token)}
        />
      ) : null}
    </View>
  );
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

export default connect(mapStateToProps)(withI18n()(LoginScreen));
