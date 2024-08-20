import { StyleSheet } from 'react-native';
import styles from './variables';

const headingStyles = StyleSheet.create({
    mainHeading: {
        // fontSize: styles.font.lg,
        color: styles.colors.light,
        marginBottom: styles.padding.md,
        marginTop: styles.padding.md,
        fontFamily: 'OpenSansRegular'
    },
    subHeading1: {
        // fontSize: styles.font.lg,
        color: styles.colors.dark,
        marginBottom: styles.padding.sm,
        marginTop: styles.padding.sm,
        fontFamily: 'OpenSansExtraBold'
    },
    subHeading2: {
        // fontSize: styles.font.sm,
        color: styles.colors.dark,
        marginBottom: styles.padding.sm,
        marginTop: styles.padding.sm,
        fontFamily: 'OpenSansRegular'
    }
});

export default headingStyles;
