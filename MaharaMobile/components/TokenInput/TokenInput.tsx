/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import styles from './TokenInput.style';
import { forms } from '../../assets/styles/forms';
import { headingStyles } from '../../assets/styles/headings';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  onLogin: Function;
  onUpdateToken: Function;
};

export default function TokenInput(props: Props) {
  const [token, setToken] = useState('');

  const handleToken = (input: string) => {
    const token = input.trim();
    setToken(token);
  }

  return (
    <View style={styles.view}>
      <Text style={headingStyles.mainHeading}>Login via Token</Text>
      <TextInput
        style={forms.textInput}
        // TODO: remove default value for go live
        defaultValue="ab6f3b68f8b0b976cf6b51eac2cd54da"
        onChangeText={(token) => {handleToken(token)}}
      />
      <TouchableOpacity onPress={() => props.onUpdateToken(token)}>
        <Text style={buttons.lg}>Verify Token</Text>
      </TouchableOpacity>
    </View>
  );
}
