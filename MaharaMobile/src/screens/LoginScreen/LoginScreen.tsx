import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Dispatch } from 'redux';
import { addToken, updateGuestStatus } from '../../actions/actions';
import TokenInput from '../../components/TokenInput/TokenInput';
import SSOLogin from '../../components/SSOLogin/SSOLogin';
import LocalLogin from '../../components/LocalLogin/LocalLogin';
import generic from '../../assets/styles/generic';
import {
  selectUrl,
  selectTokenLogin,
  selectSsoLogin,
  selectLocalLogin
} from '../../reducers/loginInfoReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
import { UserFolder, UserBlog } from '../../models/models';
import {
  updatePendingItemsOnLogin,
  fetchUserOnTokenLogin,
  fetchProfilePic
} from '../../utils/authHelperFunctions';
import { RootState } from '../../reducers/rootReducer';

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
    const { url } = this.props;
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
        this.signInAsync();
      })
      .then(() => this.props.navigation.navigate('App'))
      .catch(() => {
        Alert.alert('Invalid token, please try again!');
      });
  };

  updateToken = (token: string, webview?: any) => {
    this.setState({ token }, () => {
      this.login();
      if (webview) {
        webview.stopLoading();
      }
    });
  }

  /**
   * Save user token to async storage
   */
  signInAsync = async () => {
    if (this.state.token.length < 1) {
      Alert.alert('Nothing entered in field');
    }
  };

  static navigationOptions = {
    header: null
  };

  render() {
    const { params } = this.props.navigation.state;
    const { loginType } = params;

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
  userFolders: selectUserFolders(state)
});

export default connect(mapStateToProps)(LoginScreen);
