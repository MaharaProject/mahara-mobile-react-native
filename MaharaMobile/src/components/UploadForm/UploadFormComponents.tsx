import React from 'react';
import { t } from '@lingui/macro';
import { Box, HStack, Select, Switch } from 'native-base';
import { Platform, View } from 'react-native';
import styles from 'assets/styles/variables';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import { UserBlog } from 'models/models';
import { RequiredWarningText, putDefaultAtTop } from 'utils/formHelper';

type Props = {
  isDraft: boolean;
  setIsDraft: (arg0: boolean) => void;
};

function JournalDraftSwitch(props: Props) {
  return (
    <Box style={{ borderColor: styles.colors.light }}>
      <HStack justifyContent="space-between">
        <SubHeading text={t`Draft journal entry`} />
        <Switch
          trackColor={{ false: styles.colors.darkgrey, true: styles.colors.navBarGreen }}
          thumbColor={false ? '' : styles.colors.primary}
          value={props.isDraft}
          onValueChange={() => props.setIsDraft(!props.isDraft)}
        />
      </HStack>
    </Box>
  );
}

export function BlogPicker(props: {
  userBlogs: any[];
  defaultBlogId: number;
  checkUserBlogs: any;
  setIsDraft: (arg0: boolean) => void;
  isDraft: boolean;
  selectedBlog: any;
  setSelectedBlog: (arg0: number) => void;
}) {
  // Await the async retrieving data (default blogs)
  const matchingBlog = props.userBlogs.find(async (b: UserBlog) => b.id === props.defaultBlogId);
  const blogs = putDefaultAtTop(matchingBlog, props.userBlogs);

  return (
    <View>
      <JournalDraftSwitch setIsDraft={props.setIsDraft} isDraft={props.isDraft} />
      <SubHeading required text={t`Journal`} />
      {!props.checkUserBlogs && (
        <RequiredWarningText customText={t`Error: You do not have any journals on your site.`} />
      )}
      <Box>
        <Select
          mode="dropdown"
          placeholder={t`Please select a journal`}
          accessibilityLabel={t`Select a journal`}
          selectedValue={props.selectedBlog}
          // style={forms.picker}
          onValueChange={(blogId: number) => props.setSelectedBlog(blogId)}
        >
          {blogs &&
            blogs.map((blog: UserBlog) => {
              const label =
                blog.id === props.defaultBlogId ? `${blog.title} - default` : blog.title;
              return <Select.Item label={label} value={blog.id} key={blog.id} />;
            })}
        </Select>
      </Box>
    </View>
  );
}

export default BlogPicker;
