import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  uploadCard: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'flex-start',

    // all for iOS
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // android
    elevation: 5, // default android material shadow given
  },
});

export default styles;
