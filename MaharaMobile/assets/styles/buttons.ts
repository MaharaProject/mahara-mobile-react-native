import { StyleSheet } from 'react-native';
import { styles } from './variables';

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
  },
  sm: {
    backgroundColor: styles.colors.quaternary,
    color: styles.colors.light,
    padding: styles.padding.sm,
    fontSize: styles.font.md,
    textAlign: 'center',
    alignSelf: 'flex-start'
  }
});
