import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {i18n} from '@lingui/core';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {t} from '@lingui/macro';
import styles from '../../../assets/styles/variables';

const CustomVerifyBackButton = ({navigation}) => {
  const onBackPress = () => {
    Alert.alert(
      i18n._(t`Are you sure?`), // FIXME string check
      i18n._(
        t`It looks like you have been editing something. If you leave before saving, your changes will be lost.`
      ),
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Okay', onPress: () => navigation.goBack()}
      ],
      {cancelable: true}
    );
    // }

    // Return true to enable back button over ride.
    return true;
  };
  return (
    <TouchableOpacity onPress={() => onBackPress()}>
      <FontAwesomeIcon style={{margin: styles.padding.lg}} icon={faArrowLeft} />
    </TouchableOpacity>
  );
};

export default CustomVerifyBackButton;
