import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

const menuItemStyles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 20,
    color: styles.colors.contrast,
    width: '90%'
  }
});

export default menuItemStyles;
