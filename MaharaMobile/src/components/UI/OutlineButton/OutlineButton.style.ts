import { StyleSheet } from 'react-native';
import styles from 'assets/styles/variables';

const outlineButtonStyles = StyleSheet.create({
    buttons: {
        marginBottom: styles.padding.md,
        // borderColor: styles.colors.tertiary,
        color: styles.colors.tertiary,
        borderWidth: 2
    },
    icon: {
        color: styles.colors.tertiary
    }
});

export default outlineButtonStyles;
