import { t, Trans } from '@lingui/macro';
import { Box, Divider, HStack, VStack } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import generic from '../../assets/styles/generic';
import LinkText from '../../components/UI/CustomText/LinkText';
import MediumText from '../../components/UI/CustomText/MediumText';
import SubHeading from '../../components/UI/SubHeading/SubHeading';

const PrivacyScreen = () => (
  <ScrollView style={generic.wrap}>
    <VStack space={3} divider={<Divider />} w="90%">
      <HStack>
        <Box>
          <SubHeading text={t`Introduction`} />
          <MediumText>
            <Trans>
              We are committed to protecting your privacy and providing you with
              a safe mobile app to connect to your instance of Mahara. This
              Statement of Privacy applies to the mobile app 'Mahara Mobile' as
              provided by Catalyst.Net Limited ('Catalyst IT') on behalf of the
              Mahara community and governs data collection and usage.
            </Trans>
          </MediumText>
          <MediumText>
            <Trans>
              By using the full potential of the application, you will need to
              log into the Mahara site that you are using for your portfolio
              work. The login form for internal Mahara or LDAP accounts sits in
              the mobile app, whereas single sign-on takes you to your Mahara
              site. You may also generate an access token manually on your
              Mahara site if that feature is enabled.
            </Trans>
          </MediumText>
          <MediumText>
            <Trans>
              Your own name is displayed in the app once you are logged in, and
              you are connected to your Mahara account via an access token that
              is stored in the app as well as on Mahara itself so the two can
              communicate with each other.
            </Trans>
          </MediumText>
        </Box>
      </HStack>

      <HStack>
        <Box>
          <SubHeading text={t`How we use your personal information`} />
          <MediumText>
            <Trans>
              Neither the Mahara project nor Catalyst IT have access to any of
              the data that you enter on Mahara Mobile nor access to any data
              analytics. The institution that hosts the Mahara site to which you
              connect cannot access data in your Mahara Mobile app either. The
              institution will have a certain amount of access to data that you
              upload to the institution's Mahara site via Mahara Mobile. Please
              refer to the privacy statement on the Mahara site that you are
              using for more information.
            </Trans>
          </MediumText>
        </Box>
      </HStack>

      <HStack>
        <Box>
          <SubHeading
            text={t`Storage and security of your personal information`}
          />
          <MediumText>
            <Trans>
              We will take all reasonable steps to ensure that the connection
              between Mahara Mobile and a Mahara site you connect to is secure
              from the app perspective and that your access information is not
              disclosed. Neither the Mahara project nor Catalyst IT are
              responsible though for maintaining the Mahara site that you
              connect to or keeping your installation of Mahara Mobile up to
              date on your mobile device. It is the responsibility of the
              organisation providing the Mahara service to keep the site and its
              content secure. In order to help protect your personal
              information, please do not disclose your username, password, or
              access token to anybody or allow them to view content you are
              planning to upload to your Mahara site via Mahara Mobile.
            </Trans>
          </MediumText>
        </Box>
      </HStack>

      <HStack>
        <Box>
          <SubHeading text={t`Deleting your data`} />
          <MediumText>
            <Trans>
              Once you have uploaded data to your Mahara account, it is no
              longer stored in the app. Log into your account on the Mahara
              website you use to manage or delete uploaded data there. When you
              log out of Mahara Mobile, all content you created in the app will
              be deleted. This cannot be undone. Only files that already existed
              on your device before you added them to your Mahara Mobile queue
              for uploading to your Mahara account will still be available on
              your device unless you deleted them yourself.
            </Trans>
          </MediumText>
        </Box>
      </HStack>

      <HStack>
        <Box>
          <SubHeading text={t`Changes to this Privacy Statement`} />
          <MediumText>
            <Trans>
              We may occasionally make adjustments to our Privacy Statement to
              reflect changes to the system and in response to feedback. As
              such, we suggest you check the Privacy Statement each time you
              visit this app.
            </Trans>
          </MediumText>
        </Box>
      </HStack>

      <HStack>
        <Box>
          <SubHeading text={t`Contact`} />
          <MediumText>
            <MediumText>
              <Trans>
                If you have any questions regarding this Statement, please
              </Trans>
            </MediumText>
            <LinkText url="mailto:privacy@mahara.org" text={t`contact us.`} />
          </MediumText>
        </Box>
      </HStack>
    </VStack>
  </ScrollView>
);

export default PrivacyScreen;
