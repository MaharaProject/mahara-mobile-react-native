// import {MessageDescriptor} from '@lingui/core';
import React from 'react';
import { Text } from 'native-base';
import headingStyles from '../../../assets/styles/headings';
// import i18n from '../../../i18n';
import { RedAsterisk } from '../../../utils/formHelper';

type Props = {
  // text: MessageDescriptor;
  text: any;
  required?: boolean;
  style?: any;
};

const SubHeading = (props: Props) => (
  <Text fontWeight={500} style={[headingStyles.subHeading1, props.style]}>
    {/* {i18n._(props.text)}:{props.required ? <RedAsterisk /> : null} */}
    {props.text}:{props.required ? <RedAsterisk /> : null}
  </Text>
);
export default SubHeading;
