// import {MessageDescriptor} from '@lingui/core';
// // import {I18n} from '@lingui/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';

type Props = {
  onPress: () => void;
  // text: MessageDescriptor;
  // accessibilityHint?: MessageDescriptor;
  text: any;
  accessibilityHint?: any;
  style?: any;
  icon?: IconDefinition;
  light?: boolean;
};

const OutlineButton = (props: Props) => (
  // <I18n>
  // {({i18n}) => (
  <View>
    <Button
      variant="outline"
      startIcon={<FontAwesomeIcon icon={props.icon} size={20} />}
      // bordered
      // full
      light={props.light}
      // rounded
      _text={props.style}
      // accessibilityLabel={i18n._(props.text)}
      accessibilityHint={props.accessibilityHint}
      onPress={props.onPress}>
      {/* <Icon name={props.icon} /> */}
      {/* <Text>{i18n._(props.text)}</Text> */}
      <Text>{props.text}</Text>
    </Button>
  </View>
  // )}
  // </I18n>
);

export default OutlineButton;
