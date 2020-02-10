import { StyleSheet } from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  profileView: {
    flex: 1,
    flexDirection: 'column',
    height: '50%'
    // backgroundColor: '#5FC99D'
  },
  container: {
    flexDirection: 'row',
    width: 100,
    padding: styles.padding.md
  },
  image: {
    minWidth: 100,
    minHeight: 100
  },
  name: {
    padding: styles.padding.md,
    fontSize: styles.font.md
  },
  settingsView: {
    flex: 1,
    height: '50%',
    // backgroundColor: '#9D62CE'
  },
  view: {
    height: 400,
    margin: 10
  },
  app: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileContainer: {
    flex: 1,
    backgroundColor: styles.colors.light
  }
});
