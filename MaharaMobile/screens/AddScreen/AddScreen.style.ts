import { StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/variables';

export default StyleSheet.create({
  view: {
    padding: styles.padding.md
  },
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
    marginBottom: styles.padding.md
  }
});
