// import {MessageDescriptor} from '@lingui/core';
import { Text } from 'native-base';
import React from 'react';
import styles from '../../../assets/styles/variables';
// import i18n from '../../../i18n';

type Props = {
  children?: React.ReactNode;
  // text?: MessageDescriptor; //  not yet translated
  text: any;
  textTranslated?: string; // translated
  style?: any;
};

/**
 * This is a styled medium text component
 * Note: if you wish to include components in here, please use the 'link' attribute to your parent
 * component otherwise the component will try to translate it.
 * @param props
 */
const MediumText = (props: Props) => {
  return (
    <Text
      style={{
        fontSize: styles.font.md,
        flexWrap: 'wrap',
        ...props.style,
      }}>
      {/* {props.text ? i18n._(props.text) : props.children} */}
      {props.text ? props.text : props.children}
      {props.textTranslated ? props.textTranslated : props.children}
    </Text>
  );
};

export default MediumText;
