import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import React from 'react';
import {View} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import MediumText from '../../components/UI/CustomText/MediumText';

const VersionScreen = () => (
  <View style={generic.wrap}>
    <MediumText>
      The current version of Mahara Mobile you are using is 20.09.01.
    </MediumText>
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
