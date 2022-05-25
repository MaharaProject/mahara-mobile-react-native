import { Button, Icon } from 'native-base';
import React from 'react';
import variables from '../../../assets/styles/variables';

type AudioPlayButtonProps = {
  onPress: () => void;
  iconName: string;
};
const AudioPlayButton = (props: AudioPlayButtonProps) => (
  <Button
    bordered
    // rounded
    onPress={props.onPress}
    leftIcon={<Icon name={props.iconName} type="Ionicons" />}
    style={{ marginEnd: variables.padding.sm }}
  />
);

export default AudioPlayButton;
