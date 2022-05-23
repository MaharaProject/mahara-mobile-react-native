// import {MessageDescriptor} from '@lingui/core';
import { Text } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import styles from '../../../assets/styles/variables';
// import i18n from '../../../i18n';

type Props = {
  style?: any;
  // text: MessageDescriptor;
  text: any;
  url?: string;
  onPress?: any;
  noStartSpace?: boolean;
};

const LinkText = (props: Props) => (
  <Text
    style={{
      color: styles.colors.primary,
      fontSize: styles.font.md,
      ...props.style,
    }}
    onPress={
      props.url
        ? () => Linking.openURL(props.url ?? 'mahara.org')
        : props.onPress
    }>
    {props.noStartSpace ? '' : ' '}
    {/* {i18n._(props.text)}&nbsp; */}
    {props.text}
  </Text>
);

export default LinkText;
