import { StyleSheet } from 'react-native';
import { styles } from './variables.ts';

export const buttons = StyleSheet.create({
  large: {
    backgroundColor: styles.colors.secondary,
    color: styles.colors.light,
    paddingBottom: styles.padding.md,
    paddingTop: styles.padding.md,
    marginBottom: styles.padding.md,
    fontSize: styles.font.md,
    textAlign:'center',
    width: '100%'
  },
  md: {
    backgroundColor: styles.colors.tertiary,
    color: styles.colors.light,
    paddingBottom: styles.padding.sm,
    paddingTop: styles.padding.sm,
    fontSize: styles.font.md,
    textAlign: 'center',
    width: '100%'
  }
});
