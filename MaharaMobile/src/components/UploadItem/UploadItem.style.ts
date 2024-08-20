import { StyleSheet } from 'react-native';
import styles from 'assets/styles/variables';
import { maharaTheme } from 'utils/theme';

const uploadItemStyles = StyleSheet.create({
    uploadItem: {
        height: 80,
        // backgroundColor: 'red',
        flexDirection: 'row'
    },
    pendingCard: {
        flexDirection: 'row',
        width: '100%',
        height: '88%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: styles.colors.midgrey_1,
        padding: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '30%', // of width of parent
        justifyContent: 'space-around',
        height: '100%'
    },
    textContainer: {
        paddingLeft: 10,
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    imageContainer: {
        width: '20%',
        overflow: 'hidden'
    },
    icon: {
        height: '90%',
        justifyContent: 'space-around'
        // backgroundColor: 'red'
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
        paddingVertical: 5
    },
    remove: {
        color: styles.colors.red
    },
    edit: {
        color: styles.colors.green_grid_button
    },
    success: {
        // backgroundColor: maharaTheme.colors.success[200],
        backgroundColor: '#95A47F',
        // color: maharaTheme.colors.success[800]
        color: '#33421D'
    }
});

export default uploadItemStyles;
