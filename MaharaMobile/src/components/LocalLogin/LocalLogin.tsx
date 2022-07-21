// import {t, Trans} from '@lingui/macro';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Platform } from 'react-native';
import { getManufacturer, getModel } from 'react-native-device-info';
import React from 'react';
import uuid from 'react-native-uuid';
import variables from '../../assets/styles/variables';
import { onCheckAuthJSON } from '../../utils/authHelperFunctions';
import { LOG_IN_ICON } from '../../utils/constants';
import MediumButton from '../UI/MediumButton/MediumButton';
import { IconButton, Input, Stack, Text } from 'native-base';
import LogoView from '../LogoView/LogoView';
import SubHeading from '../UI/SubHeading/SubHeading';
import styles from '../../assets/styles/variables';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

type Props = {
  url: string;
  onGetToken: Function;
  isLoading: boolean;
};

export default function LocalLogin(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);

  const checkLoginForToken = async () => {
    const manufacturer = getManufacturer();
    const model = getModel();
    const id = uuid.v4();
    const url = `${props.url}module/mobileapi/json/token.php`;

    const body = new FormData();
    body.append('username', username.trim());
    body.append('password', password);
    body.append('service', 'maharamobile');
    body.append('component', 'module/mobileapi');
    body.append('clientname', 'Mahara Mobile');
    body.append('clientenv', `${Platform.OS}, ${manufacturer}, ${model}`);
    body.append('id', id);

    const config = {
      method: 'POST',
      body,
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
    <LogoView>
      {props.isLoading ? (
        <ActivityIndicator size="small" color={variables.colors.light} />
      ) : null}

      <Stack direction="column" mb="2.5" mt="1.5" space={3}>
        <SubHeading
          noColon
          style={{ color: styles.colors.light, textAlign: 'center' }}
          text="Log in via username and password"
        />
        {/* <Trans>Log in via username and password</Trans> */}

        {/* <I18n>
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
          </I18n> */}
        {/* <TextInput
          style={forms.textInput}
          // placeholder={i18n._(t`Username`)}
          placeholder="Username"
          onChangeText={(usernameInput) => setUsername(usernameInput)}
          autoCapitalize="none"
        />
        <TextInput
          style={forms.textInput}
          secureTextEntry
          placeholder="Password"
          onChangeText={(passwordInput) => setPassword(passwordInput)}
          autoCapitalize="none"
        /> */}
        <Stack space={4} w="100%" alignItems="center">
          <Input
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(usernameInput) => setUsername(usernameInput)}
            style={LocalLoginStyles.input}
            variant="filled"
            w={{
              base: '100%',
              md: '25%',
            }}
            // InputLeftElement={faPersonBooth}
          />
          <Input
            style={LocalLoginStyles.input}
            onChangeText={(passwordInput) => setPassword(passwordInput)}
            variant="filled"
            w={{
              base: '100%',
              md: '25%',
            }}
            type={show ? 'text' : 'password'}
            InputRightElement={
              <IconButton
                h="full"
                rounded={'none'}
                backgroundColor={styles.colors.light2}
                onPress={() => setShow(!show)}
                icon={
                  show ? (
                    <FontAwesomeIcon
                      color={variables.colors.primary}
                      icon={faEye}
                      size={styles.font.lg}
                    />
                  ) : (
                    <FontAwesomeIcon
                      color={variables.colors.primary}
                      icon={faEyeSlash}
                      size={styles.font.lg}
                    />
                  )
                }
              />
            }
            placeholder="Password"
          />
        </Stack>

        <MediumButton
          text="Login"
          icon={LOG_IN_ICON}
          onPress={checkLoginForToken}
        />
      </Stack>
    </LogoView>
  );
}

const LocalLoginStyles = StyleSheet.create({
  input: {
    backgroundColor: styles.colors.light,
  },
});
