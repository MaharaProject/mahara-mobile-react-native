import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const FormInput = (props: any) => {
  const defaultInputStyles = props.valid ? validStyle.valid : null;
  return (
    <TextInput
      style={[props.style, defaultInputStyles]}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
};

const validStyle = StyleSheet.create({
  valid: {
    backgroundColor: '#eff2ee'
  }
});

export default FormInput;
