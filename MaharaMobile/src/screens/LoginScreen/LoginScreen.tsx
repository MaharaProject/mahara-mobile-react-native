import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addToken, updateGuestStatus} from '../../actions/actions';
import generic from '../../assets/styles/generic';
import LocalLogin from '../../components/LocalLogin/LocalLogin';
import SSOLogin from '../../components/SSOLogin/SSOLogin';
import TokenInput from '../../components/TokenInput/TokenInput';
import {UserBlog, UserFolder} from '../../models/models';
import {
  selectIsGuestStatus,
  selectLocalLogin,
  selectSsoLogin,
  selectTokenLogin,
  selectUrl
} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
import {
  fetchProfilePic,
  fetchUserOnTokenLogin,
  updatePendingItemsOnGuestToUser,
  checkValidInitialState
} from '../../utils/authHelperFunctions';

type Props = {
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  loginType: boolean;
  userFolders: Array<UserFolder>;
  userBlogs: Array<UserBlog>;
  i18n: I18n;
  isGuest: boolean;
};

type State = {
  token: string;
};

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: ''
    };
  }

  login = () => {
    const {url} = this.props;
    const serverUrl = `${url}webservice/rest/server.php?alt=json`;

    const body = {
      blogs: {},
      folders: {},
      tags: {},
      userprofile: {},
      userprofileicon: {},
      wsfunction: 'module_mobileapi_sync',
      wstoken: this.state.token
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    this.props
      .dispatch(fetchUserOnTokenLogin(serverUrl, requestOptions))
      .then(() => {
        this.props.dispatch(addToken(this.state.token));
        fetchProfilePic(this.props.dispatch, this.state.token, url);
        this.signInUserAsync();
      })
      .then(() => {
        if (
          checkValidInitialState(this.props.userBlogs, this.props.userFolders)
        ) {
          this.props.navigation.navigate('App');
        }
      })
      .catch(() => {
        const {loginType} = this.props.navigation
          ? this.props.navigation.state.params
          : '';
        switch (loginType) {
          case 'basic':
            Alert.alert(
              this.props.i18n._(t`Login failed`),
              this.props.i18n._(
                t`Your username or password was incorrect. Please try again.`
              )
            );
            break;
          case 'token':
            Alert.alert(
              this.props.i18n._(t`Login failed`),
              this.props.i18n._(t`Invalid token: please try again.`)
            );
            break;
          case 'SSO':
            Alert.alert(
              this.props.i18n._(t`Login failed`),
              this.props.i18n._(t`Please try again.`)
            );
            break;
          default:
            break;
        }
      });
  };

  updateToken = (token: string, webview?: {stopLoading: () => void}) => {
    this.setState({token}, () => {
      this.login();
      if (webview) {
        webview.stopLoading();
      }
    });
  };

  // TODO check this function
  /**
   * Save user token to async storage
   */
  signInUserAsync = async () => {
    if (this.state.token.length < 1) {
      Alert.alert(
        this.props.i18n._(t`You didn't enter anything in this field.`)
      );
    } else if (this.props.isGuest) {
      await this.props.dispatch(updateGuestStatus(false));
      updatePendingItemsOnGuestToUser(
        this.props.dispatch,
        this.props.userBlogs,
        this.props.userFolders,
        this.state.token,
        this.props.url
      );
    }
  };

  static navigationOptions = {
    header: null
  };

  render() {
    const {params} = this.props.navigation ? this.props.navigation.state : '';
    const {loginType} = params || '';

    return (
      <View style={generic.view}>
        {loginType === 'token' ? (
          <TokenInput onUpdateToken={this.updateToken} />
        ) : null}
        {loginType === 'sso' ? (
          <SSOLogin url={this.props.url} onUpdateToken={this.updateToken} />
        ) : null}
        {loginType === 'basic' ? (
          <LocalLogin url={this.props.url} onUpdateToken={this.updateToken} />
        ) : null}
      </View>
    );
  }
}

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
