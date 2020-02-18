import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import React from 'react';
import { Text } from 'react-native';
import styles from '../../../assets/styles/variables';

const RequiredWarningText = (props: any) => (
  <I18n>
    {({ i18n }) => (
      <Text style={{ color: styles.colors.warn }}>
        {props.customText
          ? i18n._(props.customText)
          : i18n._(t`This field is required`)}
      </Text>
    )}
  </I18n>
);

export default RequiredWarningText;
