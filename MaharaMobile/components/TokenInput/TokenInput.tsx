import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import styles from './TokenInput.style.ts';
import { forms } from '../../assets/styles/forms.ts';
import { buttons } from '../../assets/styles/buttons.ts';

export default class TokenInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    };
  };

  updateToken = async (input) => {
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
