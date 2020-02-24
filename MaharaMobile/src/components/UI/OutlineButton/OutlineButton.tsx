import {I18n} from '@lingui/react';
import React from 'react';
import {Text, TouchableOpacity, ViewProps} from 'react-native';
import buttons from '../../../assets/styles/buttons';
import {MessageDescriptor} from '../../../models/models';
import outlineButtonStyles from './OutlineButton.style';

type Props = {
  onPress: () => void;
  title: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
  style: ViewProps;
};

const OutlineButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={i18n._(props.title)}
        accessibilityHint={i18n._(props.accessibilityHint)}
        onPress={props.onPress}>
        <Text
          style={{
            ...buttons.md,
            ...outlineButtonStyles.buttons,
            ...props.style
          }}>
          {i18n._(props.title)}
        </Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default OutlineButton;
