import React, { Component } from 'react';
import { View } from 'react-native';
import { addToken } from '../../actions/actions';
import TokenInput from '../../components/TokenInput/TokenInput';
import { sendTokenLogin } from '../../utils/helperFunctions';
import { MaharaStore } from '../../models/models';
import { generic } from '../../assets/styles/generic';
import { connect } from 'react-redux';
import { selectUrl, selectTokenLogin, selectSsoLogin, selectLocalLogin } from '../../reducers/loginInfoReducer';
import { RootState } from '../../reducers/reducers';

type Props = {
  dispatch: any;
  navigation: any; // need to double check type for this
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  loginType: boolean;
}

type State = {
  token: string;
  url: string;
}

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: '',
      url: ''
    };
  }

  static navigationOptions = {
    header: null,
  };

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

  setToken = (input: string) => {
    let token = input.trim();

    this.setState({
      token: token
    });
  }

  handleToken = () => {
    const token = this.state.token;
    this.login();
    this.props.dispatch(addToken(token));
  }

  render() {
    const { params } = this.props.navigation.state;
    const loginType = params.loginType;

    return (
      <View style={generic.view}>
        {loginType === 'token' ?
          <TokenInput
            handleToken={this.handleToken}
            setToken={this.setToken}
          />
          : null}
      </View>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    url: selectUrl(state),
    tokenLogin: selectTokenLogin(state),
    ssoLogin: selectSsoLogin(state),
    localLogin: selectLocalLogin(state)
  }
}

export default connect(mapStateToProps)(LoginScreen);