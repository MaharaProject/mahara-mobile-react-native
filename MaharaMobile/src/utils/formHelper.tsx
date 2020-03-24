import {t} from '@lingui/macro';
import {I18n} from '@lingui/react';
import React from 'react';
import {Text} from 'react-native';
import headingStyles from '../assets/styles/headings';
import styles from '../assets/styles/variables';
import {UserBlog, UserFolder} from '../models/models';
import {FILE, JOURNAL_ENTRY, PHOTO} from './constants';

export const setTagString = (tags: Array<string>) => {
  const tagsArray = tags.map(
    (tag: string, index: number) => `${tag}&tags[${index + 1}]=`
  );
  const tagsString = tagsArray.join('');
  const string = `&tags[0]=${tagsString}`;

  return string;
};

export const isValidText = (formType: string, text: string): boolean => {
  if (formType === JOURNAL_ENTRY && text.length === 0) return false;
  if (formType === FILE || formType === PHOTO) return true;
  return true;
};

export const RequiredWarningText = (props: {customText: string}) => (
  <I18n>
    {({i18n}) => (
      <Text style={{color: styles.colors.warn}}>
        {props.customText
          ? i18n._(props.customText)
          : i18n._(t`This field is required.`)}
      </Text>
    )}
  </I18n>
);

export const RedAsterix = () => (
  <Text style={{color: styles.colors.warn}}> *</Text>
);

export const SubHeading = props => (
  <Text style={[headingStyles.subHeading2, props.styles]}>
    {props.children}
    {props.required ? <RedAsterix /> : null}
  </Text>
);

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

export const removeExtension = (filename: string) => {
  return filename
    .split('.')
    .slice(0, -1)
    .join('.');
};
