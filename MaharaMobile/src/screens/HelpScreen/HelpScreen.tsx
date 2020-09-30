import {t} from '@lingui/macro';
import {ListItem, Text} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import MediumText from '../../components/UI/CustomText/MediumText';
import i18n from '../../i18n';

const HelpScreen = () => (
  <View style={generic.wrap}>
    <ListItem>
      <MediumText
        text={t`For help, contact the support team of the Mahara instance that you are
      using. Typically, you can find a 'Contact us' link in the footer
      of the Mahara site to which you log in.`}
      />
    </ListItem>
    <ListItem>
      <MediumText
        text={t`If you have general questions or want to report issues, you can do so on
      the Mahara Mobile's GitHub 'Issues' page.`}
      />
    </ListItem>
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
