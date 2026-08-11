import React from 'react';
import { Text } from '@gluestack-ui/themed-native-base';
import generic from '../../../assets/styles/generic';
import headingStyles from '../../../assets/styles/headings';
import { getFontFamily } from '../../../constants/fonts';
import { RedAsterisk } from '../../../utils/formHelper';

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
    text: string;
    required?: boolean;
    style?: any;
};

function SubHeadingNoColon(props: Props) {
    return (
        <Text fontSize="lg" style={{ fontFamily: getFontFamily(true, 'bold'), ...props.style }}>
            {props.text}
            {props.required ? <RedAsterisk /> : null}
        </Text>
    );
}
export default SubHeadingNoColon;
