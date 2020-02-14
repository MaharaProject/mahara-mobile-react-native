import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Trans, t } from '@lingui/macro';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

// Linear gradient
import LinearGradient from 'react-native-linear-gradient';

// Styles
import styles from './LoginType.style';
import variables from '../../assets/styles/variables';
import generic from '../../assets/styles/generic';
import forms from '../../assets/styles/forms';
import messages from '../../assets/styles/messages';
import textStyles  from '../../assets/styles/text';
import headingStyles from '../../assets/styles/headings';

// Images
import LogoSvg from '../../assets/images/Logo-big';

// Components
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import LinkButton from '../../components/UI/LinkButton/LinkButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';

// Font Awesome
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Flash messages
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";


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
      <LinearGradient colors={[variables.colors.dark2, variables.colors.tertiary, variables.colors.light2]} style={generic.linearGradient}>
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <LogoSvg />
          </View>

          {!props.isInputHidden ? (
            <View>
              <Text style={[headingStyles.subHeading1, textStyles.textWhite, textStyles.center]}>
                <Trans>What is the address of your Mahara?</Trans>
              </Text>
              <TextInput
                style={[forms.textInput, props.enterUrlWarning ? styles.errorTextInput : null ]}
                // placeholder={'https://yoursite.edu/'} TODO: put this back in and remove default value for go live
                defaultValue={'https://master.dev.mahara.org/'}
                onChangeText={(url:string) => props.checkUrl(url)}
              />
            </View>
          ) : null}

          {props.enterUrlWarning ? <Text style={textStyles.errorText}><Trans>Please enter a URL</Trans></Text> : null}

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
              color: variables.colors.warn,
            }
          ) : null}

          {props.serverPing && props.isInputHidden ? (
            <View>
              <Text style={[headingStyles.mainHeading, styles.url, generic.center]}>{props.url}</Text>
              <OutlineButton title={t`Enter a different URL`} onPress={() => props.resetForm()} />
            </View>
          ) : null}
          {!props.isInputHidden ?
            <View style={styles.buttonGroup}>
              <MediumButton title={t`Next`} onPress={() => props.checkServer()} />
              <LinkButton title={t`Skip`} onPress={() => props.onSkip()} />
            </View>
            : null}
          {props.serverPing &&
            <Text style={[headingStyles.mainHeading, generic.center]}>
              <Trans>Select login type</Trans>
            </Text>
          }

          {props.serverPing && props.ssoLogin &&
            <MediumButton title={t`SSO`} onPress={() => props.setLoginType('sso')} />
          }
          {props.serverPing && props.localLogin &&
            <MediumButton title={t`Local Login`} onPress={() => props.setLoginType('basic')} />
          }
          {props.serverPing && props.tokenLogin &&
            <MediumButton title={t`Access token`} onPress={() => props.setLoginType('token')} />
          }

        </View>
      </LinearGradient>

      <FlashMessage position="top" />
    </View>
  );
};

export default LoginType;
