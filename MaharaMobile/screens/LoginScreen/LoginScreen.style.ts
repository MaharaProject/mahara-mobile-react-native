import { StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/variables.ts';

export default StyleSheet.create({
  view: {
    backgroundColor: styles.colors.primary,
    color: styles.colors.secondary
  },
  component: {
    padding: styles.padding.md
  }
});
