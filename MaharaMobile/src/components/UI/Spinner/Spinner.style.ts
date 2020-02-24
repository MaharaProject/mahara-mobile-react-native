import {StyleSheet} from 'react-native';
import styles from '../../../assets/styles/variables';

export default StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    width: 100,
    padding: styles.padding.md
  },
  image: {
    minWidth: 100,
    minHeight: 100
  },
  name: {
    padding: styles.padding.md,
    fontSize: styles.font.md
  }
});
