import React from 'react';
import { extendTheme } from 'native-base';

export const maharaTheme = extendTheme({
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
      black1: '#000000',
      black2: '#222222',
      black3: '#333333',
      grey1: '#666666',
      grey2: '#959595',
    },
    // Add new color
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#5E7938', //'#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    // Add new color
    green: '#576c36',
    info: '#ba9b59',
    success: '#3c4c23',
    danger: '#a9000d',
    warning: '#b9a34b',
    dark: '#000',
    light: '#FFF',
  },
  fontConfig: {
    OpenSans: {
      100: {
        normal: 'OpenSans-Light',
        italic: 'OpenSans-LightItalic',
      },
      200: {
        normal: 'OpenSans-Regular',
        italic: 'OpenSans-Italic',
      },
      300: {
        normal: 'OpenSans-Medium',
        italic: 'OpenSans-MediumItalic',
      },
      400: {
        normal: 'OpenSans-SemiBold',
        italic: 'OpenSans-SemiBoldItalic',
      },
      500: {
        normal: 'OpenSans-Bold',
        italic: 'OpenSans-BoldItalic',
      },
      600: {
        normal: 'OpenSans-ExtraBold',
        italic: 'OpenSans-ExtraBoldItalic',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'OpenSans',
    body: 'OpenSans',
    mono: 'OpenSans',
  },
});
