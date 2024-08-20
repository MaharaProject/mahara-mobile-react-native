import { extendTheme } from '@gluestack-ui/themed-native-base';

export const maharaTheme = {
    fontConfig: {
        OpenSans: {
            100: {
                normal: 'OpenSansLight',
                italic: 'OpenSansLightItalic'
            },
            200: {
                normal: 'OpenSansRegular',
                italic: 'OpenSansItalic'
            },
            300: {
                normal: 'OpenSansMedium',
                italic: 'OpenSansMediumItalic'
            },
            400: {
                normal: 'OpenSansSemiBold',
                italic: 'OpenSansSemiBoldItalic'
            },
            500: {
                normal: 'OpenSansBold',
                italic: 'OpenSansBoldItalic'
            },
            600: {
                normal: 'OpenSansExtraBold',
                italic: 'OpenSansExtraBoldItalic'
            }
        }
    },
    components: {
        Link: {
            fontFamily: 'OpenSansRegular'
        }
    },
    colors: {
        mahara: {
            white1: '#F3F3F3',
            green1: '#EDF2E5',
            green2: '#B8C69D',
            green3: '#9DB577',
            green4: '#799152',
            green5: '#68853D',
            green6: '#5E7938',
            green7: '#556D32',
            green8: '#4D622D',
            green9: '#2E391C',
            green10: '#2E3A1C',
            yellow1: '#F9EDBE',
            yellow2: '#F2CB67',
            yellow3: '#F0C36D',
            yellow4: '#C6AD6E',
            yellow5: '#BA9559',
            black1: '#000000',
            black2: '#222222',
            black3: '#333333'
            // grey1: '#666666',
            // grey2: '#959595',
        },
        // Add new color
        primary: {
            10: '#bfc9af',
            50: '#afbc9c',
            100: '#9eaf88',
            200: '#8ea174',
            300: '#7e9460',
            400: '#6e864c',
            500: '#5E7938',
            600: '#4b612d',
            700: '#384922',
            800: '#263016'
        },
        secondary: {
            100: '#ddcaac',
            200: '#d6bf9b',
            300: '#cfb58b',
            400: '#c1a06a',
            500: '#ba9559',
            600: '#a78650',
            700: '#957747',
            800: '#82683e',
            900: '#5d4b2d'
        },
        info: {
            100: '#fafafa',
            200: '#f7f7f7',
            300: '#f4f4f4',
            400: '#f1f1f1',
            500: '#efefef',
            600: '#d7d7d7',
            700: '#bfbfbf',
            800: '#a7a7a7',
            900: '#787878'
        },
        warning: {
            50: '#eecccf',
            100: '#dd999e',
            200: '#cb666e',
            300: '#c34d56',
            400: '#b21a25',
            500: '#a9000d',
            600: '#87000a',
            700: '#760009',
            800: '#650008'
        },
        // Add new color
        green: '#576c36',
        danger: '#a9000d',
        dark: '#000',
        light: '#FFF',
        successIcon: '#76A63D',
        debug: {
            100: '#B8D7E7',
            200: '#A6C6D7',
            300: '#93B5C7',
            400: '#80A4B7',
            500: '#6D93A6',
            600: '#5B8296',
            700: '#487185',
            800: '#356075',
            900: '#224E64'
        },
        success: {
            10: '#CEDDB9',
            50: '#BBCAA6',
            100: '#A8B792',
            200: '#95A47F',
            300: '#81906B',
            400: '#6E7D58',
            500: '#5A6944',
            600: '#51603B',
            700: '#475631',
            800: '#33421D'
        }
    }

    // Make sure values below matches any of the keys in `fontConfig`
    // fonts: {
    //   heading: 'OpenSans',
    //   body: 'OpenSans',
    //   mono: 'OpenSans'
    // }
};

export const maharaThemeBase = extendTheme(maharaTheme);
