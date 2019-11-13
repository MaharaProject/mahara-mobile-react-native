import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addToken, sendTokenLogin, checkLoginTypes } from '../../actions/actions';
import { Store } from '../../models/models';
import LoginType from '../../components/LoginType/LoginType';
import TokenInput from '../../components/TokenInput/TokenInput';
import styles from './LoginScreen.style';

type Props = {
  dispatch: any;
  navigation: any; // need to double check type for this
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
}

type State = {
  token: string;
  url: string;
  loginType: string;
  serverPing: boolean;
  isInputHidden: boolean;
  enterUrlWarning: boolean;
}

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: '',
      url: '',
      loginType: '',
      serverPing: false,
      isInputHidden: false,
      enterUrlWarning: false
    };
  }

  static navigationOptions = {
    header: null,
  };

  setLoginType = (loginType: string) => {
    this.setState({
      loginType: loginType
    })
  }

  checkUrl = (url: string) => {
    let serverUrl = url.trim();

    if(serverUrl.length === 0) {
      this.setState({
        enterUrlWarning: true,
        url: ''
      });
      return;
    } else {
      this.setState({
        enterUrlWarning: false
      })
    }

    if (serverUrl.slice(-1) !== "/") {
      serverUrl = serverUrl + "/";
    }
    if (!/^https?:\/\//.test(serverUrl)) {
      serverUrl = "https://" + serverUrl;
    }
    this.setState({url: serverUrl});
  }

  checkServer = () => {
    const serverUrl = this.state.url;

    if(!serverUrl) {
      return;
    }

    this.props.dispatch(checkLoginTypes(serverUrl)).then( () => {
      if(this.props.tokenLogin || this.props.localLogin || this.props.ssoLogin) {
        this.setState({
          serverPing: true,
          isInputHidden: true
        });
      }
    });
  }

  toggleUrlField = (toggle: boolean) => {
    this.setState({
      isInputHidden: toggle
    });
  }

  login = () => {
    const url = 'https://master.dev.mahara.org/';
    const serverUrl = url + 'webservice/rest/server.php?alt=json';

    const body = {
      blogs: {},
      folders: {},
      tags: {},
      userprofile: {},
      userprofileicon: {},
      wsfunction: "module_mobileapi_sync",
      wstoken: this.state.token
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    this.props.dispatch(sendTokenLogin(serverUrl, requestOptions)).then(() => this.props.navigation.navigate('Add'));
  };

  handleToken = (value: string) => {
    this.setState({token: value}, function(this: any) {
      this.login();
    });

    this.props.dispatch(addToken(value));
  }

  render() {
    return (
      <View style={styles.view}>
        <LoginType
          url={this.state.url}
          isInputHidden={this.state.isInputHidden}
          serverPing={this.state.serverPing}
          enterUrlWarning={this.state.enterUrlWarning}
          setLoginType={this.setLoginType}
          checkServer={this.checkServer}
          checkUrl={this.checkUrl}
          toggleUrlField={this.toggleUrlField}
          localLogin={this.props.localLogin}
          ssoLogin={this.props.ssoLogin}
          tokenLogin={this.props.tokenLogin}
        />
        {this.state.loginType === 'token' ?
          <TokenInput
          handler={this.handleToken}
          />
        :null}
      </View>
    );
  }
};

const mapStateToProps = (state: Store) => {
  return {
    url: state.app.url,
    tokenLogin: state.app.tokenLogin,
    ssoLogin: state.app.ssoLogin,
    localLogin: state.app.localLogin
  }
}

export default connect(mapStateToProps)(LoginScreen);
