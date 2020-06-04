import {I18n} from '@lingui/react';
import React from 'react';
import {Text} from 'react-native';
import headingStyles from '../../../assets/styles/headings';
import {RedAsterisk} from '../../../utils/formHelper';

const SubHeading = props => (
  <I18n>
    {({i18n}) => (
      // <img src="..." alt={i18n._(props.caption)} />
      <Text style={[headingStyles.subHeading1, props.style]}>
        {i18n._(props.text)}
        {props.children}
        {props.required ? <RedAsterisk /> : null}
      </Text>
      // Destination folder:
    )}
  </I18n>
);

export default SubHeading;
