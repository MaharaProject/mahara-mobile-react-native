import { StyleSheet } from 'react-native';
import generic from './generic';
import styles from './variables';

const textStyles = StyleSheet.create({
  textWhite: {
    color: styles.colors.light,
    fontFamily: 'OpenSansRegular'
  },
  center: {
    textAlign: 'center'
  },
  errorText: {
    color: styles.colors.siteCheckErrorTextPink,
    fontSize: styles.font.sm,
    padding: styles.padding.sm,
    fontFamily: 'OpenSansRegular'
  }
});

export default textStyles;
