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
    backgroundColor: styles.colors.secondary,
    color: styles.colors.dark,
    paddingBottom: styles.padding.sm,
    paddingTop: styles.padding.sm,
    fontSize: styles.font.md,
    textAlign: 'center',
    width: '100%',
    borderRadius: 25
  },
  sm: {
    backgroundColor: styles.colors.secondary,
    color: styles.colors.dark,
    padding: styles.padding.sm,
    fontSize: styles.font.md,
    textAlign: 'center',
    alignSelf: 'flex-start'
  },
  link: {
    fontSize: styles.font.md,
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  light: {
    borderColor: styles.colors.light,
    color: styles.colors.light
  },
  cancel: {
    backgroundColor: styles.colors.lightgrey
  }
});

export default buttons;
