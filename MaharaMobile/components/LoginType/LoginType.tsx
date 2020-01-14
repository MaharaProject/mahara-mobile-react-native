import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Trans, t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import styles from './LoginType.style';
import { headings } from '../../assets/styles/headings';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';

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
  skip: () => void;
};

export default function LoginType(props: Props) {
  return (
    <View style={styles.view}>
      {!props.isInputHidden ? (
        <View>
          <Text style={headings.subHeading1}>
            <Trans>What is the address of your Mahara?</Trans>
          </Text>
          <TextInput
            style={forms.textInput}
            // placeholder={'https://yoursite.edu/'} TODO: put this back in and remove default value for go live
            defaultValue={'https://master.dev.mahara.org/'}
            onChangeText={(url:string) => props.checkUrl(url)}
          />
        </View>
      ) : null}
      {props.enterUrlWarning ? <Text><Trans>Please enter a URL</Trans></Text> : null}
      {props.errorMessage ? <Text>{props.errorMessage}</Text> : null}
      {props.serverPing && props.isInputHidden ? (
        <View>
          <Text style={[headings.subHeading2, styles.url]}>{props.url}</Text>
          <TouchableOpacity onPress={() => props.resetForm()}>
            <Text style={[buttons.md, styles.buttons]}>
              <Trans>Enter a different URL</Trans>
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {!props.isInputHidden ? (
        <View>
          <TouchableOpacity onPress={() => props.checkServer()}>
            <Text style={[buttons.md, styles.buttons]}><Trans>Next</Trans></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.skip}>
            <Text style={[buttons.md, styles.buttons]}><Trans>Skip</Trans></Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {props.serverPing ? (
        <Text style={headings.mainHeading}><Trans>Select login type</Trans></Text>
      ) : null}
      {props.serverPing && props.tokenLogin ? (
        <TouchableOpacity onPress={() => props.setLoginType('token')}>
          <Text style={[buttons.md, styles.buttons]}>
            <Trans>Paste in access token</Trans>
          </Text>
        </TouchableOpacity>
      ) : null}
      {props.serverPing && props.localLogin ? (
        <TouchableOpacity onPress={() => props.setLoginType('basic')}>
          <Text style={[buttons.md, styles.buttons]}>
            <Trans>Local Login</Trans>
          </Text>
        </TouchableOpacity>
      ) : null}
      {props.serverPing && props.ssoLogin ? (
        <TouchableOpacity onPress={() => props.setLoginType('sso')}>
          <Text style={[buttons.md, styles.buttons]}>
           <Trans>Single Sign On</Trans>
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
