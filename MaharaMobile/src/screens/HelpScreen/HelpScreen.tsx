import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import React from 'react';
import {Text, View} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';

const HelpScreen = () => (
  <View style={generic.wrap}>
    <Text>
      <Trans>...</Trans>
    </Text>
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
