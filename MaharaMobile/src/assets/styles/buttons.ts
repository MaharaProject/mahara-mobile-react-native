import { StyleSheet } from 'react-native';
import styles from './variables';

const buttons = StyleSheet.create({
  lg: {
    backgroundColor: styles.colors.secondary,
    color: styles.colors.dark,
    paddingBottom: styles.padding.md,
    paddingTop: styles.padding.md,
    marginBottom: styles.padding.md,
    fontSize: styles.font.md,
    textAlign: 'center',
    width: '100%',
    borderRadius: 35
  },
  md: {
    // backgroundColor: styles.colors.secondary,
    color: styles.colors.dark
  },
  sm: {
    backgroundColor: styles.colors.secondary,
    color: styles.colors.dark
  },
  link: {
    fontSize: styles.font.md,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'OpenSansRegular'
  },
  light: {
    borderColor: styles.colors.light,
    color: styles.colors.light,
    fontFamily: 'OpenSansRegular'
  },
  cancel: {
    // backgroundColor: styles.colors.lightgrey,
  },
  default: {
    marginBottom: styles.padding.sm
  }
});

export default buttons;
