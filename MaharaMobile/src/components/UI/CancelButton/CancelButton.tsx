import React from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import MediumButton from '../MediumButton/MediumButton';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const CancelButton = (props: Props) => (
  <MediumButton title={t`Cancel`} onPress={() => props.navigation.goBack()} />
);

export default withI18n()(CancelButton);
