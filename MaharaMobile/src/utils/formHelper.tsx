import React from 'react';
import { t } from '@lingui/macro';
import { Text } from 'native-base';
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
    <Text fontWeight={200} style={{ color: styles.colors.warn }}>
      {props.customText ? props.customText : t`This field is required.`}
    </Text>
  );
}

export function RedAsterisk() {
  return <Text style={{ color: styles.colors.warn }}>*</Text>;
}

/**
 * Order list for UserBlog and UserFolder types for default on UploadForm
 */
export const putDefaultAtTop = (
  defaultBlog: UserBlog,
  defFolder: UserFolder,
  arr: Array<UserFolder> | Array<UserBlog>
): Array<UserFolder> | Array<UserBlog> => {
  if (defFolder || defaultBlog) {
    let resultArray = [];
    const defaultItem = defaultBlog || defFolder;

    const set = new Set([...arr]);
    set.delete(defaultItem);
    resultArray.push(defaultItem);
    resultArray = resultArray.concat(Array.from(set));
    return resultArray;
  }
  return null;
};

export const removeExtension = (filename: string) => filename.split('.').slice(0, -1).join('.');
