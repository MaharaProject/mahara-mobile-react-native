import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {Item, Left, Picker, Right, Switch} from 'native-base';
import React from 'react';
import {View} from 'react-native';
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
      <SubHeading text={t`Journal`} />
      <Item regular>
        <Picker
          mode="dropdown"
          placeholder={i18n._(t`Please select a journal`)}
          accessibilityLabel={i18n._(t`Select a journal`)}
          selectedValue={props.selectedBlog}
          // style={forms.picker}
          onValueChange={(blogId: number) => props.setSelectedBlog(blogId)}>
          {blogs.map((blog: UserBlog) => {
            const label =
              blog.id === props.defaultBlogId
                ? `${blog.title} - default`
                : blog.title;
            return <Picker.Item label={label} value={blog.id} key={blog.id} />;
          })}
        </Picker>
      </Item>
    </View>
  );
};

type Props = {
  isDraft: boolean;
  setIsDraft: (arg0: boolean) => void;
};

const JournalDraftSwitch = (props: Props) => (
  <Item style={{borderColor: styles.colors.light}}>
    <Left>
      <SubHeading text={t`Draft journal entry`} />
    </Left>
    <Right>
      <Switch
        trackColor={{false: '', true: styles.colors.green}}
        value={props.isDraft}
        onValueChange={() => props.setIsDraft(!props.isDraft)}
      />
    </Right>
  </Item>
);

export default BlogPicker;
