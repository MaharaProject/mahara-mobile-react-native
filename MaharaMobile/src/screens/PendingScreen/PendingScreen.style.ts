import {StyleSheet} from 'react-native';
import styles from '../../assets/styles/variables';

export default StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  listContainer: {
    backgroundColor: styles.colors.light,
    height: '75%'
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: '25%'
  },
  container: {
    flex: 1,
    backgroundColor: styles.colors.light
  },
  highlighted: {
    backgroundColor: styles.colors.light
  },
  noPending: {
    marginTop: styles.padding.lg
  },
  noPendingText: {
    textAlign: 'center',
    fontSize: styles.font.xl,
    marginTop: styles.padding.md,
    color: styles.colors.midgrey
  },
  urlText: {
    marginBottom: styles.padding.sm,
    fontSize: styles.font.sm
  }
});
