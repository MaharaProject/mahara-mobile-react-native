import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
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
                <FontAwesomeIcon
                    icon={props.iconName}
                    color={maharaTheme.colors.primary[600]}
                    size={20}
                />
            }
            accessibilityHint={t`play audio`}
            onPress={props.onPress}
            size="lg"
        />
    );
}

export default AudioPlayButton;
