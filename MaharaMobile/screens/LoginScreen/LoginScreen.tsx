import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addToken, sendTokenLogin } from '../../actions/actions';
import TokenInput from '../../components/TokenInput/TokenInput';
import styles from './LoginScreen.style';

type Props = {
  dispatch: any;
  navigation: any; // need to double check type for this
}

type State = {
  token: string;
}

export class LoginScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: ''
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


  handleToken = (value: string) => {
    this.setState({token: value}, function(this: any) {
      this.login();
    });

    this.props.dispatch(addToken(value));
  }

  render() {
    return (
      <View style={styles.view}>
        <TokenInput
          handler={this.handleToken}
        />
      </View>
    );
  }
};

export default connect()(LoginScreen);
