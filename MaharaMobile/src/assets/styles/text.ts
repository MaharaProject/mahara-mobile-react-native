import {StyleSheet} from 'react-native';
import styles from './variables';

const textStyles = StyleSheet.create({
  textWhite: {
    color: styles.colors.light
  },
  center: {
    textAlign: 'center'
  },
  errorText: {
    color: styles.colors.warn,
    fontSize: styles.font.sm,
    padding: styles.padding.sm
  }
});

export default textStyles;
