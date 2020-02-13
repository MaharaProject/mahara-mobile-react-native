/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { t, Trans } from '@lingui/macro';

// Linear gradient
import LinearGradient from 'react-native-linear-gradient';

// Styles
import styles from './TokenInput.style';
import forms from '../../assets/styles/forms';
import headingStyles from '../../assets/styles/headings';
import generic from '../../assets/styles/generic';

// Images
import LogoSvg from '../../assets/images/Logo-big';

import MediumButton from '../UI/MediumButton/MediumButton';

type Props = {
  onUpdateToken: Function;
};

export default function TokenInput(props: Props) {
  const [token, setToken] = useState('');

  const handleToken = (input: string) => {
    const token = input.trim();
    setToken(token);
  };

  return (
    <View style={styles.view}>
      <LinearGradient colors={['#2e391c', '#566d31', '#9db576']} style={generic.linearGradient}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <LogoSvg />
        </View>
          <Text style={[headingStyles.mainHeading, generic.center]}><Trans>Login via Token</Trans></Text>
          <TextInput
            style={forms.textInput}
            // TODO: remove default value for go live
            defaultValue="ab6f3b68f8b0b976cf6b51eac2cd54da"
            onChangeText={(token) => handleToken(token)}
          />
          <MediumButton title={t`Verify Token`} onPress={() => props.onUpdateToken(token)} />
        </View>
      </LinearGradient>
    </View>
  );
}
