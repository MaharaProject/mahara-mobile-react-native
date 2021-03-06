import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import generic from '../../assets/styles/generic';
import LinkText from '../../components/UI/CustomText/LinkText';
import MediumText from '../../components/UI/CustomText/MediumText';

const AboutScreen = () => {
  return (
    <ScrollView style={generic.wrap}>
      <List>
        <ListItem style={{flexDirection: 'column'}}>
          <MediumText>
            <MediumText
              text={t`Mahara Mobile is an open source project created by the
                Mahara Project Team. To contribute or report bugs, see our`}
            />
            <LinkText
              url="https://github.com/MaharaProject/mahara-mobile-react-native/"
              text={t`Mahara Mobile`}
            />
            <MediumText text={t`repository on GitHub.`} />
          </MediumText>
        </ListItem>
        <ListItem>
          <MediumText
            text={t`Mahara Mobile allows you to connect your mobile device to
              your Mahara site. You can create and collect your content on your
              mobile device and use the app to upload it to your Mahara site.
              You can upload any files that your device allows you to upload
              and create journal entries.`}
          />
        </ListItem>
        <ListItem>
          <MediumText
            text={t`Mahara is an open source ePortfolio platform designed for
              reflecing on what you have learned and for supporting social
              learning. An ePortfolio is a tool and method to record your
              evidence of their learning, e.g. essays, artwork, and
              certificates, and reflect on them to learn from your experiences
              . You can also engage in conversations with others and create
              group portfolios.`}
          />
        </ListItem>
        <ListItem>
          <MediumText
            text={t`Mahara Mobile allows you to collect your evidence on your
              mobile device, including when you are offline. You can then
              upload your photos, videos, journal entries, etc. to your Mahara
              instance and add them your portfolios.`}
          />
        </ListItem>
        <ListItem>
          <MediumText
            text={t`In order to push content to Mahara from Mahara Mobile, you
              require an account on a Mahara site that allows mobile uploads.
              Typically, the institution that you are affiliated with will make
              a Mahara site available to you to use if you are working with
              portfolios.`}
          />
        </ListItem>
      </List>
    </ScrollView>
  );
};

export default AboutScreen;
