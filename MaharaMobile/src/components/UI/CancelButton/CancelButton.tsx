import {I18n} from '@lingui/react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
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
    {/* TODO Check translation */}
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
