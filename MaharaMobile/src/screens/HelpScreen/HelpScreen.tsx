import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import React from 'react';
import {View} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import MediumText from '../../components/UI/CustomText/MediumText';

const HelpScreen = () => (
  <View style={generic.wrap}>
    <MediumText>
      For help, contact the support team of the Mahara instance that you are
      using. Typically, you can find a &apos;Contact us&apos; link in the footer
      of the Mahara site to which you log in.
    </MediumText>

    <MediumText>
      If you have general questions or want to report issues, you can do so on
      the Mahara Mobile&apos;s GitHub &apos;Issues&apos; page.
    </MediumText>
  </View>
);

HelpScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`Help`)
});

export default HelpScreen;
