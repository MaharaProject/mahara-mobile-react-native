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
          defaultValue='ab6f3b68f8b0b976cf6b51eac2cd54da'
          onChangeText={(token) => this.updateToken(token)}
        />
        <TouchableOpacity onPress={this.sendToken}>
          <Text style={buttons.large}>Verify Token</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
