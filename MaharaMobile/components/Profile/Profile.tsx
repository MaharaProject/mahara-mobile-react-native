import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Profile.style';
import { Trans } from '@lingui/react';

type Props = {
  name: string;
  profileIcon: string;
};

const Profile = (props: Props) => {
  const image: any = require('../../assets/images/no_userphoto.png');
  return (
    <View style={styles.view}>
      <View>
        <Image
          source={props.profileIcon ? { uri: props.profileIcon } : image}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.name}>
          <Trans>Hi</Trans> {props.name ? props.name : 'Guest'}
        </Text>
      </View>
    </View>
  );
};

export default Profile;
