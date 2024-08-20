import React from 'react';
import { Text } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';
import { UploadItemType, UserBlog, UserFolder } from 'models/models';

export const setTagString = (tags: Array<string>) => {
    const tagsArray = tags.map((tag: string, index: number) => `${tag}&tags[${index + 1}]=`);
    const tagsString = tagsArray.join('');
    const string = `&tags[0]=${tagsString}`;

    return string;
};

export const isValidText = (itemType: UploadItemType, text: string): boolean => {
    if (itemType === 'J_ENTRY' && text.length === 0) {
        return false;
    }
    if (itemType === 'FILE' || itemType === 'PHOTO') {
        return true;
    }
    return true;
};

export function RequiredWarningText(props: { customText?: string }) {
    return (
        <Text
            fontWeight={200}
            fontSize="md"
            style={{ color: styles.colors.warn, ...generic.regularText }}
        >
            {props.customText ? props.customText : t`This field is required.`}
        </Text>
    );
}

export function RedAsterisk() {
    // styles.colors.warn
    return <Text style={{ color: '#aa0500' }}>*</Text>;
}

/**
 * Order list for UserBlog and UserFolder types for default on UploadForm
 */
export function putDefaultAtTop<Item extends UserBlog | UserFolder>(
    defaultItem: Item | undefined,
    arr: Array<Item> | Array<Item>
): Array<Item> | Array<Item> {
    if (defaultItem) {
        const resultArray = [defaultItem, ...arr.filter((item) => item.id !== defaultItem.id)];
        return resultArray;
    }
    return arr;
}

export const removeExtension = (filename: string) => filename.split('.').slice(0, -1).join('.');
