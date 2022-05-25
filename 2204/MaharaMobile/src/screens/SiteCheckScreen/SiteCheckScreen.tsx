// import {t, Trans} from '@lingui/macro';
import { Icon, Text, Toast, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import LogoSvg from '../../assets/images/Logo-big';
import buttons from '../../assets/styles/buttons';
import forms from '../../assets/styles/forms';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import textStyles from '../../assets/styles/text';
import styles from '../../assets/styles/variables';
import LoginTypes from '../../components/LoginTypes/LoginTypes';
import LinkButton from '../../components/UI/LinkButton/LinkButton';
// import MaharaGradient from '../../components/UI/MaharaGradient/MaharaGradient';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import { checkLoginTypes } from '../../store/actions/userArtefacts';
import {
  selectLocalLogin,
  selectSsoLogin,
  selectTokenLogin,
  selectUrl,
} from '../../store/reducers/loginInfoReducer';
import { RootState } from '../../store/reducers/rootReducer';
import { setUpGuest } from '../../utils/authHelperFunctions';
import { addHttpTrims } from '../../utils/helperFunctions';

type Props = {
  dispatch: Dispatch;
  navigation: any;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  url: string;
};

type State = {
  loginType: string;
  serverPing: boolean;
  isInputHidden: boolean;
  loading: boolean;
};

/**
 * This screen holds the URL input and verifies whether a site
 * is a Mahara site with webservices connected.
 */
const SiteCheckScreen = (props: Props) => {
  const [serverPing, setServerPing] = useState(false);
  const [isInputHidden, setIsInputHidden] = useState(false);
  const [enterURLWarning, setEnterURLWarning] = useState(false);
  const [controlURL, setControlURL] = useState('https://');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const goToLoginType = (type: string) => {
    props.navigation.navigate('LoginMethodScreen', { loginType: type });
  };

  useEffect(() => {
    if (props.tokenLogin || props.localLogin || props.ssoLogin) {
      setLoading(false);
      setServerPing(true);
      setIsInputHidden(true);
    }
  }, [props]);
  /**
   * Check that the entered text is valid
   * @param url
   */
  const onUpdateURL = (url: string) => {
    setControlURL(url);

    if (url.length === 0) {
      setEnterURLWarning(true);
      return;
    }
    setEnterURLWarning(false);
  };

  const checkServer = async (url: string) => {
    const serverUrl = url;

    if (serverUrl === 'https://' || serverUrl.length <= 8) {
      setEnterURLWarning(true);
      return;
    }

    try {
      setLoading(true);
      // checkLoginTypes does return a promise, but not obvious to IDE as it's anonymous
      await dispatch(checkLoginTypes(serverUrl));
    } catch (error) {
      Toast.show({
        text: (
          <Text
            style={{
              fontSize: styles.font.md,
              color: styles.colors.messageErrorText,
              flexDirection: 'row',
            }}>
            {/* <Icon
              style={{
                color: styles.colors.messageErrorIcon,
              }}
              name="home"
            /> */}
            &nbsp;&nbsp;{error.message}
          </Text>
        ),
        type: 'danger',
        style: {
          backgroundColor: styles.colors.messageErrorBg,
          paddingBottom: styles.padding.md,
        },
        position: 'top',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const skipLogin = () => {
    setUpGuest(props.dispatch);
  };

  return (
    <View style={generic.view}>
      {/* <MaharaGradient> */}
      <View style={{ flex: 1.2 }}>
        <LogoSvg />
      </View>

      <View style={{ flex: 0.1 }}>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color={styles.colors.light} />
          </View>
        ) : null}
      </View>

      {!isInputHidden ? (
        <View style={{ padding: 10 }}>
          <Text
            style={[
              headingStyles.subHeading1,
              textStyles.textWhite,
              textStyles.center,
            ]}>
            {/* <Trans>What is the address of your Mahara?</Trans> */}
          </Text>
          <TextInput
            keyboardType="url"
            style={[
              forms.textInput,
              enterURLWarning
                ? {
                    borderColor: styles.colors.siteCheckErrorTextPink,
                    borderWidth: 2,
                  }
                : null,
            ]}
            placeholder="https://yoursite.edu/"
            defaultValue={controlURL}
            onChangeText={(url: string) => onUpdateURL(url)}
          />
        </View>
      ) : null}

      {enterURLWarning ? (
        <Text style={textStyles.errorText}>
          {/* <Trans>Please enter a URL.</Trans> */}
          Please enter a URL
        </Text>
      ) : null}

      {serverPing && isInputHidden ? (
        <View>
          <Text style={[headingStyles.mainHeading, generic.center]}>
            {controlURL}
          </Text>
          <OutlineButton
            light
            // text={t`Enter a different URL`}
            text="Enter a different URL"
            style={buttons.light}
            onPress={() => {
              setServerPing(false);
              setIsInputHidden(false);
              setLoading(false);
            }}
          />
        </View>
      ) : null}

      {!isInputHidden ? (
        <View
          style={{
            // justifyContent: 'space-between',
            // flex: 1,
            // paddingLeft: 10,
            // paddingRight: 10,
          }}>
          <MediumButton
            // text={t`Next`}
            text="Next"
            onPress={() => {
              const url = addHttpTrims(controlURL);
              if (url !== props.url) {
                checkServer(url);
              } else {
                setServerPing(true);
                setIsInputHidden(true);
              }
            }}
          />
        </View>
      ) : null}

      {serverPing && (
        <LoginTypes
          goToLoginType={goToLoginType}
          localLogin={props.localLogin}
          ssoLogin={props.ssoLogin}
          tokenLogin={props.tokenLogin}
        />
      )}

      {/* <LinkButton text={t`Skip`} onPress={skipLogin} /> */}
      <LinkButton text="Skip" onPress={skipLogin} />
      {/* </MaharaGradient> */}
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state),
});

export default connect(mapStateToProps)(SiteCheckScreen);
