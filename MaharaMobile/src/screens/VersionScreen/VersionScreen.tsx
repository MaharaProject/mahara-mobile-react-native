import { t } from '@lingui/macro';
import React from 'react';
import DeviceInfo from 'react-native-device-info';
import MediumText from '../../components/UI/CustomText/MediumText';
import { ScrollView } from 'react-native';
import generic from '../../assets/styles/generic';

const VersionScreen = () => {
  const version = DeviceInfo.getVersion();

  const android = '11';
  const ios = '14';
  return (
    <ScrollView style={generic.wrap}>
      <MediumText
        text={t`This version of Mahara Mobile is ${version}. It supports up to Android ${android} and iOS ${ios}.`}
      />
    </ScrollView>
  );
};
export default VersionScreen;
