import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { t } from '@lingui/macro';
import { Button } from 'native-base';
import variables from 'assets/styles/variables';
import { maharaTheme } from 'utils/theme';

type AudioPlayButtonProps = {
  onPress: () => void;
  iconName: string;
};
function AudioPlayButton(props: AudioPlayButtonProps) {
  return (
    <Button
      colorScheme="primary"
      rounded="full"
      variant="outline"
      marginRight={variables.padding.xxs}
      startIcon={
        <FontAwesomeIcon icon={props.iconName} color={maharaTheme.colors.primary[600]} size={20} />
      }
      accessibilityHint={t`play audio`}
      onPress={props.onPress}
    />
  );
}

export default AudioPlayButton;
