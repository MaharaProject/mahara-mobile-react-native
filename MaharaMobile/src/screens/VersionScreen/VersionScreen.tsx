import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import MediumText from '../../components/UI/CustomText/MediumText';

const VersionScreen = () => (
  <List>
    <ListItem noBorder>
      <MediumText text={t`This version of Mahara Mobile is 21.04.2`} />
    </ListItem>
  </List>
);

export default VersionScreen;
