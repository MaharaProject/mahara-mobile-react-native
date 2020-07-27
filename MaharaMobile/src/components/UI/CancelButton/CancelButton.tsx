import {t} from '@lingui/macro';
import {I18n} from '@lingui/react';
import {Button, Text} from 'native-base';
import React from 'react';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import buttons from '../../../assets/styles/buttons';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const CancelButton = (props: Props) => (
  <I18n>
    {/* FIXME Check translation */}
    {({i18n}) => (
      <Button
        light
        full
        rounded
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        onPress={() => props.navigation.goBack()}
        style={[buttons.md, buttons.cancel]}>
        <Text>{i18n._(t`Cancel`)}</Text>
      </Button>
    )}
  </I18n>
);

export default CancelButton;
