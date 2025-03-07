import React from 'react';
import { Divider, HStack, VStack } from '@gluestack-ui/themed-native-base';
import { Trans } from '@lingui/macro';
import { View } from 'react-native';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';
import MediumText from 'components/UI/CustomText/MediumText';

function HelpScreen() {
    return (
        <View style={{ ...generic.wrap, paddingLeft: styles.padding.md }}>
            <VStack space={3} divider={<Divider />} w="100%">
                <HStack>
                    <MediumText>
                        <Trans>
                            For help, contact the support team of the Mahara instance that you are
                            using. Typically, you can find a &apos;Contact us&apos; link in the
                            footer of the Mahara site to which you log in.
                        </Trans>
                    </MediumText>
                </HStack>
                <HStack>
                    <MediumText>
                        <Trans>
                            If you have general questions or want to report issues, you can do so on
                            the Mahara Mobile&apos;s GitHub &apos;Issues&apos; page.
                        </Trans>
                    </MediumText>
                </HStack>
            </VStack>
        </View>
    );
}

export default HelpScreen;
