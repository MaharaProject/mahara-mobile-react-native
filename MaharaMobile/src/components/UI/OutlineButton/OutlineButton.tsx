import {
  faFolderOpen,
  faMicrophone,
  faStopCircle
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {I18n} from '@lingui/react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {MessageDescriptor} from '@lingui/core';
import buttons from '../../../assets/styles/buttons';
import styles from '../../../assets/styles/variables';
import outlineButtonStyles from './OutlineButton.style';

type Props = {
  onPress: () => void;
  text: MessageDescriptor;
  accessibilityHint?: MessageDescriptor;
  style: any;
  icon?: string;
};

const OutlineButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={i18n._(props.text)}
        accessibilityHint={
          props.accessibilityHint ? i18n._(props.accessibilityHint) : ''
        }
        onPress={props.onPress}>
        <Text
          style={{
            ...buttons.md,
            ...outlineButtonStyles.buttons,
            ...props.style
          }}>
          {props.icon === 'faFolderOpen' ? (
            <FontAwesomeIcon
              icon={faFolderOpen}
              size={20}
              style={outlineButtonStyles.icon}
            />
          ) : null}
          {props.icon === 'faMicrophone' ? (
            <FontAwesomeIcon
              icon={faMicrophone}
              size={20}
              style={outlineButtonStyles.icon}
            />
          ) : null}
          {props.icon === 'faStopCircle' ? (
            <FontAwesomeIcon
              icon={faStopCircle}
              size={20}
              color={styles.colors.light}
              style={outlineButtonStyles.icon}
            />
          ) : null}
          {` ${i18n._(props.text)} `}
        </Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default OutlineButton;
