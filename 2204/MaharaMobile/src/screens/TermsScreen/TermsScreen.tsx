// // import {t} from '@lingui/macro';
// import { t } from '@lingui/macro';
import { Box, Divider, Flex, HStack, Link, VStack } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import LinkText from '../../components/UI/CustomText/LinkText';
import MediumText from '../../components/UI/CustomText/MediumText';
import SubHeading from '../../components/UI/SubHeading/SubHeading';

type Props = {
  navigation: { navigate: (arg0: string) => any };
};

const TermsScreen = (props: Props) => {
  return (
    <ScrollView style={{ ...generic.wrap, paddingLeft: styles.padding.md }}>
      <VStack space={3} divider={<Divider />} w="100%">
        <HStack>
          <Box>
            <SubHeading
              text="Introduction"
              // text={t`Introduction`}
            />
            <MediumText
              text="This document constitutes a binding agreement between the
            provider of Mahara Mobile – Catalyst.Net Limited – and yourself.
            The terms and conditions contained in this document govern your use
            of Mahara Mobile."
            />

            <MediumText
              childrenFirst
              // text={t`forms part of these terms and conditions and is hereby incorporated by reference.`}
              text="forms part of these terms and conditions and is hereby incorporated by reference. ">
              <LinkText
                noStartSpace
                onPress={() => props.navigation.navigate('Privacy')}
                // text={t`The Privacy Statement`}
                text="The Privacy Statement"
              />
            </MediumText>
          </Box>
        </HStack>

        <HStack>
          <Box>
            <SubHeading
              text="Purpose of Mahara Mobile"
              // text={t`Purpose of Mahara Mobile`}
            />
            <MediumText
              text="Mahara Mobile allows you to upload content from your mobile
           device into the Mahara site that you are using without needing to
           go to the Mahara site itself. It is a more convenient way to record
           and upload images, video, and audio files. It also allows you to
           create journal entries."
              // text={t`Mahara Mobile allows you to upload content from your mobile
              // device into the Mahara site that you are using without needing to
              // go to the Mahara site itself. It is a more convenient way to record
              // and upload images, video, and audio files. It also allows you to
              // create journal entries.`}
            />
          </Box>
        </HStack>

        <HStack>
          <Box>
            <SubHeading
              text="Our obligations"
              // text={t`Our obligations`}
            />
            <MediumText
              text="We provide a secure environment that allows you to upload
            your content to any Mahara site to which you decide to connect."
              // text={t`We provide a secure environment that allows you to upload
              // your content to any Mahara site to which you decide to connect.`}
            />
          </Box>
        </HStack>

        <HStack>
          <Box>
            <SubHeading
              // text={t`Your obligations`}
              text="Your obligations"
            />
            <MediumText
              text="You must meet the minimum age requirements of the Mahara
            site to which you want to connect."
              // text={t`You must meet the minimum age requirements of the Mahara
              // site to which you want to connect.`}
            />
            <MediumText
              text="All files and content you upload to a Mahara site are
          subject to copyright law. You are responsible for ensuring you have
          appropriate permission to reproduce and publish any work that is
          not your own."
              // text={t`All files and content you upload to a Mahara site are
              // subject to copyright law. You are responsible for ensuring you have
              // appropriate permission to reproduce and publish any work that is
              // not your own.`}
            />
          </Box>
        </HStack>

        {/* style={{fontSize: styles.font.md}} */}
        <HStack>
          <Box>
            <SubHeading
              text="Liability"
              //  text={t`Liability`}
            />
            <MediumText
              text="To the maximum extent permitted by law, we will
           not be liable to you for any direct, indirect or consequential loss
           or damages (including but not limited to loss of business profits,
           business interruption, loss of business information, data, goodwill
           or other non-pecuniary loss) arising out of or in connection with
           this agreement or the provision of the website, whether arising from
           negligence, breach of contract or otherwise."
            />
            {/* //   text={t`To the maximum extent permitted by law, we will
          // not be liable to you for any direct, indirect or consequential loss
          // or damages (including but not limited to loss of business profits,
          // business interruption, loss of business information, data, goodwill
          // or other non-pecuniary loss) arising out of or in connection with
          // this agreement or the provision of the website, whether arising from
          // negligence, breach of contract or otherwise.`}
          // /> */}
            <MediumText
              text="Our maximum aggregate liability for all lawfully
          limitable claims under or in connection with this agreement (whether
          arising from negligence, breach of contract or otherwise) will be
          NZ$0."
              //   text={t`Our maximum aggregate liability for all lawfully
              // limitable claims under or in connection with this agreement (whether
              // arising from negligence, breach of contract or otherwise) will be
              // NZ$0.`}
            />
            <MediumText
              text="You agree to defend, indemnify and save us, our
          affiliated and subsidiary corporations, our officers, directors,
          employees, agents, successors, shareholders and assigns harm from and
          against all liability, loss, expense, fines, penalties, or damages
          (including legal costs) to the extent that such claim arises out of
          or is in any way connected with the non-performance or breach of any
          obligation imposed on you by this agreement or other general laws and
          obligations or by reason of and to the extent of your fraud,
          negligence or wilful misconduct or that of or any of your agents or
          employees."
              //   text={t`You agree to defend, indemnify and save us, our
              // affiliated and subsidiary corporations, our officers, directors,
              // employees, agents, successors, shareholders and assigns harm from and
              // against all liability, loss, expense, fines, penalties, or damages
              // (including legal costs) to the extent that such claim arises out of
              // or is in any way connected with the non-performance or breach of any
              // obligation imposed on you by this agreement or other general laws and
              // obligations or by reason of and to the extent of your fraud,
              // negligence or wilful misconduct or that of or any of your agents or
              // employees.`}
            />
            <MediumText
              text="We make no representations and give no
          warranties, guarantees or undertakings concerning our provision or
          administration of the mobile app, or your use thereof, except as
          expressly set out in this agreement. Other warranties, express or
          implied, by statute or otherwise (including but not limited to the
          warranties of merchantability, fitness for a particular purpose, and
          satisfactory quality) are excluded from this agreement. It is
          intended that this clause will apply only to the maximum extent
          permitted by law: the clause is not intended to exclude the
          application of the New Zealand Consumer Guarantees Act 1993 or
          similar law where we are providing services to consumers."
              //   text={t`We make no representations and give no
              // warranties, guarantees or undertakings concerning our provision or
              // administration of the mobile app, or your use thereof, except as
              // expressly set out in this agreement. Other warranties, express or
              // implied, by statute or otherwise (including but not limited to the
              // warranties of merchantability, fitness for a particular purpose, and
              // satisfactory quality) are excluded from this agreement. It is
              // intended that this clause will apply only to the maximum extent
              // permitted by law: the clause is not intended to exclude the
              // application of the New Zealand Consumer Guarantees Act 1993 or
              // similar law where we are providing services to consumers.`}
            />
          </Box>
        </HStack>

        <HStack>
          <Box>
            <SubHeading
              text="Governing Law"
              //  text={t`Governing Law`}
            />
            <MediumText
              text="These Terms and Conditions are governed by the
          laws of New Zealand (excluding its conflict of laws rules), and the
          courts of New Zealand shall have exclusive jurisdiction to hear
          and determine any claim arising them."
              //   text={t`These Terms and Conditions are governed by the
              // laws of New Zealand (excluding its conflict of laws rules), and the
              // courts of New Zealand shall have exclusive jurisdiction to hear
              // and determine any claim arising them.`}
            />
          </Box>
        </HStack>

        <HStack>
          <Box>
            <SubHeading
              text="Changes to these Terms and Conditions"
              // text={t`Changes to these Terms and Conditions`}
            />
            <MediumText
              text="We may occasionally make adjustments to our Terms and
          Conditions to reflect changes to the system and in response to
          feedback. As such, we suggest you check the Terms and Conditions
          each time you visit this app."
              //   text={t`We may occasionally make adjustments to our Terms and
              // Conditions to reflect changes to the system and in response to
              // feedback. As such, we suggest you check the Terms and Conditions
              // each time you visit this app.`}
            />
          </Box>
        </HStack>

        <HStack>
          <Box>
            <SubHeading
              text="Contact"
              // text={t`Contact`}
            />
            <MediumText text={undefined}>
              <MediumText
                // text={t`If you have any questions regarding these terms and
                // conditions, please `}
                text="If you have any questions regarding these terms and conditions, please"
              />

              <LinkText
                url="https://mahara.org/contact.php"
                text="contact us."
                // text={t`contact us.`}
              />
            </MediumText>
          </Box>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default TermsScreen;
