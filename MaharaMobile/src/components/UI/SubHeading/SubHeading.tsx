import React from 'react';
import { Text } from 'native-base';
import headingStyles from '../../../assets/styles/headings';

import { RedAsterisk } from '../../../utils/formHelper';

type Props = {
  text: string;
  required?: boolean;
  style?: any;
  noColon?: boolean;
};

const SubHeading = (props: Props) => (
  <Text fontWeight={500} style={[headingStyles.subHeading1, props.style]}>
    {props.text}
    {props.noColon ? '' : ':'}
    {props.required ? <RedAsterisk /> : null}
  </Text>
);
export default SubHeading;
