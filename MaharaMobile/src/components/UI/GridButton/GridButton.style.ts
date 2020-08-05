import {StyleSheet} from 'react-native';
import styles from '../../../assets/styles/variables';

const gridButtonStyles = StyleSheet.create({
  button: {
    margin: styles.padding.xs,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 25
  },
  buttonText: {
    textAlign: 'center',
    fontSize: styles.font.lg,
    fontWeight: 'bold',
    color: styles.colors.light,
    marginBottom: styles.padding.md
  },
  imageWrapper: {
    height: '35%',
    marginTop: styles.padding.lg,
    marginBottom: styles.padding.lg
  },
  green: {
    backgroundColor: styles.colors.green_grid_button
  },
  purple: {
    backgroundColor: styles.colors.berry_grid_button
  },
  lightbrown: {
    backgroundColor: styles.colors.lightbrown_grid_button
  },
  darkbrown: {
    backgroundColor: styles.colors.darkbrown_grid_button
  }
});

export default gridButtonStyles;
