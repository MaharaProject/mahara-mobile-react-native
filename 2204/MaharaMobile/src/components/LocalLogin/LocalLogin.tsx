// import {t, Trans} from '@lingui/macro';
import {I18n} from '@lingui/react';
import React, {useState} from 'react';
import {ActivityIndicator, Platform, Text, TextInput, View} from 'react-native';
import {getManufacturer, getModel} from 'react-native-device-info';
import uuid from 'react-native-uuid';
import LogoSvg from '../../assets/images/Logo-big';
import forms from '../../assets/styles/forms';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import variables from '../../assets/styles/variables';
import {onCheckAuthJSON} from '../../utils/authHelperFunctions';
import {LOG_IN_ICON} from '../../utils/constants';
import MaharaGradient from '../UI/MaharaGradient/MaharaGradient';
import MediumButton from '../UI/MediumButton/MediumButton';
import styles from './LocalLogin.style';

type Props = {
  url: string;
  onGetToken: Function;
  isLoading: boolean;
};

export default function LocalLogin(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLoginForToken = async () => {
    const manufacturer = getManufacturer();
    const model = getModel();
    const id = uuid.v4();
    const url = `${props.url}module/mobileapi/json/token.php`;

    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('service', 'maharamobile');
    body.append('component', 'module/mobileapi');
    body.append('clientname', 'Mahara Mobile');
    body.append('clientenv', `${Platform.OS}, ${manufacturer}, ${model}`);
    body.append('id', id);

    const config = {
      method: 'POST',
      body
    };

    try {
      const request = await fetch(url, config);
      const json = await request.json();

      onCheckAuthJSON(
        json,
        () => props.onGetToken(json.token),
        () => props.onGetToken(null)
      );
    } catch (e) {
      console.error(`Unexpected error:${e}`);
    }
    return null;
  };

  return (
    <View style={styles.view}>
      <MaharaGradient style={generic.linearGradient}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <LogoSvg />
          </View>
          {props.isLoading ? (
            <ActivityIndicator size="small" color={variables.colors.light} />
          ) : null}
          <Text style={[headingStyles.mainHeading, generic.center]}>
            <Trans>Log in via username and password</Trans>
          </Text>
          <I18n>
            {({i18n}) => (
              <TextInput
                style={forms.textInput}
                placeholder={i18n._(t`Username`)}
                onChangeText={(usernameInput) => setUsername(usernameInput)}
                autoCapitalize="none"
              />
            )}
          </I18n>
          <I18n>
            {({i18n}) => (
              <TextInput
                style={forms.textInput}
                secureTextEntry
                placeholder={i18n._(t`Password`)}
                onChangeText={(passwordInput) => setPassword(passwordInput)}
                autoCapitalize="none"
              />
            )}
          </I18n>
          <MediumButton
            text={t`Login`}
            icon={LOG_IN_ICON}
            onPress={checkLoginForToken}
          />
        </View>
      </MaharaGradient>
    </View>
  );
}
