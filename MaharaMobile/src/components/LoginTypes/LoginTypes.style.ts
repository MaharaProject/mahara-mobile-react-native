import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  view: {
    flex: 1
  },
  wrapper: {
    flex: 1.4
  },
  imageWrapper: {
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
