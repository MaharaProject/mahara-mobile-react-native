import {
  faFolderOpen,
  faMicrophone,
  faStopCircle
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {t} from '@lingui/macro';
import {I18n} from '@lingui/react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import buttons from '../../../assets/styles/buttons';
import styles from '../../../assets/styles/variables';
import outlineButtonStyles from './OutlineButton.style';

type Props = {
  onPress: () => void;
  title: string;
  accessibilityHint?: string;
  style: any;
  icon?: string;
};

const OutlineButton = (props: Props) => (
  <I18n>
    {({i18n}) => (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={props.title}
        accessibilityHint={i18n._(props.accessibilityHint)}
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
          {` ${props.title}`}
        </Text>
      </TouchableOpacity>
    )}
  </I18n>
);

export default OutlineButton;
