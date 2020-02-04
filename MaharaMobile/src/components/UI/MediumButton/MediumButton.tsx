import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { I18n } from '@lingui/react';
import mdButtonStyles from './MediumButton.style';
import { MessageDescriptor } from '../../../models/models';
import buttons from '../../../assets/styles/buttons';

type Props = {
  onPress: () => void;
  title: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
};

const MediumButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={i18n._(props.title)}
        accessibilityHint={i18n._(props.accessibilityHint)}
        onPress={props.onPress}>
        <Text style={[buttons.md, mdButtonStyles.buttons]}>
          {i18n._(props.title)}
        </Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default MediumButton;
