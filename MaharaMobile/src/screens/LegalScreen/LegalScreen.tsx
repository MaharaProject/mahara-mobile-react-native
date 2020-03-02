import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';

const LegalScreen = () => (
  <ScrollView>
    <View style={generic.wrap}>
      <Text style={{fontSize: styles.font.lg}}>
        <Trans>Privacy statement</Trans>
      </Text>
      <Text style={{fontSize: styles.font.md}}>
        <Trans>Introduction</Trans>
      </Text>
      <Text>
        <Trans>
          We are committed to protecting your privacy and providing users with a
          safe and functional personal learning and development environment.
          This Statement of Privacy applies to the app Mahara Mobile as provided
          by Catalyst IT Limited and governs data collection and usage.
        </Trans>
      </Text>
      <Text />

      <Text style={{fontSize: styles.font.md}}>
        <Trans>Collection of personal information</Trans>
      </Text>
      <Text>
        <Trans>
          By using the full potential of the application, you will need to log
          into the Mahara site that you are using for your portfolio work. The
          login form for internal Mahara or LDAP accounts sits in the mobile app
          whereas single sign-on takes you to your Mahara site.
        </Trans>
      </Text>
      <Text>
        <Trans>
          Your own name is displayed in the app once you are logged in, and you
          are connected to your Mahara account via an access token that is
          stored in the app as well as on Mahara itself so the two can
          communicate with each other.
        </Trans>
      </Text>
      <Text />

      <Text style={{fontSize: styles.font.md}}>
        <Trans>How we use your personal information</Trans>
      </Text>
      <Text>
        <Trans>
          Neither the Mahara project nor Catalyst has access to any of the data
          that you enter on Mahara Mobile. The institution that hosts the Mahara
          site that you connect to cannot access data in your Mahara Mobile app
          either.
        </Trans>
      </Text>
      <Text />

      <Text style={{fontSize: styles.font.md}}>
        <Trans>Storage and security of your personal information</Trans>
      </Text>
      <Text>
        <Trans>
          We will take all reasonable steps to ensure that the connection
          between Mahara Mobile and a Mahara site you connect to is secure from
          the app perspective and that your access information is not disclosed.
          Neither the Mahara project nor Catalyst IT Limited are responsible
          though for maintaining the Mahara site that you connect to. It is the
          responsibility of the organization providing the Mahara service to
          keep the site and its content secure. In order to help protect your
          personal information, please do not disclose your username or password
          to anybody or allow them to view content you are planning to upload to
          your Mahara site via Mahara Mobile. Once content has been uploaded,
          file names, descriptions and journal titles and entries are not
          available via the app anymore. Files will still be stored in their
          original location of your app.
        </Trans>
      </Text>
      <Text />

      <Text style={{fontSize: styles.font.md}}>
        <Trans>Changes to this privacy statement</Trans>
      </Text>
      <Text>
        <Trans>
          We may occasionally make adjustments to our privacy statement to
          reflect changes to the system and in response to customer feedback. As
          such we suggest you check the Privacy Statement each time you visit
          this app.
        </Trans>
      </Text>
      <Text />

      <Text style={{fontSize: styles.font.md}}>
        <Trans>Contact</Trans>
      </Text>
      <Text>
        <Trans>
          If you have any questions regarding this Statement or believe we have
          not adhered to the above criteria, please contact us at
          https://mahara.org/contact.php and we will use all reasonable efforts
          to remedy the issue.
        </Trans>
      </Text>
    </View>
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
  headerTitle: i18n._(t`Legal`)
});

export default LegalScreen;
