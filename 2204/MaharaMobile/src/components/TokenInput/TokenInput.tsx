/* eslint-disable prettier/prettier */
// import { t, Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
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
  onGetToken: Function;
  isLoading: boolean;
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
          {props.isLoading ? (
        <ActivityIndicator size="small" color={variables.colors.light} />
      ) : null}
          <Text style={[headingStyles.mainHeading, generic.center]}>
            {/* <Trans>Log in via an access token</Trans> */}
            Log in via an access token
            </Text>
          <TextInput
            style={forms.textInput}
            defaultValue="..."
            onChangeText={(input) => setToken(input.trim())
            }
          />
          {/* <MediumButton text={t`Verify token`} icon={LOG_IN_ICON} onPress={() => props.onGetToken(token)} /> */}
          <MediumButton text="Verify token" icon={LOG_IN_ICON} onPress={() => props.onGetToken(token)} />

        </View>
      </MaharaGradient>
    </View>
  );
}
