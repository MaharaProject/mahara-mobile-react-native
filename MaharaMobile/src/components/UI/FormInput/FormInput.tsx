import {MessageDescriptor} from '@lingui/core';
import {I18n} from '@lingui/react';
import React from 'react';
import {StyleSheet, TextInput, TextStyle} from 'react-native';

const validStyle = StyleSheet.create({
  valid: {
    backgroundColor: '#eff2ee'
  }
});

type Props = {
  valid: boolean;
  style: TextStyle;
  placeholder?: MessageDescriptor;
  value: string;
  onChangeText: (text: string) => void;
};

const FormInput = (props: Props) => {
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

export default FormInput;
