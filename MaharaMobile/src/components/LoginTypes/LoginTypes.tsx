import { t } from '@lingui/macro';
import { faKey, faSignInAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { View } from 'react-native';
import styles from '../../assets/styles/variables';
import generic from '../../assets/styles/generic';
import MediumButton from '../UI/MediumButton/MediumButton';
import { Stack } from 'native-base';
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
          text={t`Select login type`}
          style={{ color: styles.colors.light, textAlign: 'center' }}
        />
        {props.ssoLogin && (
          <MediumButton
            text={t`Single sign-on`}
            icon={faKey}
            onPress={() => props.goToLoginType('sso')}
          />
        )}
        {props.localLogin && (
          <MediumButton
            text={t`Local`}
            icon={faSignInAlt}
            onPress={() => props.goToLoginType('basic')}
          />
        )}
        {props.tokenLogin && (
          <MediumButton
            text={t`Access token`}
            icon={faTags}
            onPress={() => props.goToLoginType('token')}
          />
        )}
      </Stack>
    </View>
  );
};

export default LoginTypes;
