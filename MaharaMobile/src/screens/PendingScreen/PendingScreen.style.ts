import { StyleSheet } from 'react-native';
import styles from 'assets/styles/variables';

export default StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    listContainer: {
        backgroundColor: styles.colors.light,
        height: '85%'
    },
    buttonContainer: {
        justifyContent: 'space-around',
        height: '15%'
    },
    container: {
        flex: 1,
        backgroundColor: styles.colors.light
    },
    highlighted: {
        backgroundColor: styles.colors.light
    },
    noPending: {
        justifyContent: 'center',
        height: '100%'
    },
    noPendingText: {
        textAlign: 'center',
        fontSize: styles.font.xl,
        paddingTop: styles.padding.sm,
        marginTop: styles.padding.md,
        color: styles.colors.midgrey
    },
    urlText: {
        marginBottom: styles.padding.sm,
        fontSize: styles.font.sm
    }
});
