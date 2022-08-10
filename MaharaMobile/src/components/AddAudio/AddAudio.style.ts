import { StyleSheet } from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  button: {
    marginBottom: styles.padding.md
  },
  smButton: {
    marginBottom: styles.padding.md,
    marginRight: styles.padding.sm,
    borderRadius: 25,
    height: 50,
    minWidth: 50,
    textAlignVertical: 'center',
    fontSize: styles.font.md,
    backgroundColor: styles.colors.light,
    borderColor: styles.colors.tertiary,
    borderWidth: 2
  },
  playbackButtonWrapper: {
    flexDirection: 'row'
  },
  buttonWrapper: {
    flexDirection: 'row'
  },
  recordButton: {
    flex: 1
  },
  warning: {
    color: styles.colors.warn,
    marginBottom: styles.padding.md
  },
  recording: {
    backgroundColor: styles.colors.red,
    color: styles.colors.light,
    borderWidth: 0
  }
});
