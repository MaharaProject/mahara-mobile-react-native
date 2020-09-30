import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import styles from '../../assets/styles/variables';
import MediumText from '../../components/UI/CustomText/MediumText';

const VersionScreen = () => (
  <List>
    <ListItem noBorder>
      <MediumText text={t`This version of Mahara Mobile is 20.10.1`} />
    </ListItem>
  </List>
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
