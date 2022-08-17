import React from 'react';
import { t } from '@lingui/macro';
import { Button, Text } from 'native-base';
import buttons from 'assets/styles/buttons';

type Props = {
  onPress: () => void;
};

function CancelButton(props: Props) {
  return (
    <Button
      light
      full
      rounded="full"
      accessibilityLabel="Cancel"
      onPress={() => (props.onPress ? props.onPress() : null)}
      colorScheme="info"
      style={[buttons.md, buttons.cancel]}
    >
      <Text>{t`Cancel`}</Text>
    </Button>
  );
}

export default CancelButton;
