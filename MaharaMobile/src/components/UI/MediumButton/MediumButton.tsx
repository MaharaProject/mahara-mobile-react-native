import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import variables from '../../../assets/styles/variables';
import styles from '../../../assets/styles/variables';
import { ICON_SIZE } from '../../../utils/constants';

type Props = {
  onPress: () => void;
  text: string;
  accessibilityHint?: string;
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
  <Button
    rounded="full"
    colorScheme={props.colorScheme ? props.colorScheme : 'secondary'}
    // colorScheme={props.invalid ? 'info' : 'secondary'}
    // style={[
    //   props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light,
    //   props.style,
    // ]}
    startIcon={
      props.icon ? (
        <FontAwesomeIcon
          // color={maharaTheme.colors.green}
          icon={props.icon}
          size={ICON_SIZE}
          style={
            props.dark ? MediumButtonStyles.dark : MediumButtonStyles.light
          }
        />
      ) : undefined
    }
    accessibilityRole="button"
    accessibilityLabel={props.text}
    accessibilityHint={
      props.accessibilityHint ? props.accessibilityHint : undefined
    }
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

StyleSheet.create({
  disabled: {
    color: '#a9a9a9',
  },
});

export default MediumButton;
