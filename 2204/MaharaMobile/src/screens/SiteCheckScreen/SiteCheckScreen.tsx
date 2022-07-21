// import {t, Trans} from '@lingui/macro';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Toast,
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import headingStyles from '../../assets/styles/headings';
import textStyles from '../../assets/styles/text';
import styles from '../../assets/styles/variables';
import LoginTypes from '../../components/LoginTypes/LoginTypes';
import LogoView from '../../components/LogoView/LogoView';
import LinkButton from '../../components/UI/LinkButton/LinkButton';
// import MaharaGradient from '../../components/UI/MaharaGradient/MaharaGradient';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import SubHeading from '../../components/UI/SubHeading/SubHeading';
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
  const [controlURL, setControlURL] = useState('');
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
    <LogoView>
      {loading ? (
        <View>
          <ActivityIndicator size="small" color={styles.colors.light} />
        </View>
      ) : null}

      {!isInputHidden ? (
        <View style={{ padding: 10 }}>
          <Text
            style={[
              headingStyles.subHeading1,
              textStyles.textWhite,
              textStyles.center,
            ]}>
            {/* <Trans> */}
            What is the address of your Mahara?
            {/* </Trans> */}
          </Text>
          <InputGroup>
            <InputLeftAddon children={'https://'} />
            <Input
              autoCapitalize="none"
              onChangeText={onUpdateURL}
              backgroundColor={'#FFF'}
              fontSize={styles.font.sm}
              variant="filled"
              w={{
                base: '80%',
              }}
              placeholder="yoursite.edu/"
              defaultValue={controlURL}
              value={controlURL}
            />
          </InputGroup>
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
          <SubHeading
            style={{ textAlign: 'center', color: styles.colors.light }}
            text={controlURL}
            noColon
          />
          <OutlineButton
            light
            // text={t`Enter a different URL`}
            text="Enter a different URL"
            style={{ color: styles.colors.light }}
            onPress={() => {
              setServerPing(false);
              setIsInputHidden(false);
              setLoading(false);
            }}
          />
        </View>
      ) : null}

      {!isInputHidden ? (
        <View style={{ marginTop: styles.padding.sm }}>
          <MediumButton
            // text={t`Next`}
            icon={faArrowRight}
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
      <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <LinkButton text="Skip" onPress={skipLogin} />
      </View>
      {/* </MaharaGradient> */}
    </LogoView>
  );
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state),
});

export default connect(mapStateToProps)(SiteCheckScreen);
