import {StyleSheet} from 'react-native';
import styles from '../../../assets/styles/variables';

const outlineButtonStyles = StyleSheet.create({
  buttons: {
    marginBottom: styles.padding.md,
    borderColor: styles.colors.tertiary,
    backgroundColor: null,
    color: styles.colors.tertiary,
    borderWidth: 2
  }
});

export default outlineButtonStyles;
