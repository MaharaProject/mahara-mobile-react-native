import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, IconButton } from 'native-base';
import styles from 'assets/styles/variables';
import { onCancelAlert } from 'utils/addEditHelperFunctions';

function CustomVerifyBackButton(props) {
  const onBackPress = () => {
    onCancelAlert(() => props.goBack());
    return true;
  };
  return (
    // <Button style={{ elevation: 0 }} icon onPress={onBackPress}>
    //   <Icon
    //     name="arrow-back-outline"
    //     type="Ionicons"
    //     color={styles.colors.light}
    //   />
    // </Button>
    <Box alignItems="center">
      <IconButton
        onPress={onBackPress}
        icon={
          <FontAwesomeIcon color={styles.colors.light} icon={faArrowLeft} size={styles.font.lg} />
        }
        borderRadius="full"
        _icon={{
          color: 'orange.500',
          size: 'md'
        }}
        _hover={{
          bg: 'orange.600:alpha.20'
        }}
        _pressed={{
          bg: 'orange.600:alpha.20',
          _icon: {
            name: 'emoji-flirt'
          },
          _ios: {
            _icon: {
              size: '2xl'
            }
          }
        }}
        _ios={{
          _icon: {
            size: '2xl'
          }
        }}
      />
    </Box>
  );
}

export default CustomVerifyBackButton;
