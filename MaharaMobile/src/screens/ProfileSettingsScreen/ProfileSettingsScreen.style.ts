import { StyleSheet } from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: styles.colors.light
  },
  view: {
    padding: styles.padding.md
  },
  buttons: {
    marginBottom: styles.padding.md,
    marginTop: '50%'
  }
});
