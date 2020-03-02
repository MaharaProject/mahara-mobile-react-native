import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import React from 'react';
import {Text, View} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';

const AboutScreen = () => {
  return (
    <View style={generic.wrap}>
      <Text>About Screen Text</Text>
    </View>
  );
};

AboutScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`About Mahara Mobile`)
});

export default AboutScreen;
