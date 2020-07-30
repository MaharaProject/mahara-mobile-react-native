import {Input, Item} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const validStyle = StyleSheet.create({
  valid: {
    backgroundColor: '#eff2ee'
  }
});

type Props = {
  valid: boolean;
  value: string;
  multiline?: boolean;
  onChangeText: (text: string) => void;
};

const FormInput = (props: Props) => {
  // const defaultInputStyles = props.valid ? validStyle.valid : null;
  return (
    <Item success={props.valid} regular>
      <Input
        value={props.value}
        onChangeText={props.onChangeText}
        multiline={props.multiline}
      />
    </Item>
  );
};

export default FormInput;
