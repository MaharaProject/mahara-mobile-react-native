// import {t, Trans} from '@lingui/macro';
// import {withI18n} from '@lingui/react';
import {
  faAsterisk,
  faCoins,
  faKey,
  faMonument,
  faSign,
  faSignInAlt,
  faSortNumericDown,
  faTag,
  faTags,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles/variables';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import MediumButton from '../UI/MediumButton/MediumButton';
import { Stack, VStack } from 'native-base';
import SubHeading from '../UI/SubHeading/SubHeading';

type Props = {
  goToLoginType: Function;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
};
/**
 * LoginTypes is a dynamic component with many states
 * - a URL input field with logic and validation
 * - a list of buttons for available login types
 * @param props
 */
const LoginTypes = (props: Props) => {
  // https://yoursite.edu/

  return (
    <View
      style={{
        ...generic.view,
        padding: styles.padding.sm,
        flexGrow: 1,
      }}>
      <Stack direction="column" mb="2.5" mt="1.5" space={3}>
        <SubHeading
          noColon
          text="Select login type"
          style={{ color: styles.colors.light, textAlign: 'center' }}
          /* <Trans>Select login type</Trans> */
        />
        {props.ssoLogin && (
          <MediumButton
            // text={t`Single sign-on`}
            icon={faKey}
            text="Single sign-on"
            onPress={() => props.goToLoginType('sso')}
          />
        )}
        {props.localLogin && (
          <MediumButton
            // text={t`Local`}
            icon={faSignInAlt}
            text="Local"
            onPress={() => props.goToLoginType('basic')}
          />
        )}
        {props.tokenLogin && (
          <MediumButton
            // text={t`Access token`}
            icon={faTags}
            text="Access token"
            onPress={() => props.goToLoginType('token')}
          />
        )}
      </Stack>
    </View>
  );
};

// export default withI18n()(LoginTypes);
export default LoginTypes;
