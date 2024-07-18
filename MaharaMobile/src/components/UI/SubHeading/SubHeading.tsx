import React from 'react';
import { Text } from '@gluestack-ui/themed-native-base';
import generic from 'assets/styles/generic';
import headingStyles from 'assets/styles/headings';
import { RedAsterisk } from 'utils/formHelper';

type Props = {
  text: string;
  required?: boolean;
};

function SubHeading(props: Props) {
  return (
    <Text fontSize="lg" style={{ ...generic.maharaTextBold, ...headingStyles.subHeading1 }}>
      {props.text}
      {props.required ? <RedAsterisk /> : null}
    </Text>
  );
}
export default SubHeading;
