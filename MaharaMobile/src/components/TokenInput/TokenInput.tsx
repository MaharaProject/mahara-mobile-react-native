/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { t, Trans } from '@lingui/macro';

// Linear gradient
import LinearGradient from 'react-native-linear-gradient';

// Styles
import styles from './TokenInput.style';
import variables from '../../assets/styles/variables';
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

  return (
    <View style={styles.view}>
      <LinearGradient colors={[variables.colors.dark2, variables.colors.tertiary, variables.colors.light2]} style={generic.linearGradient}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <LogoSvg />
          </View>
          <Text style={[headingStyles.mainHeading, generic.center]}><Trans>Log in via an access token</Trans></Text>
          <TextInput
            style={forms.textInput}
            // TODO: remove default value for go live
            defaultValue="1f1fa20d6ced9f281f663a9e6c1a30f8"
            onChangeText={(input) => setToken(input.trim())
            }
          />
          <MediumButton text={t`Verify token`} icon="faSignInAlt" onPress={() => props.onUpdateToken(token)} />
        </View>
      </LinearGradient>
    </View>
  );
}
