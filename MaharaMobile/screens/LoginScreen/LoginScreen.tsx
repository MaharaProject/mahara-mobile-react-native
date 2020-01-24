import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { addToken, updateGuestStatus } from '../../actions/actions';
import TokenInput from '../../components/TokenInput/TokenInput';
import SSOLogin from '../../components/SSOLogin/SSOLogin';
import LocalLogin from '../../components/LocalLogin/LocalLogin';
import generic from '../../assets/styles/generic';
import {
  selectUrl,
  selectTokenLogin,
  selectSsoLogin,
  selectLocalLogin,
  selectIsGuestStatus
} from '../../reducers/loginInfoReducer';
import { RootState } from '../../reducers/reducers';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
import { UserFolder, UserBlog } from '../../models/models';
import {
  updatePendingItemsOnLogin,
  fetchUserOnTokenLogin
} from '../../utils/authHelperFunctions';

type Props = {
  dispatch: any;
  navigation: any; // need to double check type for this
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  loginType: boolean;
  userFolders: Array<UserFolder>;
  userBlogs: Array<UserBlog>;
  isGuest: boolean;
};

type State = {
  token: string;
  username: string;
  password: string;
};

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: '',
      username: '',
      password: ''
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

    this.props.dispatch(fetchUserOnTokenLogin(serverUrl, requestOptions))
      .then(() => {
        this.props.dispatch(addToken(this.state.token));
        this.signInAsync();
      })
      .then(() => this.props.navigation.navigate('App'));
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
    } else if (this.props.isGuest) {
      await this.props.dispatch(updateGuestStatus(false));
      updatePendingItemsOnLogin(
        this.props.dispatch,
        this.props.userBlogs,
        this.props.userFolders,
        this.state.token,
        this.props.url
      );
      await AsyncStorage.setItem('userToken', this.state.token);
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
  userFolders: selectUserFolders(state),
  isGuest: selectIsGuestStatus(state)
});

export default connect(mapStateToProps)(LoginScreen);
