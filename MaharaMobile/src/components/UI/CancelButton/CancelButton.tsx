// import {t} from '@lingui/macro';
// import { I18n } from '@lingui/react';
import { CommonActions } from '@react-navigation/native';
import { Button, Text } from 'native-base';
import React from 'react';
import buttons from '../../../assets/styles/buttons';
import { onCancelAlert } from '../../../utils/addEditHelperFunctions';

type Props = {
  navigation: { dispatch: (arg0: CommonActions.Action) => any };
  onPress?;
};

const CancelButton = (props: Props) => {
  const goBack = () => props.navigation.dispatch(CommonActions.goBack());
  return (
    // <I18n>
    //   {({i18n}) => (
    //     <Button
    //       light
    //       full
    //       rounded
    //       accessibilityRole="button"
    //       accessibilityLabel="Cancel"
    //       onPress={() =>
    //         props.onPress ? props.onPress() : onCancelAlert(goBack)
    //       }
    //       style={[buttons.md, buttons.cancel]}>
    //       <Text>{i18n._(t`Cancel`)}</Text>
    //     </Button>
    //   )}
    // </I18n>
    <Button
      light
      full
      rounded="full"
      // marginX={variables.padding.xs}
      accessibilityLabel="Cancel"
      onPress={() => (props.onPress ? props.onPress() : onCancelAlert(goBack))}
      colorScheme="info"
      style={[buttons.md, buttons.cancel]}>
      {/* <Text>{i18n._(t`Cancel`)}</Text> */}
      <Text>Cancel</Text>
    </Button>
  );
};

export default CancelButton;
