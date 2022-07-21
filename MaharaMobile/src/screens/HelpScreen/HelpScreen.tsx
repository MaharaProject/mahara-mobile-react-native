// // import {t} from '@lingui/macro';
import { Divider, HStack, VStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import generic from '../../assets/styles/generic';
import MediumText from '../../components/UI/CustomText/MediumText';

const HelpScreen = () => (
  <View style={generic.wrap}>
    <VStack space={3} divider={<Divider />} w="90%">
      <HStack>
        <MediumText
          //   text={t`For help, contact the support team of the Mahara instance that you are
          // using. Typically, you can find a 'Contact us' link in the footer
          // of the Mahara site to which you log in.`}
          text="For help, contact the support team of the Mahara instance that you are
      using. Typically, you can find a 'Contact us' link in the footer
      of the Mahara site to which you log in."
        />
      </HStack>
      <HStack>
        <MediumText
          //   text={t`If you have general questions or want to report issues, you can do so on
          // the Mahara Mobile's GitHub 'Issues' page.`}
          text="If you have general questions or want to report issues, you can do so on
      the Mahara Mobile's GitHub 'Issues' page."
        />
      </HStack>
    </VStack>
  </View>
);

export default HelpScreen;
