import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { checkLoginTypes } from '../../actions/actions';
import LoginType from '../../components/LoginType/LoginType';
import { generic } from '../../assets/styles/generic';
import { RootState } from '../../reducers/reducers';
import { selectUrl, selectTokenLogin, selectSsoLogin, selectLocalLogin } from '../../reducers/loginInfoReducer';

type Props = {
  dispatch: any;
  navigation: any; // TODO: need to double check type for this
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
};

type State = {
  errorMessage: string;
  url: string;
  loginType: string;
  serverPing: boolean;
  isInputHidden: boolean;
  enterUrlWarning: boolean;
};

const initialState: State = {
  errorMessage: '',
  url: '',
  loginType: '',
  serverPing: false,
  isInputHidden: false,
  enterUrlWarning: false,
};

export class SiteCheckScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  setLoginType = (loginType: string) => {
    this.props.navigation.navigate('Login', {
      loginType,
    });
  };

  checkUrl = (url: string) => {
    let serverUrl = url.trim();

    if (serverUrl.length === 0) {
      this.setState({
        enterUrlWarning: true,
        url: '',
      });
      return;
    }
    this.setState({
      enterUrlWarning: false,
    });

    if (serverUrl.slice(-1) !== '/') {
      serverUrl += '/';
    }
    if (!/^https?:\/\//.test(serverUrl)) {
      serverUrl = `https://${serverUrl}`;
    }
    this.setState({ url: serverUrl });
  };

  checkServer = async () => {
    const serverUrl = this.state.url;

    if (!serverUrl) {
      return;
    }

    try {
      await this.props.dispatch(checkLoginTypes(serverUrl));
      if (
        this.props.tokenLogin || this.props.localLogin || this.props.ssoLogin ) {
        this.setState({
          serverPing: true,
          isInputHidden: true,
          errorMessage: '',
        });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
      console.log(error);
    }
  };

  resetForm = () => {
    this.setState(initialState);
  };

  skip = () => {
    this.props.navigation.navigate('Add');
  };

  static navigationOptions = {
    // header: null,
  };

  render() {
    return (
      <View style={generic.view}>
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
          errorMessage={this.state.errorMessage}
          skip={this.skip}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state),
});

export default connect(mapStateToProps)(SiteCheckScreen);
