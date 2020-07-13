import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {t} from '@lingui/macro';
import styles from '../../../assets/styles/variables';
import i18n from '../../../i18n';

const CustomVerifyBackButton = ({navigation}) => {
  const onBackPress = () => {
    Alert.alert(
      i18n._(t`Are you sure?`),
      i18n._(
        t`It looks like you have been editing something. If you leave before saving, your changes will be lost.`
      ),
      [
        {
          text: i18n._(t`Cancel`),
          onPress: () => {
            // do nothing
          }
        },
        {text: i18n._(t`Okay`), onPress: () => navigation.goBack()}
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
