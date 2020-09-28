import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import generic from '../../assets/styles/generic';
import styles from '../../assets/styles/variables';
import LinkText from '../../components/UI/CustomText/LinkText';
import MediumText from '../../components/UI/CustomText/MediumText';

const AboutScreen = () => {
  return (
    <ScrollView style={generic.wrap}>
      <List>
        <ListItem style={{flexDirection: 'column'}}>
          <MediumText>
            <MediumText
              text={t`Mahara Mobile is an open source project created by the Mahara
            Project Team. To contribute or report bugs, see our`}
            />
            <LinkText
              url="https://github.com/MaharaProject/mahara-mobile"
              text={t`Mahara Project.`}
            />
          </MediumText>
        </ListItem>
        <ListItem>
          <MediumText
            text={t`Mahara Mobile allows you to connect your mobile device to your
            Mahara site. You can create and collect your content on your mobile
            device and use the app to upload it to your Mahara site. You can any
            file available for uploading via Android and create journal entries.`}
          />
        </ListItem>
        <ListItem>
          <MediumText
            text={t`Mahara is an open source ePortfolio system designed for social
            learning. An ePortfolio is a system in which learners can record
            evidence of their learning, e.g. essays, artwork, certificates,
            reflections or other such things they produce that can be stored
            digitally.`}
          />
        </ListItem>
        <ListItem>
          <MediumText
            text={t`Mahara Mobile allows you to collect your evidence on your mobile
            device and also when you are offline. You can then upload it to
            Mahara and put into your portfolios.`}
          />
        </ListItem>
        <ListItem>
          <MediumText
            text={t`In order to push content to Mahara from Mahara Mobile, you require
            an account on a Mahara site that allows mobile uploads. Typically,
            the institution that you are affiliated with will make a Mahara
            instance available to you to use if you are working with portfolios.`}
          />
        </ListItem>
      </List>
    </ScrollView>
  );
};

AboutScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`About Mahara Mobile`)
});

export default AboutScreen;
