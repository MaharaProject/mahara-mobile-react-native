import {I18n} from '@lingui/react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import buttons from '../../../assets/styles/buttons';
import {MessageDescriptor} from '../../../models/models';
import mdButtonStyles from './MediumButton.style';

type Props = {
  onPress: () => void;
  title: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
};

const MediumButton = (props: Props) => (
  <I18n>
    {({ i18n }) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={i18n._(props.title)}
        accessibilityHint={
          props.accessibilityHint ? i18n._(props.accessibilityHint) : undefined
        }
        onPress={props.onPress}>
        <Text style={[buttons.md, mdButtonStyles.buttons]}>
          {i18n._(props.title)}
        </Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default MediumButton;
