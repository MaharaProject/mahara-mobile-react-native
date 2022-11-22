import { StyleSheet } from 'react-native';
import styles from './variables';

const generic = StyleSheet.create({
  view: {
    backgroundColor: styles.colors.primary,
    color: styles.colors.secondary,
    height: '100%'
  },
  wrap: {
    marginVertical: styles.padding.sm,
    paddingRight: styles.padding.sm,
    paddingLeft: styles.padding.sm
  },
  center: {
    textAlign: 'left'
  },
  linearGradient: {
    flex: 1,
    padding: styles.padding.md
  }
});

export default generic;
