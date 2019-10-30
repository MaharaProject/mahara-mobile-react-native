import { StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/variables.ts';

export default StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tagsTextInput: {
    width: 200,
    alignSelf: 'center',
    marginBottom: 0
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
  }
});
