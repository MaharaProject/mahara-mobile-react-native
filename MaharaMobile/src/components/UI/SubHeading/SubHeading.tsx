import React from 'react';
import { Text } from 'react-native';
import headingStyles from "../../../assets/styles/headings";
import { RedAsterix } from '../../../utils/formHelper';

const SubHeading = (props: any) => (
  <Text style={[headingStyles.subHeading1, props.style]}>
    {props.children}
    {props.required ? <RedAsterix /> : null}
  </Text>
);

export default SubHeading;
