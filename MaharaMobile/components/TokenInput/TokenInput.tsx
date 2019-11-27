import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import styles from './TokenInput.style';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  handler: any;
}

type State = {
  token: string;
}

export default class TokenInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: '',
    };
  };

  updateToken = async (input: string) => {
    let token = input.trim();

    this.setState({
      token: token
    });
  }

  sendToken = () => {
    // pass token to loginScreen
    this.props.handler(this.state.token);
  }

  render() {
    return (
      <View style={styles.view}>
        <TextInput
          style={forms.textInput}
          defaultValue='c6f3d4fd4b997c96392deeb127ec983b'
          onChangeText={(token) => this.updateToken(token)}
        />
        <TouchableOpacity onPress={this.sendToken}>
          <Text style={buttons.lg}>Verify Token</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
