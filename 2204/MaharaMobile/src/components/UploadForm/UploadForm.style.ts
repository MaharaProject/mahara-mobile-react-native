import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

const uploadFormStyes = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tagsInputContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tagsTextInput: {
    width: 200,
    alignSelf: 'center',
    marginLeft: styles.padding.xs
  },
  tagsTitle: {
    marginRight: styles.padding.sm
  },
  addButton: {
    backgroundColor: styles.colors.tertiary,
    height: 40,
    paddingLeft: styles.padding.sm,
    paddingRight: styles.padding.sm,
    justifyContent: 'center',
    marginRight: styles.padding.sm
  },
  addButtonText: {
    color: styles.colors.light
  },
  formTitle: {
    marginBottom: styles.padding.sm
  },
  description: {
    height: 300
  },
  queueButton: {
    marginBottom: styles.padding.sm,
    fontWeight: 'bold'
  }
});

export default uploadFormStyes;
