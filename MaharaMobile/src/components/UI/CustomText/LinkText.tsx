import { Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import styles from '../../../assets/styles/variables';

type Props = {
  text: string;
  noEndSpace?: boolean;
  style?: any;
  url?: string;
  onPress?: any;
  noStartSpace?: boolean;
};

const LinkText = (props: Props) => (
  <Text>
    {props.noStartSpace ? '' : ' '}
    <Text
      style={[LinkTextStyles.links, props.style]}
      onPress={
        props.url
          ? () => Linking.openURL(props.url ?? 'mahara.org')
          : props.onPress
      }>
      {props.text}
    </Text>
    {props.noEndSpace ? '' : ' '}
  </Text>
);

const LinkTextStyles = StyleSheet.create({
  links: {
    color: styles.colors.primary,
    textDecorationLine: 'underline',
    fontSize: styles.font.md,
  },
});

export default LinkText;
