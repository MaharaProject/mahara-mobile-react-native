import {MessageDescriptor} from '@lingui/core';
import {Text} from 'native-base';
import React from 'react';
import {Linking} from 'react-native';
import styles from '../../../assets/styles/variables';
import i18n from '../../../i18n';

type Props = {
  style?: any;
  text: MessageDescriptor;
  url: string;
};

const LinkText = (props: Props) => (
  <Text
    style={{
      color: styles.colors.primary,
      fontSize: styles.font.md,
      ...props.style
    }}
    onPress={() => Linking.openURL(props.url ?? 'mahara.org')}>
    &nbsp; {i18n._(props.text)}&nbsp;
  </Text>
);

export default LinkText;
