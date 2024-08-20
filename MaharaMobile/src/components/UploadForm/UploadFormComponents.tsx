import React from 'react';
import { Box, HStack, Select, Switch } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { Platform, View } from 'react-native';
import styles from 'assets/styles/variables';
import SubHeadingColon from 'components/UI/SubHeadingColon/SubHeadingColon';
import SubHeadingNoColon from 'components/UI/SubHeadingNoColon/SubHeadingNoColon';
import { UserBlog } from 'models/models';
import { RequiredWarningText, putDefaultAtTop } from 'utils/formHelper';
import { maharaTheme } from 'utils/theme';

type Props = {
    isDraft: boolean;
    setIsDraft: (arg0: boolean) => void;
};

function JournalDraftSwitch(props: Props) {
    return (
        <Box style={{ borderColor: styles.colors.light }}>
            <HStack justifyContent="space-between">
                <SubHeadingColon text={t`Draft journal entry`} />
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
    defaultBlogTitle: string;
    checkUserBlogs: any;
    setIsDraft: (arg0: boolean) => void;
    isDraft: boolean;
    selectedBlogTitle: string;
    setSelectedBlogTitle: any;
}) {
    // Await the async retrieving data (default blogs)
    // const matchingBlog = props.userBlogs.find(async (b: UserBlog) => b.title == props.defaultBlogTitle);
    // const selectedBlog = props.userBlogs.find(async (b: UserBlog) => b.title == props.selectedBlogTitle);

    // console.log(selectedBlog.title)

    // const blogs = putDefaultAtTop(matchingBlog, props.userBlogs);
    const blogs = props.userBlogs;

    return (
        <View>
            <JournalDraftSwitch setIsDraft={props.setIsDraft} isDraft={props.isDraft} />
            {blogs.length === 1 && (
                <SubHeadingNoColon text={t`Journal: ${props.selectedBlogTitle}`} />
            )}
            {blogs.length > 1 && <SubHeadingColon required text={t`Journal`} />}
            {!props.checkUserBlogs && (
                <RequiredWarningText
                    customText={t`Error: You do not have any journals on your site.`}
                />
            )}
            {blogs.length > 1 && (
                <Box>
                    <Select
                        height={styles.heights.input}
                        size="lg"
                        placeholder={t`Please select a journal`}
                        accessibilityLabel={t`Select a journal`}
                        selectedValue={props.selectedBlogTitle}
                        color={maharaTheme.colors.dark}
                        onValueChange={(title: string) => props.setSelectedBlogTitle(title)}
                    >
                        {blogs &&
                            blogs.map((blog: UserBlog) => {
                                const label =
                                    blog.title === props.defaultBlogTitle
                                        ? `${blog.title} - default`
                                        : blog.title;
                                return (
                                    <Select.Item label={label} value={blog.title} key={blog.id} />
                                );
                            })}
                    </Select>
                </Box>
            )}
        </View>
    );
}

export default BlogPicker;
