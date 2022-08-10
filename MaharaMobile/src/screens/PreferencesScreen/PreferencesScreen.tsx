import { t, Trans } from '@lingui/macro';
import { Box, Select, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import image from '../../assets/images/no_userphoto.png';
import buttons from '../../assets/styles/buttons';
import styles from '../../assets/styles/variables';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import SubHeading from '../../components/UI/SubHeading/SubHeading';
import { setDefaultBlogId, setDefaultFolder } from '../../store/actions/loginInfo';
// import i18n from '../../i18n';
import { UserBlog, UserFolder } from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectProfileIcon,
  selectToken,
  selectUrl,
  selectUserName
} from '../../store/reducers/loginInfoReducer';
import { RootState } from '../../store/reducers/rootReducer';
import { selectUserBlogs, selectUserFolders } from '../../store/reducers/userArtefactsReducer';
import { fetchProfilePic } from '../../utils/authHelperFunctions';
import { GUEST_TOKEN } from '../../utils/constants';
import { putDefaultAtTop } from '../../utils/formHelper';
import PreferencesScreenStyle from './PreferencesScreen.style';

function PreferencesScreen() {
  const dispatch = useDispatch();

  // Items from reducers
  const url = useSelector((state: RootState) => selectUrl(state));
  const token = useSelector((state: RootState) => selectToken(state));
  const userName = useSelector((state: RootState) => selectUserName(state));
  const pIcon = useSelector((state: RootState) => selectProfileIcon(state));
  const defaultFolderTitle = useSelector((state: RootState) => selectDefaultFolderTitle(state));
  const defaultBlogId = useSelector((state: RootState) => selectDefaultBlogId(state));

  // Component state
  const userFolders = useSelector((state: RootState) => selectUserFolders(state));

  const userBlogs = useSelector((state: RootState) => selectUserBlogs(state));
  const [selectedFolderTitle, setSelectedFolderTitle] = useState(defaultFolderTitle);
  const [selectedBlogId, setSelectedBlogId] = useState(defaultBlogId);

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
    const sortedFolders: Array<UserFolder> = putDefaultAtTop(null, match, userFolders);

    return (
      <View>
        <SubHeading text={t`Destination folder`} />
        <Box>
          <Select
            accessibilityLabel={t`Select folder`}
            selectedValue={selectedFolderTitle}
            onValueChange={(folder: string) => {
              setSelectedFolderTitle(folder);
            }}
          >
            {sortedFolders &&
              sortedFolders.map((f: UserFolder) => {
                const label =
                  f.title === defaultFolderTitle ? `${f.title} - ${t`default`}` : f.title;
                return <Select.Item label={label} value={f.title} key={f.id} />;
              })}
          </Select>
        </Box>
      </View>
    );
  };

  const defaultBlogPicker = () => {
    // Find matching blog to the default blog
    const match: UserBlog = userBlogs.find((b) => b.id === defaultBlogId) ?? userBlogs[0];

    const blogs = putDefaultAtTop(match, null, userBlogs) as Array<UserBlog>;
    return (
      <View>
        <SubHeading text={t`Destination journal`} />

        <Box style={buttons.default}>
          <Select
            accessibilityLabel={t`Select journal`}
            selectedValue={selectedBlogId}
            onValueChange={(blogId: number) => setSelectedBlogId(blogId)}
          >
            {blogs &&
              blogs.map((blog: UserBlog) => {
                const label =
                  blog.id === defaultBlogId ? `${blog.title} - ${t`default`}` : blog.title;
                return <Select.Item label={label} value={blog.id} key={blog.id} />;
              })}
          </Select>
        </Box>
      </View>
    );
  };
  const renderProfile = () => (
    <View>
      <View style={PreferencesScreenStyle.imageContainer}>
        <Image source={pIcon ? { uri: pIcon } : image} style={PreferencesScreenStyle.image} />
      </View>
      <Text style={PreferencesScreenStyle.name}>
        <Trans>Hi</Trans> {userName}
      </Text>
    </View>
  );

  return (
    <View style={PreferencesScreenStyle.view}>
      {renderProfile()}
      <SubHeading style={{ fontSize: styles.font.xl }} text={t`Default options`} />
      {defaultFolderPicker()}
      {defaultBlogPicker()}
      <MediumButton
        text={t`Update preferences`}
        icon={faSave}
        onPress={() => {
          if (selectedBlogId) {
            dispatch(setDefaultBlogId(selectedBlogId));
          }
          if (selectedFolderTitle) {
            dispatch(setDefaultFolder(selectedFolderTitle));
          }
          Alert.alert(
            t`Updated preferences`,
            `${t`Folder`}: ${selectedFolderTitle || defaultFolderTitle}
            \n${t`Journal`}: ${
              userBlogs.find((b: UserBlog) => b.id === selectedBlogId)?.title ||
              userBlogs.find((b: UserBlog) => b.id === defaultBlogId)?.title
            }`
          );
        }}
      />
    </View>
  );
}

export default PreferencesScreen;
