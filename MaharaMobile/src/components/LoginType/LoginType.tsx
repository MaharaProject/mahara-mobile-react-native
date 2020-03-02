// Font Awesome
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {t, Trans} from '@lingui/macro';
import React from 'react';
import {Text, TextInput, View} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import LogoSvg from '../../assets/images/Logo-big';
import buttons from '../../assets/styles/buttons';
import forms from '../../assets/styles/forms';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import messages from '../../assets/styles/messages';
import textStyles from '../../assets/styles/text';
import variables from '../../assets/styles/variables';

import LinkButton from '../../components/UI/LinkButton/LinkButton';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import styles from './LoginType.style';

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

const LoginType = (props: Props) => {
  return (
    <View style={styles.view}>
      <LinearGradient
        colors={[
          variables.colors.dark2,
          variables.colors.tertiary,
          variables.colors.light2
        ]}
        style={generic.linearGradient}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <LogoSvg />
          </View>

          {!props.isInputHidden ? (
            <View>
              <Text
                style={[
                  headingStyles.subHeading1,
                  textStyles.textWhite,
                  textStyles.center
                ]}>
                <Trans>Address of your Mahara site</Trans>
              </Text>
              <TextInput
                style={[
                  forms.textInput,
                  props.enterUrlWarning ? styles.errorTextInput : null
                ]}
                // placeholder={'https://yoursite.edu/'} TODO: put this back in and remove default value for go live
                defaultValue="https://master.dev.mahara.org/"
                onChangeText={(url: string) => props.checkUrl(url)}
              />
            </View>
          ) : null}

          {props.enterUrlWarning ? (
            <Text style={textStyles.errorText}>
              <Trans>Please enter a URL.</Trans>
            </Text>
          ) : null}

          {props.errorMessage
            ? showMessage({
                message: (
                  <Text style={messages.errorMessage}>
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      size={variables.font.md}
                      color={variables.colors.warn}
                    />
                    {props.errorMessage}
                  </Text>
                ),
                type: 'danger',
                backgroundColor: variables.colors.warnbg,
                color: variables.colors.warn
              })
            : null}

          {props.serverPing && props.isInputHidden ? (
            <View>
              <Text
                style={[headingStyles.mainHeading, styles.url, generic.center]}>
                {props.url}
              </Text>
              <OutlineButton
                title={t`Enter a different URL`}
                style={buttons.light}
                onPress={() => props.resetForm()}
              />
            </View>
          ) : null}
          {!props.isInputHidden ? (
            <View style={styles.buttonGroup}>
              <MediumButton
                title={t`Next`}
                onPress={() => props.checkServer()}
              />
              <LinkButton title={t`Skip`} onPress={() => props.onSkip()} />
            </View>
          ) : null}
          {props.serverPing && (
            <Text style={[headingStyles.mainHeading, generic.center]}>
              <Trans>Select login type</Trans>
            </Text>
          )}

          {props.serverPing && props.ssoLogin && (
            <MediumButton
              title={t`Single sign-on`}
              onPress={() => props.setLoginType('sso')}
            />
          )}
          {props.serverPing && props.localLogin && (
            <MediumButton
              title={t`Local`}
              onPress={() => props.setLoginType('basic')}
            />
          )}
          {props.serverPing && props.tokenLogin && (
            <MediumButton
              title={t`Access token`}
              onPress={() => props.setLoginType('token')}
            />
          )}
        </View>
      </LinearGradient>

      <FlashMessage position="top" />
    </View>
  );
};

export default LoginType;
