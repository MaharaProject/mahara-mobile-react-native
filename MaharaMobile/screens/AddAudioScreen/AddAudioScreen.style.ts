import { StyleSheet } from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  button: {
    marginBottom: styles.padding.md
  },
  smButton: {
    marginBottom: styles.padding.md,
    marginRight: styles.padding.sm
  },
  buttonWrap: {
    flexDirection: 'row'
  }
});
