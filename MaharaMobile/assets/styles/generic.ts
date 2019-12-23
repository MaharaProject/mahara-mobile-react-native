import { StyleSheet } from 'react-native';
import styles from './variables';

const generic = StyleSheet.create({
  view: {
    backgroundColor: styles.colors.primary,
    color: styles.colors.secondary,
    height: '100%'
  },
  wrap: {
    padding: styles.padding.sm
  }
});

export default generic;
