import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import styles from './TokenInput.style';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';
import { headings } from '../../assets/styles/headings';

type Props = {
  handleToken: Function;
  setToken: Function;
}

export default function TokenInput(props: Props) {
  return (
    <View style={styles.view}>
      <Text style={headings.mainHeading}>Login via Token</Text>
      <TextInput
        style={forms.textInput}
        //TODO: remove default value for go live
        defaultValue='ab6f3b68f8b0b976cf6b51eac2cd54da'
        onChangeText={(token) => props.setToken(token)}
      />
      <TouchableOpacity onPress={()=>props.handleToken()}>
        <Text style={buttons.lg}>Verify Token</Text>
      </TouchableOpacity>
    </View>
  )
}
