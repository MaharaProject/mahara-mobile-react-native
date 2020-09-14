import {Trans} from '@lingui/macro';
import {Text} from 'native-base';

import React from 'react';
import styles from '../../../assets/styles/variables';

const MediumText = props => {
  return (
    <Trans>
      <Text style={{...props.style, fontSize: styles.font.md}}>
        {props.children}
      </Text>
    </Trans>
  );
};

export default MediumText;
