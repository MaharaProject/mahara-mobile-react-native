// // import {t} from '@lingui/macro';
import { Divider, HStack, List, ListItem, VStack } from 'native-base';
import React from 'react';
import DeviceInfo from 'react-native-device-info';
import flashMessage from '../../components/FlashMessage/FlashMessage';
import MediumText from '../../components/UI/CustomText/MediumText';
// import i18n from '../../i18n';

const VersionScreen = () => {
  const version = DeviceInfo.getVersion();
  const versionCode = DeviceInfo.getReadableVersion();
  // flashMessage(versionCode, 'warning');
  const android = '11';
  const ios = '14';
  return (
    <VStack space={3} divider={<Divider />} w="90%">
      <HStack noBorder>
        <MediumText
          // textTranslated={i18n._(
          //   t`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}.`
          // )}
          textTranslated={`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}.`}
        />
      </HStack>
    </VStack>
  );
};
export default VersionScreen;
