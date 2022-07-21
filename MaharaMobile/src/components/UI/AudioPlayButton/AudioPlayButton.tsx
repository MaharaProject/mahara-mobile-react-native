import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from 'native-base';
import React from 'react';
import variables from '../../../assets/styles/variables';
import { maharaTheme } from '../../../utils/theme';

type AudioPlayButtonProps = {
  onPress: () => void;
  iconName: string;
};
const AudioPlayButton = (props: AudioPlayButtonProps) => (
  // <Button
  //   bordered
  //   // rounded
  //   onPress={props.onPress}
  //   leftIcon={<Icon name={props.iconName} type="Ionicons" />}
  //   style={{ marginEnd: variables.padding.sm }}
  // />
  // <Box alignItems="center">
  <Button
    colorScheme="primary"
    rounded="full"
    variant="outline"
    marginRight={variables.padding.xxs}
    startIcon={
      <FontAwesomeIcon
        icon={props.iconName}
        color={maharaTheme.colors.primary[600]}
        size={20}
      />
    }
    // accessibilityHint={props.accessibilityHint}
    onPress={props.onPress}>
    {/* <Icon name={props.icon} /> */}
    {/* <Text>{i18n._(props.text)}</Text> */}
  </Button>
);

export default AudioPlayButton;
