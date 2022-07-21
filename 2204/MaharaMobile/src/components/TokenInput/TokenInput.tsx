/* eslint-disable prettier/prettier */
// import { t, Trans } from '@lingui/macro';
import { Input, Stack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
// Images
import LogoSvg from '../../assets/images/Logo-big';
import forms from '../../assets/styles/forms';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import styles from '../../assets/styles/variables';
import variables from '../../assets/styles/variables';
import { LOG_IN_ICON } from '../../utils/constants';
import LogoView from '../LogoView/LogoView';
import MaharaGradient from '../UI/MaharaGradient/MaharaGradient';
import MediumButton from '../UI/MediumButton/MediumButton';
import SubHeading from '../UI/SubHeading/SubHeading';
// Styles
// import styles from './TokenInput.style';

type Props = {
  onGetToken: Function;
  isLoading: boolean;
};

export default function TokenInput(props: Props) {
  const [token, setToken] = useState('');

  return (
    <LogoView>
      {props.isLoading ? (
        <ActivityIndicator size="small" color={variables.colors.light} />
      ) : null}

      <Stack direction="column" mb="2.5" mt="1.5" space={3}>
        <SubHeading
          noColon
          style={{ color: styles.colors.light, textAlign: 'center' }}
          text=" Log in via an access token"
        />
        <Input
          placeholder="..."
          autoCapitalize="none"
          onChangeText={(input) => setToken(input.trim())}
          style={TokenLoginStyles.input}
          variant="filled"
          w={{
            base: '100%',
            md: '25%',
          }}
        />
        {/* <MediumButton text={t`Verify token`} icon={LOG_IN_ICON} onPress={() => props.onGetToken(token)} /> */}
        <MediumButton
          text="Verify token"
          icon={LOG_IN_ICON}
          onPress={() => props.onGetToken(token)}
        />
      </Stack>
    </LogoView>
  );
}

const TokenLoginStyles = StyleSheet.create({
  input: {
    backgroundColor: styles.colors.light,
  },
});
