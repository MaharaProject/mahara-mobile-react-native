import React, { useEffect, useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
  VStack,
  View,
  useToast
} from '@gluestack-ui/themed-native-base';
import { Trans, t } from '@lingui/macro';
import { ActivityIndicator, Platform } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import generic from 'assets/styles/generic';
import headingStyles from 'assets/styles/headings';
import textStyles from 'assets/styles/text';
import styles from 'assets/styles/variables';
import LoginTypes from 'components/LoginTypes/LoginTypes';
import LogoView from 'components/LogoView/LogoView';
import LinkButton from 'components/UI/LinkButton/LinkButton';
import MediumButton from 'components/UI/MediumButton/MediumButton';
import MediumButtonDark from 'components/UI/MediumButtonDark/MediumButtonDark';
import OutlineButton from 'components/UI/OutlineButton/OutlineButton';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import SubHeadingColon from 'components/UI/SubHeadingColon/SubHeadingColon';
import SubHeadingNoColon from 'components/UI/SubHeadingNoColon/SubHeadingNoColon';
import { checkLoginTypes } from 'store/actions/userArtefacts';
import {
  selectLocalLogin,
  selectSsoLogin,
  selectTokenLogin,
  selectUrl
} from 'store/reducers/loginInfoReducer';
import { RootState } from 'store/reducers/rootReducer';
import { setUpGuest } from 'utils/authHelperFunctions';
import { getErrorMessage } from 'utils/error';
import { addHttpTrims } from 'utils/helperFunctions';

type Props = {
  dispatch: Dispatch;
  navigation: any;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
  url: string;
};

/**
 * This screen holds the URL input and verifies whether a site
 * is a Mahara site with webservices connected.
 */
function SiteCheckScreen(props: Props) {
  const toast = useToast();

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
      await checkLoginTypes(serverUrl)(dispatch);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.show({
        render: ({ id }) => (
          <Alert mx={2} status="error" variant="left-accent">
            <VStack>
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text w="100%" fontWeight="medium">{t`Connection error`}</Text>
                <IconButton
                  icon={<CloseIcon size="4" />}
                  onPress={() => toast.close(id)}
                  colorScheme="red"
                  ml="auto"
                />
              </HStack>
              <Text>{message}</Text>
            </VStack>
          </Alert>
        )
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
            fontSize="lg"
            style={[headingStyles.subHeading1, textStyles.textWhite, textStyles.center]}
          >
            <Trans>What is the address of your Mahara?</Trans>
          </Text>

          <Input
            type="text"
            style={{ ...generic.maharaText }}
            keyboardType={Platform.OS === 'ios' ? 'url' : 'default'}
            autoCapitalize="none"
            onChangeText={onUpdateURL}
            backgroundColor="#FFF"
            fontSize="md"
            variant="filled"
            placeholder="yoursite.edu/"
            defaultValue={controlURL}
            value={controlURL}
          />
        </View>
      ) : null}

      {enterURLWarning ? (
        <Text style={textStyles.errorText}>
          <Trans>Please enter a URL.</Trans>
        </Text>
      ) : null}

      {serverPing && isInputHidden ? (
        <View>
          <SubHeadingNoColon
            style={{ textAlign: 'center', color: styles.colors.light }}
            text={controlURL}
          />
          <OutlineButton
            light
            text={t`Enter a different URL`}
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
        <View
          style={{
            marginTop: styles.padding.sm
          }}
        >
          <MediumButtonDark
            text={t`Next`}
            icon={faArrowRight}
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

      <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <LinkButton text={t`Skip`} onPress={skipLogin} />
      </View>
    </LogoView>
  );
}

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state)
});

export default connect(mapStateToProps)(SiteCheckScreen);
