// import {MessageDescriptor} from '@lingui/core';
// import { I18n } from '@lingui/react';
import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import buttons from '../../../assets/styles/buttons';
import styles from '../../../assets/styles/variables';

type Props = {
  onPress: () => void;
  // text: MessageDescriptor;
  // accessibilityHint?: MessageDescriptor;
  text: any;
  accessibilityHint?: any;
  icon?: string;
  unbold?: boolean;
  invalid?: boolean;
  style?: any;
  dark?: boolean;
};

const MediumButtonStyles = StyleSheet.create({
  dark: {
    color: styles.colors.light,
  },
  light: {
    color: '#433113',
  },
});

const MediumButton = (props: Props) => (
  // <I18n>
  //   {({i18n}) => (
  //     <Button
  //       full
  //       light={!props.dark}
  //       dark={!!props.dark}
  //       disabled={props.invalid}
  //       iconLeft
  //       rounded
  //       info={!props.invalid}
  //       accessibilityRole="button"
  //       accessibilityLabel={i18n._(props.text)}
  //       accessibilityHint={
  //         props.accessibilityHint ? i18n._(props.accessibilityHint) : undefined
  //       }
  //       onPress={props.onPress}
  //       style={{...buttons.default, ...props.style}}>
  //       <Icon
  //         name={props.icon}
  //         style={
  //           props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light
  //         }
  //       />
  //       <Text style={props.unbold ? {} : {fontWeight: 'bold'}}>
  //         {i18n._(props.text)}
  //       </Text>
  //     </Button>
  //   )}
  // </I18n>
  <Button
    full
    light={!props.dark}
    dark={!!props.dark}
    disabled={props.invalid}
    iconLeft
    // rounded
    info={!props.invalid}
    accessibilityRole="button"
    // accessibilityLabel={i18n._(props.text)}
    // accessibilityHint={
    //   props.accessibilityHint ? i18n._(props.accessibilityHint) : undefined
    // }
    onPress={props.onPress}
    style={{ ...buttons.default, ...props.style }}>
    {/* <Icon
      name={props.icon}
      style={props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light}
    /> */}
    <Text style={props.unbold ? {} : { fontWeight: 'bold' }}>
      {/* {i18n._(props.text)} */}
      {props.text}
    </Text>
  </Button>
);

StyleSheet.create({
  disabled: {
    color: '#a9a9a9',
  },
});

export default MediumButton;
