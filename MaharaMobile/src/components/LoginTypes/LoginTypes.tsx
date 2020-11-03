import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React from 'react';
import {Text, View} from 'react-native';
import generic from '../../assets/styles/generic';
import headingStyles from '../../assets/styles/headings';
import MediumButton from '../UI/MediumButton/MediumButton';
import styles from './LoginTypes.style';

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
    <View style={styles.view}>
      <Text style={[headingStyles.mainHeading, generic.center]}>
        <Trans>Select login type</Trans>
      </Text>

      {props.ssoLogin && (
        <MediumButton
          text={t`Single sign-on`}
          onPress={() => props.goToLoginType('sso')}
        />
      )}
      {props.localLogin && (
        <MediumButton
          text={t`Local`}
          onPress={() => props.goToLoginType('basic')}
        />
      )}
      {props.tokenLogin && (
        <MediumButton
          text={t`Access token`}
          onPress={() => props.goToLoginType('token')}
        />
      )}
    </View>
  );
};

export default withI18n()(LoginTypes);
