import { StyleSheet } from 'react-native';
import { styles } from './variables.ts';

export const forms = StyleSheet.create({
  textInput: {
    color: styles.colors.secondary,
    paddingLeft: styles.padding.md,
    paddingRight: styles.padding.md,
    marginBottom: styles.padding.md,
    borderWidth: 1,
    borderColor: styles.colors.secondary,
    backgroundColor: styles.colors.light,
    height: 40
  }
});
