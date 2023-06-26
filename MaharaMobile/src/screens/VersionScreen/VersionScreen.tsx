import React from 'react';
import { t } from '@lingui/macro';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import generic from 'assets/styles/generic';
import MediumText from 'components/UI/CustomText/MediumText';

function VersionScreen() {
  const version = DeviceInfo.getVersion();

  const android = '13';
  const ios = '14';
  return (
    <ScrollView style={generic.wrap}>
      <MediumText
        text={t`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}.`}
      />
    </ScrollView>
  );
}
export default VersionScreen;
