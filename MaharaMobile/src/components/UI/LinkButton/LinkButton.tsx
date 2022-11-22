import React from 'react';
import { Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import buttons from 'assets/styles/buttons';
import linkButtonStyles from './LinkButton.style';

type Props = {
  onPress: () => void;
  text: string;
  accessibilityHint?: string;
};

function LinkButton(props: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityHint={props.accessibilityHint ? props.accessibilityHint : ''}
      onPress={props.onPress}
    >
      <Text style={[buttons.link, linkButtonStyles.buttons]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default LinkButton;
