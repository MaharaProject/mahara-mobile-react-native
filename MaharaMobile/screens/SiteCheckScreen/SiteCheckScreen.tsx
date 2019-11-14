import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { checkLoginTypes } from '../../actions/actions';
import { Store } from '../../models/models';
import LoginType from '../../components/LoginType/LoginType';

type Props = {
  dispatch: any;
  navigation: any; // need to double check type for this
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
}

type State = {
  url: string;
  loginType: string;
  serverPing: boolean;
  isInputHidden: boolean;
  enterUrlWarning: boolean;
}

const initialState: State = {
  url: '',
  loginType: '',
  serverPing: false,
  isInputHidden: false,
  enterUrlWarning: false
}

export class SiteCheckScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  setLoginType = (loginType: string) => {
    this.props.navigation.navigate('Login', {
      loginType: loginType
    });
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

  resetForm = () => {
    this.setState(initialState);
  }

  render() {
    return (
      <View>
        <LoginType
          url={this.state.url}
          isInputHidden={this.state.isInputHidden}
          serverPing={this.state.serverPing}
          enterUrlWarning={this.state.enterUrlWarning}
          setLoginType={this.setLoginType}
          checkServer={this.checkServer}
          checkUrl={this.checkUrl}
          resetForm={this.resetForm}
          localLogin={this.props.localLogin}
          ssoLogin={this.props.ssoLogin}
          tokenLogin={this.props.tokenLogin}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: Store) => {
  return {
    url: state.app.url,
    tokenLogin: state.app.tokenLogin,
    ssoLogin: state.app.ssoLogin,
    localLogin: state.app.localLogin
  }
}

export default connect(mapStateToProps)(SiteCheckScreen);
