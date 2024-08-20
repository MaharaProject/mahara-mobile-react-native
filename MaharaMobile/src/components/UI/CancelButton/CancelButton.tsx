import React from 'react';
import { Button, Text } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import buttons from 'assets/styles/buttons';

type Props = {
    onPress: () => void;
};

function CancelButton(props: Props) {
    return (
        <Button
            variant="solid"
            rounded="full"
            accessibilityLabel="Cancel"
            onPress={() => (props.onPress ? props.onPress() : null)}
            colorScheme="trueGray"
            size="lg"
            style={{ ...buttons.md, ...buttons.cancel }}
        >
            {t`Cancel`}
        </Button>
    );
}

export default CancelButton;
