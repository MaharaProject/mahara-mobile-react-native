import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import generic from '../../../assets/styles/generic';
import styles from '../../../assets/styles/variables';

export const MaharaGradientColours = [
  styles.colors.dark2,
  styles.colors.dark2,
  styles.colors.gradientEndGreen
];

export const MaharaGradientLocations = [0, 0.5, 1];

const MaharaGradient = (props: any) => (
  <LinearGradient
    locations={MaharaGradientLocations}
    colors={MaharaGradientColours}
    style={generic.linearGradient}>
    {props.children}
  </LinearGradient>
);

export default MaharaGradient;
