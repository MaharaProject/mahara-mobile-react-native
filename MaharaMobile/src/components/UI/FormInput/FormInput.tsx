import React from 'react';
import { Box, Input, TextArea } from '@gluestack-ui/themed-native-base';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';

type Props = {
  valid: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

function FormInput(props: Props) {
  return (
    <Box success={props.valid}>
      {/* problematic here... */}
      {/* {props.multiline &&
        <TextArea
        size="lg"
        style={{ ...generic.regularText }}
        onChangeText={props.onChangeText}
        value={props.value}
        />
      } */}
      {
        // !props.multiline &&
        <Input
          fontSize="lg"
          value={props.value}
          onChangeText={props.onChangeText}
          style={{ ...generic.regularText }}
        />
      }
    </Box>
  );
}

export default FormInput;
