import { StyleSheet } from 'react-native';
import styles from '../../../assets/styles/variables';

const gridButtonStyles = StyleSheet.create({
  button: {
    marginBottom: styles.padding.md,
    width: '50%'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: styles.font.md,
    color: styles.colors.light
  },
  imageWrapper: {
  },
  green: {
    backgroundColor: styles.colors.green
  },
  purple: {
    backgroundColor: styles.colors.purple
  },
  lightbrown: {
    backgroundColor: styles.colors.lightbrown
  },
  darkbrown: {
    backgroundColor: styles.colors.darkbrown
  }
});

export default gridButtonStyles;
