import {StyleSheet} from 'react-native';
import styles from '../../../assets/styles/variables';

const gridButtonStyles = StyleSheet.create({
  button: {
    margin: styles.padding.xs,
    flex: 1
  },
  buttonText: {
    textAlign: 'center',
    fontSize: styles.font.lg,
    fontWeight: 'bold',
    color: styles.colors.light,
    marginBottom: styles.padding.md
  },
  imageWrapper: {
    marginTop: styles.padding.lg,
    marginBottom: styles.padding.lg
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
