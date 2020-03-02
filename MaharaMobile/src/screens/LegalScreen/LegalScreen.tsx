import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {Trans} from '@lingui/react';
import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/styles/variables';

const LegalScreen = () => (
  <View>
    <Text>
      <Trans>Legal Screen</Trans>
    </Text>
  </View>
);

LegalScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`Legal`)
});

export default LegalScreen;
