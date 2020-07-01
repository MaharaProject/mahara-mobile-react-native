import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import React from 'react';
import {Text, View} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';

const VersionScreen = () => (
  <View style={generic.wrap}>
    <Text>
      <Trans>The current version you are using is 20.07.01</Trans>
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
