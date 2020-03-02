import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {Trans} from '@lingui/react';
import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/styles/variables';

const VersionScreen = () => (
  <View>
    <Text>
      <Trans>Version Screen</Trans>
    </Text>
  </View>
);

VersionScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`App Version`)
});

export default VersionScreen;
