/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import { getManufacturer, getModel } from 'react-native-device-info';
import { I18n } from '@lingui/react';
import { t, Trans } from '@lingui/macro';

// Linear gradient
import LinearGradient from 'react-native-linear-gradient';

// Styles
import styles from './LocalLogin.style';
import variables from '../../assets/styles/variables';
import generic from '../../assets/styles/generic';
import forms from '../../assets/styles/forms';
import headingStyles from '../../assets/styles/headings';

// Images
import LogoSvg from '../../assets/images/Logo-big';

// Components
import MediumButton from '../UI/MediumButton/MediumButton';

// Font Awesome
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


type Props = {
  url: string;
  onUpdateToken: Function;
};

export default function LocalLogin(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLogins = async () => {
    const manufacturer = getManufacturer();
    const model = getModel();
    const id = uuid.v4();
    const url = props.url + 'module/mobileapi/json/token.php';

    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('service', 'maharamobile');
    body.append('component', 'module/mobileapi');
    body.append('clientname', 'Mahara Mobile');
    body.append('clientenv',  Platform.OS + ', ' + manufacturer + ', ' + model);
    body.append('id', id);

    const config = {
      method: 'POST',
      body: body
    };

    try {
      const request = await fetch(url, config);
      const json = await request.json();
      props.onUpdateToken(json.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.view}>
      <LinearGradient colors={[variables.colors.dark2, variables.colors.tertiary, variables.colors.light2]} style={generic.linearGradient}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <LogoSvg />
          </View>
          <Text style={[headingStyles.mainHeading, generic.center]}><Trans>Login via username and password</Trans></Text>
          <I18n>
            {({ i18n }) => <TextInput
                              style={forms.textInput}
                              placeholder={i18n._(t `Enter your username`)}
                              onChangeText={(usernameInput) => setUsername(usernameInput)}
                            />
            }
          </I18n>
          <I18n>
            {({ i18n }) => <TextInput
                              style={forms.textInput}
                              secureTextEntry
                              placeholder={i18n._(t `Enter your password`)}
                              onChangeText={(passwordInput) => setPassword(passwordInput)}
                            />
            }
          </I18n>
          <MediumButton title={t` Login`} onPress={() => checkLogins()} />
        </View>
      </LinearGradient>
    </View>
  );
}
