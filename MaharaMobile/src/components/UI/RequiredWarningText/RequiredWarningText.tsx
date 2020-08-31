import {t} from '@lingui/macro';
import {I18n} from '@lingui/react';
import React from 'react';
import {Text} from 'react-native';
import {Item} from 'native-base';
import styles from '../../../assets/styles/variables';
import {MessageDescriptor} from '../../../models/models';

const RequiredWarningText = (props: {customText: MessageDescriptor}) => (
  <I18n>
    {({i18n}) => (
      <Item
        style={{margin: styles.padding.md, borderColor: styles.colors.light}}>
        <Text style={{color: styles.colors.warn}}>
          {props.customText
            ? i18n._(props.customText)
            : i18n._(t`This field is required.`)}
        </Text>
      </Item>
    )}
  </I18n>
);

export default RequiredWarningText;
