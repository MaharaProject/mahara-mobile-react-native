import { StyleSheet } from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginBottom: styles.padding.md
  },
  imageWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderColor: '#f00',
    color: '#0f0'
  }
});
