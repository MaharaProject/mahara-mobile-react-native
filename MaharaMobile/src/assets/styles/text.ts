import { StyleSheet } from 'react-native';
import styles from './variables';

const textStyles = StyleSheet.create({
    textWhite: {
        color: styles.colors.light,
        fontFamily: 'OpenSansRegular'
    },
    center: {
        textAlign: 'center'
    },
    errorText: {
        color: '#fff',
        fontSize: styles.font.md,
        fontWeight: '700',
        padding: styles.padding.sm,
        fontFamily: 'OpenSansRegular'
    }
});

export default textStyles;
