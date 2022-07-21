// import {MessageDescriptor} from '@lingui/core';
// // import {I18n} from '@lingui/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { maharaTheme } from '../../../utils/theme';

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

const OutlineButton = (props: Props) => {
  // <I18n>
  // {({i18n}) => (

  const buttonColour = maharaTheme.colors.primary[600];
  return (
    <View>
      <Button
        colorScheme="primary"
        rounded="full"
        variant="outline"
        // marginX={variables.padding.xs}
        startIcon={
          props.icon ? (
            <FontAwesomeIcon icon={props.icon} size={20} color={buttonColour} />
          ) : undefined
        }
        light={props.light}
        _text={props.style}
        accessibilityHint={props.accessibilityHint}
        onPress={props.onPress}>
        {/* <Icon name={props.icon} /> */}
        {/* <Text>{i18n._(props.text)}</Text> */}
        <Text fontWeight={200} color={props.style?.color ?? buttonColour}>
          {props.text}
        </Text>
      </Button>
    </View>
    // )}
    // </I18n>
  );
};

export default OutlineButton;
