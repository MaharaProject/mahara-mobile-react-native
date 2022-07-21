import { StyleSheet } from 'react-native';
import styles from './variables';

const headingStyles = StyleSheet.create({
  mainHeading: {
    fontSize: styles.font.lg,
    color: styles.colors.light,
    marginBottom: styles.padding.md,
    marginTop: styles.padding.md,
  },
  subHeading1: {
    fontSize: styles.font.md,
    color: styles.colors.dark,
    marginBottom: styles.padding.sm,
    marginTop: styles.padding.sm,
  },
  subHeading2: {
    fontSize: styles.font.sm,
    color: styles.colors.dark,
    marginBottom: styles.padding.sm,
    marginTop: styles.padding.sm,
  },
});

export default headingStyles;
