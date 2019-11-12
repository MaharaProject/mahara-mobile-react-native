import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { checkLoginTypes } from '../../actions/actions';
import { Store } from '../../models/models';
import styles from './LoginType.style';
import { headings } from '../../assets/styles/headings';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  url: string;
  setLoginType: Function;
  dispatch: any;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
}

type State = {
  url: string;
  enterUrlWarning: boolean;
  serverPing: boolean;
  isInputHidden: boolean;
}

export class LoginType extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      url: '',
      enterUrlWarning: false,
      serverPing: this.props.url ? true : false,
      isInputHidden: this.props.url ? true : false
    }
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

  render() {
    return (
      <View style={styles.view}>
        {!this.state.isInputHidden ?
          <View>
            <Text style={headings.subHeading1}>What is the address of your Mahara?</Text>
            <TextInput
              style={forms.textInput}
              // placeholder={'https://yoursite.edu/'}
              defaultValue='https://master.dev.mahara.org/'
              onChangeText={(url) => this.checkUrl(url)}
            />
          </View>
        :null }
        {this.state.enterUrlWarning ?
          <Text>Please enter a URL</Text>
        : null}
        {this.state.serverPing && this.state.isInputHidden ?
          <TouchableOpacity onPress={()=>this.setState({ isInputHidden: false})}>
            <Text style={[buttons.md, styles.buttons]}>Enter a different URL</Text>
          </TouchableOpacity>
        : null}
        {!this.state.isInputHidden ?
          <TouchableOpacity onPress={()=>this.checkServer()}>
            <Text style={[buttons.md, styles.buttons]}>Next</Text>
          </TouchableOpacity>
        : null}
        {this.props.tokenLogin ?
          <TouchableOpacity
            onPress={()=>this.props.setLoginType('token')
          }>
            <Text style={[buttons.md, styles.buttons]}>Paste in access token</Text>
          </TouchableOpacity>
        :null }
        {this.props.localLogin ?
          <TouchableOpacity
            onPress={()=>this.props.setLoginType('basic')
          }>
            <Text style={[buttons.md, styles.buttons]}>Local Login</Text>
          </TouchableOpacity>
        :null }
        {this.props.ssoLogin ?
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

const mapStateToProps = (state: Store) => {
  return {
    url: state.app.url,
    tokenLogin: state.app.tokenLogin,
    ssoLogin: state.app.ssoLogin,
    localLogin: state.app.localLogin
  }
}

export default connect(mapStateToProps)(LoginType);
