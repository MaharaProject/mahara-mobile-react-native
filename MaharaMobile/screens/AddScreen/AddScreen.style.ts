import { StyleSheet } from 'react-native';
import { styles } from '../../assets/styles/variables.ts';

export default StyleSheet.create({
  view: {
    padding: styles.padding.md
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: styles.padding.md
  },
  imageWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: styles.padding.md
  },
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
