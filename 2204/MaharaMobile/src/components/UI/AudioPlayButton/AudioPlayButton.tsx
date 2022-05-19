import {Button, Icon} from 'native-base';
import React from 'react';
import variables from '../../../assets/styles/variables';

type AudioPlayButtonProps = {
  onPress: () => void;
  iconName: string;
};
const AudioPlayButton = (props: AudioPlayButtonProps) => (
  <Button
    bordered
    rounded
    onPress={props.onPress}
    style={{marginEnd: variables.padding.sm}}>
    <Icon name={props.iconName} />
  </Button>
);

export default AudioPlayButton;
