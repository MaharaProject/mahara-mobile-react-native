import { Text } from 'native-base';
import React from 'react';
import styles from '../../../assets/styles/variables';

type Props = {
  children?: React.ReactNode;
  text?: string;
  childrenFirst?: boolean;
  style?: any;
};

/**
 * This is a styled medium text component
 * Note: if you wish to include components in here, please use the 'link' attribute to your parent
 * component otherwise the component will try to translate it.
 * @param props
 */
function MediumText(props: Props) {
  return (
    <Text
      style={{
        fontSize: styles.font.md,
        flexWrap: 'wrap',
        ...props.style
      }}
    >
      {props.children != null && props.childrenFirst ? props.children : null}
      {!!props.text && props.text}
      {props.children && !props.childrenFirst ? props.children : null}
    </Text>
  );
}

export default MediumText;
