import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { I18n } from '@lingui/react';
import gridButtonStyles from './GridButton.style';
import { MessageDescriptor } from '../../../models/models';
import buttons from '../../../assets/styles/buttons';

type Props = {
  onPress: () => void;
  title: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
  image?: null;
};

const GridButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={i18n._(props.title)}
        accessibilityHint={props.accessibilityHint ? i18n._(props.accessibilityHint): undefined}
        onPress={props.onPress}
        style={[buttons.md, gridButtonStyles.button]}>
        {props.image ?
          <View style={gridButtonStyles.imageWrapper}>
            {props.image}
          </View> : null
        }
        <Text style={[gridButtonStyles.buttonText]}>
          {i18n._(props.title)}
        </Text>

      </TouchableOpacity>
    )}
  </I18n>
);

export default GridButton;
