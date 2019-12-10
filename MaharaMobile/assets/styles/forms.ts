import { StyleSheet } from 'react-native';
import styles from './variables';

export const forms = StyleSheet.create({
  textInput: {
    color: styles.colors.dark,
    paddingLeft: styles.padding.md,
    paddingRight: styles.padding.md,
    marginBottom: styles.padding.md,
    borderWidth: 1,
    borderColor: styles.colors.secondary,
    backgroundColor: styles.colors.light,
    height: 40
  },
  multiLine: {
    color: styles.colors.dark,
    height: 200,
    borderColor: styles.colors.darkgrey,
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: styles.padding.md,
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
    borderWidth: 1,
    marginBottom: styles.padding.md
  },
  tag: {
    backgroundColor: styles.colors.quaternary,
    paddingLeft: styles.padding.sm,
    paddingRight: styles.padding.sm,
    borderRadius: 10,
    marginRight: styles.padding.xs,
    marginTop: styles.padding.xs,
    flexDirection: 'row'
  },
  tagText: {
    color: styles.colors.light,
    paddingTop: styles.padding.xs,
    paddingBottom: styles.padding.xs,
    fontSize: styles.font.sm
  },
  tagClose: {
    color: styles.colors.light,
    paddingLeft: styles.padding.xs,
    paddingTop: 3
  }
});
