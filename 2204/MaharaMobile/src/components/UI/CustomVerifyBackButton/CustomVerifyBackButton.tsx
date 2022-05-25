import { Button, Icon } from 'native-base';
import React from 'react';
import styles from '../../../assets/styles/variables';
import { onCancelAlert } from '../../../utils/addEditHelperFunctions';

const CustomVerifyBackButton = (props) => {
  const onBackPress = () => {
    onCancelAlert(() => props.goBack());
    return true;
  };
  return (
    <Button style={{ elevation: 0 }} icon onPress={onBackPress}>
      {/* <Icon
        name="arrow-back-outline"
        type="Ionicons"
        color={styles.colors.light}
      /> */}
    </Button>
  );
};

export default CustomVerifyBackButton;
