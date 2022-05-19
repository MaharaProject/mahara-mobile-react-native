// // import {t} from '@lingui/macro';
import {ListItem} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import generic from '../../assets/styles/generic';
import MediumText from '../../components/UI/CustomText/MediumText';

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

export default HelpScreen;
