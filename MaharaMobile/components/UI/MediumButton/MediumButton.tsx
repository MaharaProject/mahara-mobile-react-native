import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import mdButtonStyles from './MediumButton.style';
import { buttons } from '../../../assets/styles/buttons';

type Props = {
  onPress: () => void;
  title: string;
};

const MediumButton = (props: Props) => (
  <TouchableOpacity onPress={props.onPress}>
    <I18n>
      {({ i18n }) => (
        <Text style={[buttons.md, mdButtonStyles.buttons]}>
          {i18n._(t`${props.title}`)}
        </Text>
      )}
    </I18n>
  </TouchableOpacity>
);

export default MediumButton;
