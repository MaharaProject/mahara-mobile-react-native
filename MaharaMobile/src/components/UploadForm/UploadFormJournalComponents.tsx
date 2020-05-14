import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import React from 'react';
import {Picker, View} from 'react-native';
import {Switch} from 'react-native-paper';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import {UserBlog} from '../../models/models';
import {putDefaultAtTop} from '../../utils/formHelper';
import RequiredWarningText from '../UI/RequiredWarningText/RequiredWarningText';
import SubHeading from '../UI/SubHeading/SubHeading';

export const BlogPicker = props => {
  // Await the async retrieving data (default blogs)
  const matchingBlog = props.userBlogs.find(
    async (b: UserBlog) => b.id === props.defaultBlogId
  );
  const blogs = putDefaultAtTop(matchingBlog, null, props.userBlogs) as Array<
    UserBlog
  >;

  if (!props.checkUserBlogs) {
    return (
      <RequiredWarningText
        customText={t`Error: You do not have any journals on your site.`}
      />
    );
  }
  return (
    <View>
      <JournalDraftSwitch
        setIsDraft={props.setIsDraft}
        isDraft={props.isDraft}
      />
      <SubHeading>
        <Trans>Journal</Trans>
      </SubHeading>
      <View style={forms.pickerWrapper}>
        <Picker
          accessibilityLabel={i18n._(t`Select a journal`)}
          selectedValue={props.selectedBlog}
          style={forms.picker}
          onValueChange={(blogId: number) => props.setSelectedBlog(blogId)}>
          {blogs.map((blog: UserBlog) => {
            const label =
              blog.id === props.defaultBlogId
                ? `${blog.title} - default`
                : blog.title;
            return <Picker.Item label={label} value={blog.id} key={blog.id} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

type Props = {
  isDraft: boolean;
  setIsDraft: (arg0: boolean) => void;
};

const JournalDraftSwitch = (props: Props) => (
  <View style={{flexDirection: 'row'}}>
    <SubHeading>
      <Trans>Draft journal entry &nbsp;</Trans>
    </SubHeading>
    <Switch
      value={props.isDraft}
      accessibilityRole="switch"
      onValueChange={() => props.setIsDraft(!props.isDraft)}
      color={styles.colors.tertiary}
    />
  </View>
);

export default BlogPicker;
