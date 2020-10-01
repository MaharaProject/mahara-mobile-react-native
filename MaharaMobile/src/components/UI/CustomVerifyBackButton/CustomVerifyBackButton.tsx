import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {t} from '@lingui/macro';
import styles from '../../../assets/styles/variables';
import i18n from '../../../i18n';
import {onCancelAlert} from '../../../utils/addEditHelperFunctions';

const CustomVerifyBackButton = ({navigation}) => {
  const onBackPress = () => {
    onCancelAlert(navigation);
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
