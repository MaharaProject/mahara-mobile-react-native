import React from 'react';
import { Text } from '@gluestack-ui/themed-native-base';
import generic from 'assets/styles/generic';
import headingStyles from 'assets/styles/headings';
import { RedAsterisk } from 'utils/formHelper';

type Props = {
  text: string;
  required?: boolean;
  style?: any;
};

function SubHeadingColon(props: Props) {
  return (
    <Text
      fontSize="lg"
      style={{ ...headingStyles.subHeading1, ...props.style, ...generic.maharaTextBold }}
    >
      {props.text}:{props.required ? <RedAsterisk /> : null}
    </Text>
  );
}
export default SubHeadingColon;
