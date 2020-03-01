import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  view: {
    padding: 10,
    height: '100%'
  },
  imageContainer: {
    margin: styles.padding.md,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  name: {
    padding: styles.padding.md,
    fontSize: styles.font.lg,
    textAlign: 'center',
    paddingTop: 0
  },
  button: {
    alignSelf: 'flex-end'
  }
});
