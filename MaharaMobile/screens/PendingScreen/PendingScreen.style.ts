import { StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/variables';

export default StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: styles.colors.light
  },
  highlighted: {
    backgroundColor: styles.colors.light
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
});
