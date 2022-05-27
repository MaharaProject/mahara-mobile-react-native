// import {MessageDescriptor} from '@lingui/core';
// // import {I18n} from '@lingui/react';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import buttons from '../../../assets/styles/buttons';
import linkButtonStyles from './LinkButton.style';
import { Text } from 'native-base';

type Props = {
  onPress: () => void;
  // text: MessageDescriptor;
  // accessibilityHint?: MessageDescriptor;
  text: any;
  accessibilityHint?: any;
};

const LinkButton = (props: Props) => (
  // <I18n>
  // {({i18n}) => (
  <TouchableOpacity
    accessibilityRole="button"
    // accessibilityLabel={i18n._(props.text)}
    accessibilityHint={
      // props.accessibilityHint ? i18n._(props.accessibilityHint) : ''
      props.accessibilityHint ? props.accessibilityHint : ''
    }
    onPress={props.onPress}>
    <Text style={[buttons.link, linkButtonStyles.buttons]}>
      {/* {i18n._(props.text)} */}
      {props.text}
    </Text>
  </TouchableOpacity>
  // )}
  // </I18n>
);

export default LinkButton;
