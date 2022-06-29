import {t} from '@lingui/macro';
import {List, ListItem} from 'native-base';
import React from 'react';
import DeviceInfo from 'react-native-device-info';
import flashMessage from '../../components/FlashMessage/FlashMessage';
import MediumText from '../../components/UI/CustomText/MediumText';
import i18n from '../../i18n';

const VersionScreen = () => {
  const version = DeviceInfo.getVersion();
  const versionCode = DeviceInfo.getReadableVersion();
  // flashMessage(versionCode, 'warning');
  const android = '11';
  const ios = '14';
  return (
    <List>
      <ListItem noBorder>
        <MediumText
          textTranslated={i18n._(
            t`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}. The minimum supported Android version is 8.`
          )}
        />
      </ListItem>
    </List>
  );
};
export default VersionScreen;
