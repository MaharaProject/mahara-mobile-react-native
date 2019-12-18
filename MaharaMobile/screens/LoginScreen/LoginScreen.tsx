/* eslint-disable import/extensions */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addToken } from '../../actions/actions';
import TokenInput from '../../components/TokenInput/TokenInput';
import { sendTokenLogin } from '../../utils/helperFunctions';
import { generic } from '../../assets/styles/generic';
import {
  selectUrl,
  selectTokenLogin,
  selectSsoLogin,
  selectLocalLogin,
  selectLoginState,
} from '../../reducers/loginInfoReducer';
import { RootState } from '../../reducers/reducers';

type Props = {
  dispatch: any;
  navigation: any; // need to double check type for this
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  loginType: boolean;
  isLoggedIn: boolean;
};

type State = {
  token: string;
};

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: '',
    };
  }

  login = () => {
    const url = 'https://master.dev.mahara.org/';
    const serverUrl = `${url}webservice/rest/server.php?alt=json`;
    const body = {
      blogs: {},
      folders: {},
      tags: {},
      userprofile: {},
      userprofileicon: {},
      wsfunction: 'module_mobileapi_sync',
      wstoken: this.state.token,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    this.props
      .dispatch(sendTokenLogin(serverUrl, requestOptions))
      .then(() => this.props.navigation.navigate('Add'));
  };

  setToken = (input: string) => {
    const token = input.trim();

    this.setState({
      token,
    });
  };

  handleToken = () => {
    const { token } = this.state;
    this.login();
    this.props.dispatch(addToken(token));
  };

  static navigationOptions = {
    // header: null,d
  };

  render() {
    const { loginType } = this.props.navigation.state.params;

    return (
      <View style={generic.view}>
        {loginType === 'token' ? (
          <TokenInput handleToken={this.handleToken} setToken={this.setToken} />
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
  isLoggedIn: selectLoginState(state),
});

export default connect(mapStateToProps)(LoginScreen);
