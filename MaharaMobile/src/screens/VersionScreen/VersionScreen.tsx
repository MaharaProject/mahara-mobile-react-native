import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import MediumText from '../../components/UI/CustomText/MediumText';
import {MAHARAVERSION} from '../../utils/constants';

const VersionScreen = () => (
  <List>
    <ListItem noBorder>
      <MediumText text={t`This version of Mahara Mobile is ${MAHARAVERSION}`} />
    </ListItem>
  </List>
);

export default VersionScreen;
