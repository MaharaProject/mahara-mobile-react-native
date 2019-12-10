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
        defaultValue='c6f3d4fd4b997c96392deeb127ec983b'
        onChangeText={(token) => props.setToken(token)}
      />
      <TouchableOpacity onPress={() => props.handleToken()}>
        <Text style={buttons.lg}>Verify Token</Text>
      </TouchableOpacity>
    </View>
  )
}
