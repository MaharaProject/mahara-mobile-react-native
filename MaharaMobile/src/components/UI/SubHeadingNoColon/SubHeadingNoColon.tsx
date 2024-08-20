import React from 'react';
import { Text } from '@gluestack-ui/themed-native-base';
import { getFontFamily } from 'constants/fonts';
import generic from 'assets/styles/generic';
import headingStyles from 'assets/styles/headings';
import { RedAsterisk } from 'utils/formHelper';

type Props = {
    text: string;
    required?: boolean;
    style?: any;
};

function SubHeadingNoColon(props: Props) {
    return (
        <Text
            fontSize="lg"
            style={{ fontFamily: getFontFamily(true, 'bold') }}
            // style={{ ...headingStyles.subHeading1, ...props.style }}
        >
            {props.text}
            {props.required ? <RedAsterisk /> : null}
        </Text>
    );
}
export default SubHeadingNoColon;
