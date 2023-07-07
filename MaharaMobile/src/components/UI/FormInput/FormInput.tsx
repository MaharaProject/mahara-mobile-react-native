import React from 'react';
import { Box, Input, TextArea } from 'native-base';
import styles from 'assets/styles/variables';

type Props = {
  valid: boolean;
  value: string;
  multiline?: boolean;
  onChangeText: (text: string) => void;
};

function FormInput(props: Props) {
  return (
    <Box success={props.valid} regular>
      {props.multiline === true ? (
        <TextArea
          underline={false}
          rowSpan={2}
          value={props.value}
          onChangeText={props.onChangeText}
          bordered={false}
          style={{ flex: 1 }}
        />
      ) : (
        <Input
          height={styles.heights.input}
          value={props.value}
          onChangeText={props.onChangeText}
        />
      )}
    </Box>
  );
}

export default FormInput;