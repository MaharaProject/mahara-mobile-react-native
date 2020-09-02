import {I18n} from '@lingui/react';
import React from 'react';
import {Text} from 'react-native';
import headingStyles from '../../../assets/styles/headings';
import i18n from '../../../i18n';
import {RedAsterisk} from '../../../utils/formHelper';

const SubHeading = props => (
  <Text style={[headingStyles.subHeading1, props.style]}>
    {i18n._(props.text)}:{props.required ? <RedAsterisk /> : null}
  </Text>
);
export default SubHeading;
