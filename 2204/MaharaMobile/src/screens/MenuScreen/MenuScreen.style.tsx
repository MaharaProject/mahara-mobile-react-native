import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

const menuScreenStyles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: styles.colors.primary,
    height: '100%',
    elevation: 4 // needs to be elevated to the same height as the top menu bar
  }
});

export default menuScreenStyles;
