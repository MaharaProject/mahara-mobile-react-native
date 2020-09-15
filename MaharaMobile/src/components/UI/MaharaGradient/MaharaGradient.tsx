import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import generic from '../../../assets/styles/generic';
import variables from '../../../assets/styles/variables';

const MaharaGradient = (props: any) => (
  <LinearGradient
    locations={[0, 0.7, 1]}
    colors={[
      variables.colors.dark2,
      variables.colors.tertiary,
      variables.colors.light2
    ]}
    style={generic.linearGradient}>
    {props.children}
  </LinearGradient>
);

export default MaharaGradient;
