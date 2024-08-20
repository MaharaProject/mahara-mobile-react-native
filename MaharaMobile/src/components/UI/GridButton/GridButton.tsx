import React from 'react';
import { Center, Text } from '@gluestack-ui/themed-native-base';
import { TouchableOpacity, View } from 'react-native';
import buttons from 'assets/styles/buttons';
import gridButtonStyles from './GridButton.style';

type Props = {
    onPress: () => void;
    title: string;
    accessibilityHint?: string;
    image?: object;
    color?: string;
};

function GridButton(props: Props) {
    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityHint={props.accessibilityHint ? props.accessibilityHint : undefined}
            onPress={props.onPress}
            style={[
                buttons.md,
                gridButtonStyles.button,
                props.color === 'green' ? gridButtonStyles.green : null,
                props.color === 'purple' ? gridButtonStyles.purple : null,
                props.color === 'lightbrown' ? gridButtonStyles.lightbrown : null,
                props.color === 'darkbrown' ? gridButtonStyles.darkbrown : null,
                props.color === 'disabled' ? gridButtonStyles.disabled : null
            ]}
        >
            {props.image ? <View style={gridButtonStyles.imageWrapper}>{props.image}</View> : null}
            <Center>
                <Text centre style={[gridButtonStyles.buttonText]}>
                    {props.title}
                </Text>
            </Center>
        </TouchableOpacity>
    );
}

export default GridButton;
