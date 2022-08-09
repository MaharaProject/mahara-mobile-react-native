import React from 'react';
import { TouchableOpacity } from 'react-native';
import buttons from '../../../assets/styles/buttons';
import linkButtonStyles from './LinkButton.style';
import { Text } from 'native-base';

type Props = {
  onPress: () => void;
  text: string;
  accessibilityHint?: string;
};

const LinkButton = (props: Props) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityHint={props.accessibilityHint ? props.accessibilityHint : ''}
    onPress={props.onPress}>
    <Text style={[buttons.link, linkButtonStyles.buttons]}>{props.text}</Text>
  </TouchableOpacity>
);

export default LinkButton;
