import {StyleSheet} from 'react-native';
import styles from './variables';

const forms = StyleSheet.create({
  textInput: {
    color: styles.colors.dark,
    paddingLeft: styles.padding.md,
    paddingRight: styles.padding.md,
    marginBottom: styles.padding.md,
    borderColor: styles.colors.border,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: styles.colors.light,
    height: 40
  },
  multiLine: {
    color: styles.colors.dark,
    height: 150,
    borderColor: styles.colors.border,
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: styles.padding.md,
    borderRadius: 5,
    marginBottom: styles.padding.md,
    backgroundColor: styles.colors.light
  },
  picker: {
    backgroundColor: styles.colors.light,
    height: 40
  },
  pickerWrapper: {
    height: 40,
    width: '100%',
    borderColor: styles.colors.border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: styles.padding.md
  },
  tag: {
    backgroundColor: styles.colors.quaternary,
    paddingLeft: styles.padding.sm,
    paddingRight: styles.padding.sm,
    borderRadius: 5,
    marginRight: styles.padding.xs,
    marginTop: styles.padding.xs,
    marginLeft: styles.padding.xs,
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

export default forms;
