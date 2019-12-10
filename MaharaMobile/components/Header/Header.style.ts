import { StyleSheet } from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  view: {
    height: 100,
    backgroundColor: styles.colors.primary,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: styles.padding.md
  },
  title: {
    fontSize: 20,
    color: styles.colors.dark
  },
  buttonWrap: {
    flexDirection: 'row'
  },
  button: {
    padding: styles.padding.md,
    backgroundColor: styles.colors.contrast,
    marginRight: styles.padding.sm
  },
  icon: {
    color: styles.colors.secondary
  }
});
