import { StyleSheet } from 'react-native';
import styles from './variables';

const textStyles = StyleSheet.create({
  textWhite: {
    color: styles.colors.light,
  },
  center: {
    textAlign: 'center',
  },
  errorText: {
    color: styles.colors.siteCheckErrorTextPink,
    fontSize: styles.font.sm,
    padding: styles.padding.sm,
  },
});

export default textStyles;
