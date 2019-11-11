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
  setLoginType: Function;
  dispatch: any;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
}

type State = {
  url: string;
}

export class LoginType extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      url: ''
    }
  }

  checkUrl = (input: string) => {
    let url = input.trim();
    this.setState({
      url: url
    })
  }

  checkServer = async () => {
    let serverUrl = this.state.url;
    this.props.dispatch(checkLoginTypes(serverUrl));
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
    tokenLogin: state.app.tokenLogin,
    ssoLogin: state.app.ssoLogin,
    localLogin: state.app.localLogin
  }
}

export default connect(mapStateToProps)(LoginType);
