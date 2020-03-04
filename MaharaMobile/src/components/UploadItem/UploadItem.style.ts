import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

const uploadItemStyles = StyleSheet.create({
  uploadItem: {
    flexDirection: 'row',
    padding: 3,
    marginBottom: -15,
    height: 110
  },
  pendingCard: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: styles.colors.lightgrey,
    padding: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '30%', // of width of parent
    justifyContent: 'space-around',
    paddingLeft: 10,
    height: '100%'
  },
  textContainer: {
    paddingLeft: 10,
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    fontSize: 16
  },
  imageContainer: {
    width: '20%',
    overflow: 'hidden'
  },
  icon: {
    height: '100%',
    backgroundColor: styles.colors.lightbrown,
    justifyContent: 'center'
  },
  thumbnail: {
    height: '100%',
    width: '100%'
  },
  button: {
    justifyContent: 'center'
  },
  date: {
    fontSize: 20
  },
  title: {
    color: styles.colors.primary,
    paddingVertical: 5,
    fontSize: 16
  },
  remove: {
    color: styles.colors.red
  },
  edit: {
    color: styles.colors.green
  }
});

export default uploadItemStyles;
