// // import {t} from '@lingui/macro';
import React from 'react';
import DeviceInfo from 'react-native-device-info';
import MediumText from '../../components/UI/CustomText/MediumText';
import { ScrollView } from 'react-native';
import generic from '../../assets/styles/generic';

// import i18n from '../../i18n';

const VersionScreen = () => {
  const version = DeviceInfo.getVersion();
  // const versionCode = DeviceInfo.getReadableVersion();
  // flashMessage(versionCode, 'warning');
  const android = '11';
  const ios = '14';
  return (
    <ScrollView style={generic.wrap}>
      <MediumText
        // textTranslated={i18n._(
        //   t`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}.`
        // )}
        textTranslated={`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}.`}
        text={undefined}
      />
    </ScrollView>
  );
};
export default VersionScreen;
