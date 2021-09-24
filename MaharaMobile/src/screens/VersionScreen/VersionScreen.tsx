import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import MediumText from '../../components/UI/CustomText/MediumText';
import {MAHARAVERSION} from '../../utils/constants';

const VersionScreen = () => {
  const version = MAHARAVERSION;
  const android = '10';
  const ios = '14';
  return (
    <List>
      <ListItem noBorder>
        <MediumText
          text={t`This version of Mahara Mobile is ${version}, supporting up to Android ${android}, and iOS ${ios}.`}
        />
      </ListItem>
    </List>
  );
};
export default VersionScreen;
