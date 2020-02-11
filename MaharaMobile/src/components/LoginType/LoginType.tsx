import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Trans, t } from '@lingui/macro';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import styles from './LoginType.style';
import forms from '../../assets/styles/forms';
import { headingStyles } from '../../assets/styles/headings';
import MediumButton from '../UI/MediumButton/MediumButton';

type Props = {
  url: string;
  errorMessage: string;
  setLoginType: Function;
  resetForm: Function;
  checkServer: Function;
  checkUrl: Function;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  serverPing: boolean;
  isInputHidden: boolean;
  enterUrlWarning: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  onSkip: () => void;
};

const LoginType = (props: Props) => (
  <View style={styles.view}>
    {!props.isInputHidden ? (
      <View>
        <Text style={headingStyles.subHeading1}>
          <Trans>What is the address of your Mahara?</Trans>
        </Text>
        <TextInput
          style={forms.textInput}
          // placeholder={'https://yoursite.edu/'} TODO: put this back in and remove default value for go live
          defaultValue="https://master.dev.mahara.org/"
          onChangeText={(url: string) => props.checkUrl(url)}
        />
      </View>
    ) : null}
    {props.enterUrlWarning ? (
      <Text>
        <Trans>Please enter a URL</Trans>
      </Text>
    ) : null}
    {props.errorMessage ? <Text>{props.errorMessage}</Text> : null}
    {props.serverPing && props.isInputHidden ? (
      <View>
        <Text style={[headingStyles.subHeading2, styles.url]}>{props.url}</Text>
        <MediumButton
          title={t`Enter a different URL`}
          onPress={() => props.resetForm()}
        />
      </View>
    ) : null}
    {!props.isInputHidden ? (
      <View>
        <MediumButton title={t`Next`} onPress={() => props.checkServer()} />
        <MediumButton title={t`Skip`} onPress={() => props.onSkip()} />
      </View>
    ) : null}
    {props.serverPing && (
      <Text style={headingStyles.mainHeading}>
        <Trans>Select login type</Trans>
      </Text>
    )}
    {props.serverPing && props.tokenLogin && (
      <MediumButton
        title={t`Paste in access token`}
        onPress={() => props.setLoginType('token')}
      />
    )}
    {props.serverPing && props.localLogin && (
      <MediumButton
        title={t`Local Login`}
        onPress={() => props.setLoginType('basic')}
      />
    )}
    {props.serverPing && props.ssoLogin && (
      <MediumButton
        title={t`Single Sign On`}
        onPress={() => props.setLoginType('sso')}
      />
    )}
  </View>
);

export default LoginType;
