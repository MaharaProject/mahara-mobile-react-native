// import {MessageDescriptor} from '@lingui/core';
// import { I18n } from '@lingui/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Icon, Text, theme } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import buttons from '../../../assets/styles/buttons';
import variables from '../../../assets/styles/variables';
import styles from '../../../assets/styles/variables';
import { ICON_SIZE } from '../../../utils/constants';
import { maharaTheme } from '../../../utils/theme';

type Props = {
  onPress: () => void;
  // text: MessageDescriptor;
  // accessibilityHint?: MessageDescriptor;
  text: any;
  accessibilityHint?: any;
  icon?: IconDefinition;
  unbold?: boolean;
  invalid?: boolean;
  style?: any;
  dark?: boolean;
  children?: any;
  colorScheme?: string;
  fontWeight?: string;
};

const MediumButtonStyles = StyleSheet.create({
  dark: {
    color: styles.colors.light,
  },
  light: {
    borderRadius: 5,
    color: variables.colors.browner,
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
    rounded="full"
    colorScheme={props.colorScheme ? props.colorScheme : 'secondary'}
    // colorScheme={props.invalid ? 'info' : 'secondary'}
    // style={[
    //   props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light,
    //   props.style,
    // ]}
    startIcon={
      <FontAwesomeIcon
        // color={maharaTheme.colors.green}
        icon={props.icon}
        size={ICON_SIZE}
        style={props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light}
      />
    }
    accessibilityRole="button"
    isDisabled={props.invalid}
    onPress={props.onPress}>
    <Text
      color={props.dark ? variables.colors.light : variables.colors.browner}
      fontWeight={props.fontWeight ? props.fontWeight : '500'}>
      {props.children}
      {props.text}
    </Text>
  </Button>
);
// <Button
//   full
//   light={!props.dark}
//   dark={!!props.dark}
//   disabled={props.invalid}
//   iconLeft
//   info={!props.invalid}
//   accessibilityRole="button"
//   // accessibilityLabel={i18n._(props.text)}
//   // accessibilityHint={
//   //   props.accessibilityHint ? i18n._(props.accessibilityHint) : undefined
//   // }
//   onPress={props.onPress}
//   // style={{ ...buttons.default, ...props.style }}
// >
//   <FontAwesomeIcon icon={props.icon} size={25} />
//   {/* <Icon
//     name={props.icon}
//     style={props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light}
//   /> */}
//   {/* <Text style={props.unbold ? {} : { fontWeight: 'bold' }}> */}
//   {/* {i18n._(props.text)} */}
//   {props.text}
//   {/* </Text> */}
// </Button>

StyleSheet.create({
  disabled: {
    color: '#a9a9a9',
  },
});

export default MediumButton;
