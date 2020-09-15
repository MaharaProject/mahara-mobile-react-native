import {Trans} from '@lingui/macro';
import {Text} from 'native-base';
import React from 'react';
import {Linking} from 'react-native';
import styles from '../../../assets/styles/variables';

type Props = {
  style?: any;
  text: string;
  url: string;
};

const LinkText = (props: Props) => (
  <Trans>
    <Text> </Text>
    <Text
      key=""
      style={{
        color: styles.colors.primary,
        fontSize: styles.font.md,
        ...props.style
      }}
      onPress={() => Linking.openURL(props.url ?? 'mahara.org')}>
      &nbsp; {props.text}
    </Text>
  </Trans>
);

export default LinkText;
