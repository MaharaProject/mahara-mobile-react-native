import React from 'react';
import { Text } from '@gluestack-ui/themed-native-base';
import { Linking, StyleSheet } from 'react-native';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';

type Props = {
  text: string;
  noEndSpace?: boolean;
  url?: string;
  onPress?: any;
  noStartSpace?: boolean;
};

const LinkTextStyles = StyleSheet.create({
  links: {
    color: styles.colors.primary,
    textDecorationLine: 'underline',
    fontSize: styles.font.md
  }
});

function LinkText(props: Props) {
  return (
    <Text>
      {props.noStartSpace ? '' : ' '}
      <Text
        style={{ ...LinkTextStyles.links, ...generic.regularText }}
        onPress={props.url ? () => Linking.openURL(props.url ?? 'mahara.org') : props.onPress}
      >
        {props.text}
      </Text>
      {props.noEndSpace ? '' : ' '}
    </Text>
  );
}

export default LinkText;
