import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { I18n } from '@lingui/react';
import linkButtonStyles from './LinkButton.style';
import { MessageDescriptor } from '../../../models/models';
import buttons from '../../../assets/styles/buttons';

type Props = {
  onPress: () => void;
  title: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
};

const LinkButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={i18n._(props.title)}
        accessibilityHint={i18n._(props.accessibilityHint)}
        onPress={props.onPress}>
        <Text style={[buttons.link, linkButtonStyles.buttons]}>
          {i18n._(props.title)}
        </Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default LinkButton;
