import React, { useCallback, useEffect, useState } from 'react';
import { faSave, faSync } from '@fortawesome/free-solid-svg-icons';
import { Box, Select, Spacer, Text, VStack } from '@gluestack-ui/themed-native-base';
import { Trans, t } from '@lingui/macro';
import { Alert, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import image from 'assets/images/no_userphoto.png';
import buttons from 'assets/styles/buttons';
import generic from 'assets/styles/generic';
import styles from 'assets/styles/variables';
import MediumButton from 'components/UI/MediumButton/MediumButton';
import MediumButtonDark from 'components/UI/MediumButtonDark/MediumButtonDark';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import SubHeadingNoColon from 'components/UI/SubHeadingNoColon/SubHeadingNoColon';
import { UserBlog, UserFolder } from 'models/models';
import { setDefaultBlogTitle, setDefaultFolder } from 'store/actions/loginInfo';
// import i18n from 'i18n';
import {
    selectDefaultBlogTitle,
    selectDefaultFolderTitle,
    selectProfileIcon,
    selectToken,
    selectUrl,
    selectUserName
} from 'store/reducers/loginInfoReducer';
import { RootState } from 'store/reducers/rootReducer';
import { selectUserBlogs, selectUserFolders } from 'store/reducers/userArtefactsReducer';
import { fetchProfilePic, login } from 'utils/authHelperFunctions';
import { GUEST_TOKEN } from 'utils/constants';
import { putDefaultAtTop } from 'utils/formHelper';
import { maharaTheme } from 'utils/theme';
import PreferencesScreenStyle from './PreferencesScreen.style';

function PreferencesScreen() {
    const dispatch = useDispatch();

    // Items from reducers
    const url = useSelector((state: RootState) => selectUrl(state));
    const token = useSelector((state: RootState) => selectToken(state));
    const userName = useSelector((state: RootState) => selectUserName(state));
    const pIcon = useSelector((state: RootState) => selectProfileIcon(state));
    const defaultFolderTitle = useSelector((state: RootState) => selectDefaultFolderTitle(state));
    const defaultBlogTitle = useSelector((state: RootState) => selectDefaultBlogTitle(state));

    // Component state
    const userFolders = useSelector((state: RootState) => selectUserFolders(state));
    const userBlogs = useSelector((state: RootState) => selectUserBlogs(state));

    const [selectedFolderTitle, setSelectedFolderTitle] = useState(defaultFolderTitle);
    const [selectedBlogTitle, setSelectedBlogTitle] = useState(defaultBlogTitle);

    const getProfilePic = useCallback(async () => {
        if (token !== GUEST_TOKEN) {
            fetchProfilePic(dispatch, token, url);
        }
    }, [dispatch, token, url]);

    useEffect(() => {
        getProfilePic();
    }, [getProfilePic]);

    const defaultFolderPicker = () => {
        const match = userFolders.find((f) => f.title === defaultFolderTitle);
        const sortedFolders = putDefaultAtTop(match, userFolders);

        return (
            <View>
                {sortedFolders.length === 0 && <SubHeadingNoColon text={t`No folders found`} />}
                {sortedFolders.length === 1 && (
                    <SubHeadingNoColon text={t`Default folder: ${selectedFolderTitle}`} />
                )}
                {sortedFolders.length > 1 && <SubHeadingNoColon text={t`Default folder`} />}
                {sortedFolders.length > 1 && (
                    <Box>
                        <Select
                            size="lg"
                            color={maharaTheme.colors.dark}
                            accessibilityLabel={t`Select folder`}
                            selectedValue={defaultFolderTitle}
                            onValueChange={(folder: string) => {
                                setSelectedFolderTitle(folder);
                            }}
                        >
                            {sortedFolders &&
                                sortedFolders.map((folder: UserFolder) => {
                                    const label =
                                        folder.title === defaultFolderTitle
                                            ? `${folder.title} - ${t`default`}`
                                            : folder.title;
                                    return (
                                        <Select.Item
                                            label={label}
                                            value={folder.title}
                                            key={folder.id}
                                        />
                                    );
                                })}
                        </Select>
                    </Box>
                )}
            </View>
        );
    };

    const defaultBlogPicker = () => {
        // Find matching blog to the default blog
        const blogs = userBlogs ?? [];
        // const match: UserBlog = userBlogs.find((b) => b.title == defaultBlogTitle);
        // const blogs = putDefaultAtTop(match, userBlogs);
        console.log(defaultBlogTitle);
        return (
            <View>
                {blogs.length === 0 && <SubHeadingNoColon text={t`No journals found`} />}
                {blogs.length === 1 && (
                    <SubHeadingNoColon text={t`Default journal: ${defaultBlogTitle}`} />
                )}
                {blogs.length > 1 && <SubHeadingNoColon text={t`Default journal`} />}

                {blogs.length > 1 && (
                    <Box style={buttons.default}>
                        <Select
                            size="lg"
                            color={maharaTheme.colors.dark}
                            accessibilityLabel={t`Select journal`}
                            selectedValue={selectedBlogTitle}
                            onValueChange={(title: string) => {
                                setSelectedBlogTitle(title);
                            }}
                        >
                            {blogs &&
                                blogs.map((blog: UserBlog) => {
                                    const label =
                                        blog.title === defaultFolderTitle
                                            ? `${blog.title} - ${t`default`}`
                                            : blog.title;
                                    return (
                                        <Select.Item
                                            label={label}
                                            value={blog.title}
                                            key={blog.id}
                                        />
                                    );
                                })}
                        </Select>
                    </Box>
                )}
            </View>
        );
    };
    const renderProfile = () => (
        <View>
            <View style={PreferencesScreenStyle.imageContainer}>
                <Image
                    source={pIcon ? { uri: pIcon } : image}
                    style={PreferencesScreenStyle.image}
                />
            </View>
            <Text style={{ ...PreferencesScreenStyle.name, ...generic.regularText }}>
                {userName}
            </Text>
        </View>
    );

    return (
        <View style={PreferencesScreenStyle.view}>
            <VStack space="xl">
                {renderProfile()}
                {defaultFolderPicker()}
                {defaultBlogPicker()}
            </VStack>
            <Spacer />
            <MediumButtonDark
                text={t`Update preferences`}
                icon={faSave}
                onPress={() => {
                    if (selectedBlogTitle) {
                        dispatch(setDefaultBlogTitle(selectedBlogTitle));
                    }
                    if (selectedFolderTitle) {
                        dispatch(setDefaultFolder(selectedFolderTitle));
                    }
                    Alert.alert(
                        t`Updated preferences`,
                        `${t`Folder`}: ${selectedFolderTitle || defaultFolderTitle}
            \n${t`Journal`}:  ${selectedBlogTitle || defaultBlogTitle}`
                    );
                }}
            />
            <View style={{ padding: 5 }} />
            <MediumButtonDark
                text={t`Sync`}
                icon={faSync}
                onPress={() => {
                    login(url, dispatch, userBlogs, userFolders, token, null, null, false);
                }}
            />
        </View>
    );
}

export default PreferencesScreen;
