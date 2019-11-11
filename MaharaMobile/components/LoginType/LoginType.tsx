import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
// import { connect } from 'react-redux';
import styles from './LoginType.style';
import { headings } from '../../assets/styles/headings';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  url: string;
  setLoginType: Function;
}

type State = {
  url: string;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
}

interface Response {
  logintypes: Array<string>
}

export default class LoginType extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      url: '',
      tokenLogin: false,
      ssoLogin: false,
      localLogin: false
    }
  }

  checkUrl = (input: string) => {
    let url = input.trim();

    this.setState({
      url: url
    })
  }

  checkServer = async () => {
    let serverUrl = this.state.url + 'module/mobileapi/json/info.php';

    try {
      const response = await fetch(serverUrl, {
        method: 'GET'
      });
      const result = await response.json();
      console.log('Success:', result);
      this.loginTypes(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  loginTypes = (response: Response) => {

    if(response.logintypes.includes('manual')) {
      this.setState({ tokenLogin: true })
    }
    if (response.logintypes.includes('basic')) {
      this.setState({ localLogin: true })
    }
    if (response.logintypes.includes('sso')) {
      this.setState({ ssoLogin: true })
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={headings.subHeading1}>What is the address of your Mahara?</Text>
        <TextInput
          style={forms.textInput}
          // placeholder={'https://yoursite.edu/'}
          defaultValue='https://master.dev.mahara.org/'
          onChangeText={(url) => this.checkUrl(url)}
        />
        <TouchableOpacity onPress={()=>this.checkServer()}>
          <Text style={buttons.large}>Next</Text>
        </TouchableOpacity>
        {this.state.tokenLogin ?
          <TouchableOpacity
            onPress={()=>this.props.setLoginType('token')
          }>
            <Text style={[buttons.md, styles.buttons]}>Paste in access token</Text>
          </TouchableOpacity>
        :null }
        {this.state.localLogin ?
          <TouchableOpacity
            onPress={()=>this.props.setLoginType('basic')
          }>
            <Text style={[buttons.md, styles.buttons]}>Local Login</Text>
          </TouchableOpacity>
        :null }
        {this.state.ssoLogin ?
          <TouchableOpacity
            onPress={()=>this.props.setLoginType('sso')
          }>
            <Text style={[buttons.md, styles.buttons]}>Single Sign On</Text>
          </TouchableOpacity>
        :null }

      </View>
    )
  }
}
