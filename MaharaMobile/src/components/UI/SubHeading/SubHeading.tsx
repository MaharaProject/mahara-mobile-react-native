import React from 'react';
import {Text} from 'react-native';
import headingStyles from '../../../assets/styles/headings';
import i18n from '../../../i18n';
import {MessageDescriptor} from '../../../models/models';
import {RedAsterisk} from '../../../utils/formHelper';

type Props = {
  text: MessageDescriptor;
  required?: boolean;
  style?: any;
};

const SubHeading = (props: Props) => (
  <Text style={[headingStyles.subHeading1, props.style]}>
    {i18n._(props.text)}:{props.required ? <RedAsterisk /> : null}
  </Text>
);
export default SubHeading;
