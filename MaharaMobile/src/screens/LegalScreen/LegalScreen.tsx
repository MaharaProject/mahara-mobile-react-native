import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {Body, List, ListItem, Text} from 'native-base';
import React from 'react';
import {Linking, ScrollView} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import LinkText from '../../components/UI/CustomText/LinkText';
import MediumText from '../../components/UI/CustomText/MediumText';
import SubHeading from '../../components/UI/SubHeading/SubHeading';

const LegalScreen = () => (
  <ScrollView style={generic.wrap}>
    <List>
      <ListItem>
        <Body>
          <SubHeading text="Introduction" />
          <MediumText>
            We are committed to protecting your privacy and providing you with a
            safe and functional personal learning and development environment.
            This Statement of Privacy applies to the app &apos;Mahara Mobile
            &apos; as provided by Catalyst IT on behalf of the Mahara community
            and governs data collection and usage.
          </MediumText>
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text="Collection of personal information" />
          <MediumText>
            By using the full potential of the application, you will need to log
            into the Mahara site that you are using for your portfolio work. The
            login form for internal Mahara or LDAP accounts sits in the mobile
            app whereas single sign-on takes you to your Mahara site.
          </MediumText>

          <MediumText>
            Your own name is displayed in the app once you are logged in, and
            you are connected to your Mahara account via an access token that is
            stored in the app as well as on Mahara itself so the two can
            communicate with each other.
          </MediumText>
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text="How we use your personal information" />
          <MediumText>
            Neither the Mahara project nor Catalyst have access to any of the
            data that you enter on Mahara Mobile. The institution that hosts the
            Mahara site that you connect to cannot access data in your Mahara
            Mobile app either.
          </MediumText>
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text="Storage and security of your personal information" />
          <MediumText>
            We will take all reasonable steps to ensure that the connection
            between Mahara Mobile and a Mahara site you connect to is secure
            from the app perspective and that your access information is not
            disclosed. Neither the Mahara project nor Catalyst IT are
            responsible though for maintaining the Mahara site that you connect
            to or keeping your installation of Mahara Mobile up to dateo on your
            mobile device. It is the responsibility of the organization
            providing the Mahara service to keep the site and its content
            secure. In order to help protect your personal information, please
            do not disclose your username or password to anybody or allow them
            to view content you are planning to upload to your Mahara site via
            Mahara Mobile. Once content has been uploaded, file names,
            descriptions, and journal entries are not available via the app
            anymore. Images and videos will still be stored in their original
            location on your device. Audio recordings are not stored outside of
            Mahara Mobile.
          </MediumText>
        </Body>
      </ListItem>

      {/* style={{fontSize: styles.font.md}} */}
      <ListItem>
        <Body>
          <SubHeading text="Changes to this Privacy Statement" />
          <MediumText>
            We may occasionally make adjustments to our Privacy Statement to
            reflect changes to the system and in response to feedback. As such
            we suggest you check the Privacy Statement each time you visit this
            app.
          </MediumText>
        </Body>
      </ListItem>

      <ListItem>
        <Body>
          <SubHeading text="Contact" />
          <MediumText pureText={false}>
            <MediumText>
              If you have any questions regarding this Statement or believe we
              have not adhered to the above criteria, please
            </MediumText>
            <LinkText url="https://mahara.org/contact.php" text="contact us" />
            and we will use all reasonable efforts to remedy the issue.
          </MediumText>
        </Body>
      </ListItem>
    </List>
  </ScrollView>
);

LegalScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`Legal - Privacy statement`)
});

export default LegalScreen;
