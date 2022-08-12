import React from 'react';
import { Trans } from '@lingui/macro';
import { Divider, HStack, VStack } from 'native-base';
import { View } from 'react-native';
import generic from 'assets/styles/generic';
import MediumText from 'components/UI/CustomText/MediumText';

function HelpScreen() {
  return (
    <View style={generic.wrap}>
      <VStack space={3} divider={<Divider />} w="90%">
        <HStack>
          <MediumText>
            <Trans>
              For help, contact the support team of the Mahara instance that you are using.
              Typically, you can find a &apos;Contact us&apos; link in the footer of the Mahara site
              to which you log in.
            </Trans>
          </MediumText>
        </HStack>
        <HStack>
          <MediumText>
            <Trans>
              If you have general questions or want to report issues, you can do so on the Mahara
              Mobile&apos;s GitHub &apos;Issues&apos; page.
            </Trans>
          </MediumText>
        </HStack>
      </VStack>
    </View>
  );
}

export default HelpScreen;
