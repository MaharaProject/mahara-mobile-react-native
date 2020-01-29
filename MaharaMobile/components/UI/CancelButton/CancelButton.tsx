import React from 'react';
import { withI18n } from '@lingui/react';
import { I18n } from '@lingui/core';
import { t } from '@lingui/macro';
import MediumButton from '../MediumButton/MediumButton';

type Props = {
  navigation: any;
  i18n: I18n;
};

const CancelButton = (props: Props) => {
  return (
    <MediumButton
      title={props.i18n._(t`Cancel`)}
      onPress={() => {
        props.navigation.goBack();
      }}
    />
  );
};

export default withI18n()(CancelButton);
