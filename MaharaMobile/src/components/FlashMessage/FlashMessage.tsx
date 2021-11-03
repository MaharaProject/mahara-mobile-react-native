import {Icon, Toast} from 'native-base';
import React from 'react';
import {Text} from 'react-native';
import styles from '../../assets/styles/variables';
import i18n from '../../i18n';
import {MessageDescriptor, MessageInfoType} from '../../models/models';

const flashMessage = (
  text: MessageDescriptor,
  messageType: MessageInfoType
) => {
  Toast.show({
    text: (
      <Text
        style={{
          fontSize: styles.font.md,
          color: styles.colors.messageSuccessText
        }}>
        <Icon
          style={{
            color: styles.colors.messageSuccessIcon
          }}
          name="md-checkmark-circle"
        />
        &nbsp;&nbsp;{i18n._(text)}
      </Text>
    ),
    type: messageType,
    style: {
      backgroundColor: styles.colors.messageSuccessBg,
      paddingBottom: styles.padding.md
    },
    position: 'top',
    duration: 3000
  });
};

export default flashMessage;