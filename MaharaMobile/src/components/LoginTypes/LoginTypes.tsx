import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TextInput,
  View
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
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
import textStyles from '../../assets/styles/text';
import variables from '../../assets/styles/variables';
import LinkButton from '../UI/LinkButton/LinkButton';
import MediumButton from '../UI/MediumButton/MediumButton';
import OutlineButton from '../UI/OutlineButton/OutlineButton';
import styles from './LoginTypes.style';

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
  loading: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  onSkip: () => void;
};
/**
 * LoginTypes is a dynamic component with many states
 * - a URL input field with logic and validation
 * - a list of buttons for available login types
 * - error message pop ups as well as alerts
 * @param props
 */
const LoginTypes = (props: Props) => {
  const [controlURL, setControlURL] = useState('https://');

  const [enterURLWarning, setEnterURLWarning] = useState(false);

  /**
   * Check that the entered text is valid
   * @param url
   */
  const checkUrl = (url: string) => {
    const updatedURL = url.trim();

    if (updatedURL.length === 0) {
      setEnterURLWarning(true);
      return;
    }
    setEnterURLWarning(false);
    setControlURL(updatedURL);
  };

  /**
   * Checks for valid URL by searching for https:// and /
   * @param url
   */
  const addHttpTrims = (url: string): string => {
    let result = url;
    if (url.slice(-1) !== '/') {
      result += '/';
    }

    if (!/^https?:\/\//.test(result)) {
      result = `https://${result}`;
    }
    return result;
  };

  return (
    <View style={styles.view}>
      <LinearGradient
        locations={[0, 0.7, 1]}
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

          {props.loading ? (
            <View style={styles.container}>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
            </View>
          ) : null}

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
                  enterURLWarning ? styles.errorTextInput : null
                ]}
                // placeholder={'https://yoursite.edu/'} TODO: put this back in and remove default value for go live
                defaultValue={controlURL}
                onChangeText={(url: string) => checkUrl(url)}
              />
            </View>
          ) : null}

          {enterURLWarning ? (
            <Text style={textStyles.errorText}>
              <Trans>Please enter a URL.</Trans>
            </Text>
          ) : null}

          {props.serverPing && props.isInputHidden ? (
            <View>
              <Text
                style={[headingStyles.mainHeading, styles.url, generic.center]}>
                {controlURL}
              </Text>
              <OutlineButton
                light
                text={t`Enter a different URL`}
                style={buttons.light}
                onPress={() => props.resetForm()}
              />
            </View>
          ) : null}
          {!props.isInputHidden ? (
            <View style={styles.buttonGroup}>
              <MediumButton
                text={t`Next`}
                onPress={() => props.checkServer(addHttpTrims(controlURL))}
              />
              <LinkButton text={t`Skip`} onPress={() => props.onSkip()} />
            </View>
          ) : null}
          {props.serverPing && (
            <Text style={[headingStyles.mainHeading, generic.center]}>
              <Trans>Select login type</Trans>
            </Text>
          )}

          {props.serverPing && props.ssoLogin && (
            <MediumButton
              text={t`Single sign-on`}
              onPress={() => props.setLoginType('sso')}
            />
          )}
          {props.serverPing && props.localLogin && (
            <MediumButton
              text={t`Local`}
              onPress={() => props.setLoginType('basic')}
            />
          )}
          {props.serverPing && props.tokenLogin && (
            <MediumButton
              text={t`Access token`}
              onPress={() => props.setLoginType('token')}
            />
          )}
        </View>
      </LinearGradient>

      <FlashMessage position="top" />
    </View>
  );
};

export default withI18n()(LoginTypes);
