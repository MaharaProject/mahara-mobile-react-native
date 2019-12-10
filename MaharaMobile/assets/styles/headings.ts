import { StyleSheet } from 'react-native';
import styles from './variables';

export const headings = StyleSheet.create({
  mainHeading: {
    fontSize: styles.font.lg,
    color: styles.colors.secondary,
    fontWeight: 'bold',
    marginBottom: styles.padding.md,
    marginTop: styles.padding.md
  },
  subHeading1: {
    fontSize: styles.font.md,
    color: styles.colors.tertiary,
    fontWeight: 'bold',
    marginBottom: styles.padding.sm,
    marginTop: styles.padding.sm
  },
  subHeading2: {
    fontSize: styles.font.sm,
    color: styles.colors.dark,
    fontWeight: 'bold',
    marginBottom: styles.padding.sm,
    marginTop: styles.padding.sm
  }
});
