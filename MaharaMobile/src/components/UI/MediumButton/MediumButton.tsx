import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, Text } from '@gluestack-ui/themed-native-base';
import { StyleSheet } from 'react-native';
import styles from 'assets/styles/variables';
import { ICON_SIZE } from 'utils/constants';
import { maharaTheme } from 'utils/theme';

type Props = {
    onPress: () => void;
    text: string;
    accessibilityHint?: string;
    icon?: IconDefinition;
    invalid?: boolean;
    // children?: any;
    colorScheme?: string;
};

const MediumButtonStyles = StyleSheet.create({
    light: {
        borderRadius: 5,
        color: styles.colors.browner
    }
});

function MediumButton({ icon, accessibilityHint, colorScheme, onPress, invalid, text }: Props) {
    return (
        <Button
            rounded="full"
            colorScheme={colorScheme || 'secondary'}
            startIcon={
                icon ? (
                    <FontAwesomeIcon
                        icon={icon}
                        size={ICON_SIZE}
                        style={MediumButtonStyles.light}
                    />
                ) : undefined
            }
            accessibilityRole="button"
            accessibilityLabel={text}
            accessibilityHint={accessibilityHint || ''}
            isDisabled={invalid}
            onPress={onPress}
            size="lg"
        >
            {text}
        </Button>
    );
}

StyleSheet.create({
    disabled: {
        color: '#a9a9a9'
    }
});

export default MediumButton;
