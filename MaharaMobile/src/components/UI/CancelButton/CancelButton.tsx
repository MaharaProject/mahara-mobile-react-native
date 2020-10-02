import {t} from '@lingui/macro';
import {I18n} from '@lingui/react';
import {Button, Text} from 'native-base';
import React from 'react';
import buttons from '../../../assets/styles/buttons';
import {onCancelAlert} from '../../../utils/addEditHelperFunctions';

type Props = {
  navigation: {goBack: () => void};
};

const CancelButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <Button
        light
        full
        rounded
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        onPress={() => onCancelAlert(props.navigation)}
        style={[buttons.md, buttons.cancel]}>
        <Text>{i18n._(t`Cancel`)}</Text>
      </Button>
    )}
  </I18n>
);

export default CancelButton;
