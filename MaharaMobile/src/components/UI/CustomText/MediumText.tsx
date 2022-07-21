// import {MessageDescriptor} from '@lingui/core';
import { Text } from 'native-base';
import React from 'react';
import styles from '../../../assets/styles/variables';
// import i18n from '../../../i18n';

type Props = {
  children?: React.ReactNode;
  // text?: MessageDescriptor; //  not yet translated
  text: any;
  childrenFirst?: boolean;
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
      {props.children != null && props.childrenFirst ? props.children : null}
      {props.text ? props.text : null}
      {props.textTranslated ? props.textTranslated : null}
      {props.children && !props.childrenFirst ? props.children : null}
    </Text>
  );
};

export default MediumText;
