import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';

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
