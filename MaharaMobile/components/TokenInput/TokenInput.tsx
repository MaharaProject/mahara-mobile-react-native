/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text, TextInput, View, TouchableOpacity
} from 'react-native';

import styles from './TokenInput.style';
import { forms } from '../../assets/styles/forms';
import { headingStyles } from '../../assets/styles/headings';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  onVerifyToken: Function;
  onUpdateToken: Function;
};

export default function TokenInput(props: Props) {
  return (
    <View style={styles.view}>
      <Text style={headingStyles.mainHeading}>Login via Token</Text>
    <TextInput
        style={forms.textInput}
        // TODO: remove default value for go live
        defaultValue="c6f3d4fd4b997c96392deeb127ec983b"
        onChangeText={(token) => props.onUpdateToken(token)}
      />
      <TouchableOpacity onPress={() => props.onVerifyToken()}>
        <Text style={buttons.lg}>Verify Token</Text>
      </TouchableOpacity>
    </View>
  );
}
