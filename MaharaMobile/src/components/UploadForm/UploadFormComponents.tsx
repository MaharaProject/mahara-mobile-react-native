import React from 'react';
import { Box, HStack, Switch } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { View } from 'react-native';
import styles from '../../assets/styles/variables';
import { UserBlog } from '../../models/models';
import { RequiredWarningText, putDefaultAtTop } from '../../utils/formHelper';
import Dropdown from '../UI/Dropdown/Dropdown';
import SubHeadingColon from '../UI/SubHeadingColon/SubHeadingColon';
import SubHeadingNoColon from '../UI/SubHeadingNoColon/SubHeadingNoColon';

/* eslint-disable @typescript-eslint/no-explicit-any */

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
                    thumbColor={props.isDraft ? styles.colors.primary : ''}
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
                <Dropdown
                    options={blogs.map((blog: UserBlog) => ({
                        label:
                            blog.title === props.defaultBlogTitle
                                ? `${blog.title} - default`
                                : blog.title,
                        value: blog.title
                    }))}
                    selectedValue={props.selectedBlogTitle}
                    onSelect={(title: string) => props.setSelectedBlogTitle(title)}
                    accessibilityLabel={t`Select a journal`}
                />
            )}
        </View>
    );
}

export default BlogPicker;
