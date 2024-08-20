import { Platform } from 'react-native';

const isIOS = () => Platform.OS === 'ios';

export const fontFamilies = {
    OPEN_SANS: {
        normal: isIOS() ? 'OpenSans-Regular' : 'OpenSansRegular',
        medium: isIOS() ? 'OpenSans-Medium' : 'OpenSansMedium',
        bold: isIOS() ? 'OpenSans-Bold' : 'OpenSansBold'
    },
    RUBIK: {
        normal: isIOS() ? 'Rubik-Regular' : 'RubikRegular',
        medium: isIOS() ? 'Rubik-Medium' : 'RubikMedium',
        bold: isIOS() ? 'Rubik-Bold' : 'RubikBold'
    }
    // Adjust the above code to fit your chosen fonts' names
};

export const getFontFamily = (isLTR: boolean, weight: 'normal' | 'medium' | 'bold') => {
    const selectedFontFamily = isLTR ? fontFamilies.OPEN_SANS : fontFamilies.RUBIK;
    return selectedFontFamily[weight];
};
