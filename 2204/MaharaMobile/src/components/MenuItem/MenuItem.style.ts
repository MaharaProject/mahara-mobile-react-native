import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

const menuItemStyles = StyleSheet.create({
  listItem: {
    padding: styles.padding.md,
    alignSelf: 'stretch'
  },
  listItemText: {
    marginLeft: styles.padding.sm,
    fontSize: styles.font.md,
    color: styles.colors.contrast
  }
});

export default menuItemStyles;
