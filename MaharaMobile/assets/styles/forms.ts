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
  },
  multiLine: {
    height: 200,
    borderColor: styles.colors.darkgrey,
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: styles.padding.sm,
    marginBottom: styles.padding.md
  },
  picker: {
    color: styles.colors.dark,
    height: 40
  },
  pickerWrapper: {
    height: 40,
    width: '100%',
    borderColor: styles.colors.darkgrey,
    borderWidth: 2,
    marginBottom: styles.padding.md
  }
});
