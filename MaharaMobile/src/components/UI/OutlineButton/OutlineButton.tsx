import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Text } from '@gluestack-ui/themed-native-base';
import { View } from 'react-native';
import generic from 'assets/styles/generic';
import { maharaTheme } from 'utils/theme';

type Props = {
  onPress: () => void;
  text: string;
  accessibilityHint?: string;
  icon?: IconDefinition;
  light?: boolean;
};

function OutlineButton(props: Props) {
  // const buttonColour = maharaTheme.colors.primary[600];
  const buttonColour = '#4b612d';

  return (
    <View>
      <Button
        colorScheme={props.light ? 'dark' : 'primary'}
        rounded="full"
        variant="outline"
        style={{ ...generic.maharaText }} // TODO: not working
        leftIcon={
          props.icon ? (
            <FontAwesomeIcon icon={props.icon} size={20} color={buttonColour} />
          ) : undefined
        }
        light={props.light}
        // _text={props.style}
        accessibilityHint={props.accessibilityHint}
        onPress={props.onPress}
        size="lg"
      >
        {props.text}
      </Button>
    </View>
  );
}

export default OutlineButton;
