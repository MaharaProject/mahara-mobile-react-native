import {Trans} from '@lingui/macro';
import {Text} from 'native-base';
import React from 'react';
import styles from '../../../assets/styles/variables';

type Props = {
  children: React.ReactNode;
  style?: any;
  pureText?: boolean;
};

/**
 * This is a styled medium text component
 * Note: if you wish to include components in here, please use the 'link' attribute to your parent
 * component otherwise the component will try to translate it.
 * @param props
 */
const MediumText = (props: Props) => {
  const pureText = props.pureText ?? true;
  return (
    <Text
      style={{
        fontSize: styles.font.md,
        flex: 1,
        flexWrap: 'wrap',
        ...props.style
      }}>
      {pureText ? <Trans>{props.children}</Trans> : props.children}
    </Text>
  );
};

export default MediumText;
