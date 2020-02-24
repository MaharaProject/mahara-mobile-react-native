import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { I18n } from '@lingui/react';
import buttons from '../../../assets/styles/buttons';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const CancelButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        onPress={() => props.navigation.goBack()}>
        <Text style={[buttons.md, buttons.cancel]}>Cancel</Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default CancelButton;
