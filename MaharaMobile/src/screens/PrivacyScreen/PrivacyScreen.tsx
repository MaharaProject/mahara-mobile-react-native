import {t} from '@lingui/macro';
import {Body, List, ListItem} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import generic from '../../assets/styles/generic';
import LinkText from '../../components/UI/CustomText/LinkText';
import MediumText from '../../components/UI/CustomText/MediumText';
import SubHeading from '../../components/UI/SubHeading/SubHeading';

const PrivacyScreen = () => (
  <ScrollView style={generic.wrap}>
    <List>
      <ListItem>
        <Body>
          <SubHeading text={t`Introduction`} />
          <MediumText
            text={t`We are committed to protecting your privacy and providing
              you with a safe mobile app to connect to your instance of Mahara.
              This Statement of Privacy applies to the mobile app 'Mahara
              Mobile' as provided by Catalyst.Net Limited ('Catalyst IT') on
              behalf of the Mahara community and governs data collection and
              usage.`}
          />
          <MediumText
            text={t`By using the full potential of the application, you will
              need to log into the Mahara site that you are using for your
              portfolio work. The login form for internal Mahara or LDAP
              accounts sits in the mobile app, whereas single sign-on takes you
              to your Mahara site. You may also generate an access token
              manually on your Mahara site if that feature is enabled.`}
          />
          <MediumText
            text={t`Your own name is displayed in the app once you are logged
              in, and you are connected to your Mahara account via an access
              token that is stored in the app as well as on Mahara itself so
              the two can communicate with each other. `}
          />
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text={t`How we use your personal information`} />
          <MediumText
            text={t`Neither the Mahara project nor Catalyst IT have access to
              any of the data that you enter on Mahara Mobile nor access to any
              data analytics. The institution that hosts the Mahara site to
              which you connect cannot access data in your Mahara Mobile app
              either. The institution will have a certain amount of access to
              data that you upload to the institution's Mahara site via Mahara
              Mobile. Please refer to the privacy statement on the Mahara site
              that you are using for more information.`}
          />
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading
            text={t`Storage and security of your personal
            information`}
          />
          <MediumText
            text={t`We will take all reasonable steps to ensure that the
              connection between Mahara Mobile and a Mahara site you connect to
              is secure from the app perspective and that your access
              information is not disclosed. Neither the Mahara project nor
              Catalyst IT are responsible though for maintaining the Mahara
              site that you connect to or keeping your installation of Mahara
              Mobile up to date on your mobile device. It is the responsibility
              of the organisation providing the Mahara service to keep the site
              and its content secure. In order to help protect your personal
              information, please do not disclose your username, password, or
              access token to anybody or allow them to view content you are
              planning to upload to your Mahara site via Mahara Mobile. Once
              content has been uploaded, file names, descriptions, and journal
              entries are not available via the app anymore. Images and videos
              will still be stored in their original location on your device.
              Audio recordings are not stored outside of Mahara Mobile.`}
          />
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text={t`Changes to this Privacy Statement`} />
          <MediumText
            text={t`We may occasionally make adjustments to our Privacy
              Statement to reflect changes to the system and in response to
              feedback. As such, we suggest you check the Privacy Statement
              each time you visit this app.`}
          />
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text={t`Contact`} />
          <MediumText>
            <MediumText
              text={t`If you have any questions regarding this Statement,
                please`}
            />
            <LinkText url="mailto:privacy@mahara.org" text={t`contact us.`} />
          </MediumText>
        </Body>
      </ListItem>
    </List>
  </ScrollView>
);

export default PrivacyScreen;
