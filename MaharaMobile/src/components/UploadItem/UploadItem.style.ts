import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

const uploadItemStyles = StyleSheet.create({
  uploadItem: {
    flexDirection: 'row',
    padding: 3,
    marginVertical: 3,
    height: 110
  },
  pendingCard: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start'
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '30%', // of width of parent
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    height: 80
  },
  textContainer: {
    paddingLeft: 10,
    width: '50%'
  },
  imageContainer: {
    width: '20%',
    borderRadius: 50,
    overflow: 'hidden'
  },
  thumbnail: {
    height: '100%',
    width: '100%'
  },
  button: {
    width: '100%',
    height: '50%'
  },
  date: {
    fontSize: 20
  },
  title: {
    color: styles.colors.primary,
    paddingVertical: 5,
    fontSize: 16
  }
});

export default uploadItemStyles;
