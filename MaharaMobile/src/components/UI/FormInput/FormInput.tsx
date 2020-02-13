import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { I18n } from '@lingui/react';

const FormInput = (props: any) => {
  const defaultInputStyles = props.valid ? validStyle.valid : null;
  return (
    <I18n>
      {({i18n}) => (
        <TextInput
          style={[props.style, defaultInputStyles]}
          placeholder={i18n._(props.placeholder)}
          value={props.value}
          onChangeText={props.onChangeText}
        />
      )}
    </I18n>
  );
};

const validStyle = StyleSheet.create({
  valid: {
    backgroundColor: '#eff2ee'
  }
});

export default FormInput;
