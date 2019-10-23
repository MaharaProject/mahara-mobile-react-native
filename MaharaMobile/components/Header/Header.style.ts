import { StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/variables.ts';

export default StyleSheet.create({
  view: {
    height: 100,
    backgroundColor: styles.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: styles.colors.dark
  }
})
