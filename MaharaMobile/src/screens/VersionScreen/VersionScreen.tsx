import React from 'react';
import { t } from '@lingui/macro';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';
import MediumText from 'components/UI/CustomText/MediumText';

function VersionScreen() {
    const version = DeviceInfo.getVersion();

    return (
        <ScrollView style={{ ...generic.wrap, paddingLeft: styles.padding.md }}>
            <MediumText
                text={t`This version of Mahara Mobile is ${version}. It the latest two versions of Android and iOS.`}
            />
        </ScrollView>
    );
}
export default VersionScreen;
