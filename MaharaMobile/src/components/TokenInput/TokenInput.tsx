/* eslint-disable prettier/prettier */
import { t, Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
// Images
import LogoSvg from '../../assets/images/Logo-big';
import forms from '../../assets/styles/forms';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import variables from '../../assets/styles/variables';
import { LOG_IN_ICON } from '../../utils/constants';
import MaharaGradient from '../UI/MaharaGradient/MaharaGradient';
import MediumButton from '../UI/MediumButton/MediumButton';
// Styles
import styles from './TokenInput.style';





type Props = {
  onUpdateToken: Function;
};

export default function TokenInput(props: Props) {
  const [token, setToken] = useState('');

  return (
    <View style={styles.view}>
      <MaharaGradient colors={[variables.colors.dark2, variables.colors.tertiary, variables.colors.light2]} style={generic.linearGradient}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <LogoSvg />
          </View>
          <Text style={[headingStyles.mainHeading, generic.center]}><Trans>Log in via an access token</Trans></Text>
          <TextInput
            style={forms.textInput}
            defaultValue="..."
            onChangeText={(input) => setToken(input.trim())
            }
          />
          <MediumButton text={t`Verify token`} icon={LOG_IN_ICON} onPress={() => props.onUpdateToken(token)} />
        </View>
      </MaharaGradient>
    </View>
  );
}
