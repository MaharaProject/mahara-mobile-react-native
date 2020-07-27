import {MessageDescriptor} from '@lingui/core';
import {I18n} from '@lingui/react';
import {Button, Icon, Text} from 'native-base';
import React from 'react';
import {View} from 'react-native';

type Props = {
  onPress: () => void;
  text?: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
  style?: any;
  icon?: string;
  light?: boolean;
};

const OutlineButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <View>
        <Button
          iconLeft
          bordered
          full
          light={props.light}
          rounded
          accessibilityRole="button"
          accessibilityLabel={i18n._(props.text)}
          accessibilityHint={props.accessibilityHint}
          onPress={props.onPress}
          // style={{ borderColor: styles.colors.green }}
        >
          <Icon name={props.icon} />
          <Text>{i18n._(props.text)}</Text>
        </Button>
      </View>
    )}
  </I18n>
);

export default OutlineButton;
