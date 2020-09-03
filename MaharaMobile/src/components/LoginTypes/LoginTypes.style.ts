import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  view: {
    flex: 1
  },
  logoWrapper: {
    flex: 1
  },
  buttonGroup: {
    justifyContent: 'space-between',
    flex: 1
  },
  buttons: {
    marginBottom: styles.padding.md
  },
  errorTextInput: {
    borderColor: styles.colors.warn,
    borderWidth: 2
  }
});
