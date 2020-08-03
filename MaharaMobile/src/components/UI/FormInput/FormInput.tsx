import {Input, Item, Textarea} from 'native-base';
import React from 'react';

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
      {props.multiline === true ? (
        <Textarea
          underline={false}
          rowSpan={2}
          value={props.value}
          onChangeText={props.onChangeText}
          bordered={false}
        />
      ) : (
        <Input value={props.value} onChangeText={props.onChangeText} />
      )}
    </Item>
  );
};

export default FormInput;
