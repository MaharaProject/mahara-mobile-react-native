import {I18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import {Item, Picker} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDefaultBlogId,
  setDefaultFolder
} from '../../store/actions/loginInfo';
import image from '../../assets/images/no_userphoto.png';
import buttons from '../../assets/styles/buttons';
import styles from '../../assets/styles/variables';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import SubHeading from '../../components/UI/SubHeading/SubHeading';
import i18n from '../../i18n';
import {UserBlog, UserFolder} from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectProfileIcon,
  selectToken,
  selectUrl,
  selectUserName
} from '../../store/reducers/loginInfoReducer';
import {RootState} from '../../store/reducers/rootReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../store/reducers/userArtefactsReducer';
import {fetchProfilePic} from '../../utils/authHelperFunctions';
import {GUEST_TOKEN} from '../../utils/constants';
import {putDefaultAtTop} from '../../utils/formHelper';
import PreferencesScreenStyle from './PreferencesScreen.style';

type Props = {
  navigation;
  i18n: I18n;
};

const PreferencesScreen = (props: Props) => {
  const dispatch = useDispatch();

  // Items from reducers
  const url = useSelector((state: RootState) => selectUrl(state));
  const token = useSelector((state: RootState) => selectToken(state));
  const userName = useSelector((state: RootState) => selectUserName(state));
  const pIcon = useSelector((state: RootState) => selectProfileIcon(state));
  const defaultFolderTitle = useSelector((state: RootState) =>
    selectDefaultFolderTitle(state)
  );
  const defaultBlogId = useSelector((state: RootState) =>
    selectDefaultBlogId(state)
  );

  // Component state
  const userFolders = useSelector((state: RootState) =>
    selectUserFolders(state)
  );

  const userBlogs = useSelector((state: RootState) => selectUserBlogs(state));
  const [selectedFolderTitle, setSelectedFolderTitle] = useState(
    defaultFolderTitle
  );
  const [selectedBlogId, setSelectedBlogId] = useState(defaultBlogId);

  useEffect(() => {
    props.navigation.setParams({
      title: props.i18n._(t`Profile settings`)
    });
  }, [props.i18n]);

  const getProfilePic = async () => {
    if (token === GUEST_TOKEN) return;
    fetchProfilePic(dispatch, token, url);
  };

  useEffect(() => {
    getProfilePic();
  }, []);

  const defaultFolderPicker = () => {
    const match = userFolders.find(f => f.title === defaultFolderTitle);
    const sortedFolders: Array<UserFolder> = putDefaultAtTop(
      null,
      match,
      userFolders
    );

    return (
      <View>
        <SubHeading text={t`Destination folder`} />
        <Item regular>
          <Picker
            accessibilityLabel={i18n._(t`Select folder`)}
            selectedValue={selectedFolderTitle}
            onValueChange={(folder: string) => {
              setSelectedFolderTitle(folder);
            }}>
            {sortedFolders &&
              sortedFolders.map((f: UserFolder) => {
                const label =
                  f.title === defaultFolderTitle
                    ? `${f.title} - ${i18n._(t`default`)}`
                    : f.title;
                return <Picker.Item label={label} value={f.title} key={f.id} />;
              })}
          </Picker>
        </Item>
      </View>
    );
  };

  const defaultBlogPicker = () => {
    // Find matching blog to the default blog
    const match: UserBlog =
      userBlogs.find(b => b.id === defaultBlogId) ?? userBlogs[0];

    const blogs = putDefaultAtTop(match, null, userBlogs) as Array<UserBlog>;
    return (
      <View>
        <SubHeading text={t`Destination journal`} />
        <Item regular style={buttons.default}>
          <Picker
            accessibilityLabel={i18n._(t`Select journal`)}
            selectedValue={selectedBlogId}
            onValueChange={(blogId: number) => setSelectedBlogId(blogId)}>
            {blogs &&
              blogs.map((blog: UserBlog) => {
                const label =
                  blog.id === defaultBlogId
                    ? `${blog.title} - ${i18n._(t`default`)}`
                    : blog.title;
                return (
                  <Picker.Item label={label} value={blog.id} key={blog.id} />
                );
              })}
          </Picker>
        </Item>
      </View>
    );
  };
  const renderProfile = () => (
    <View>
      <View style={PreferencesScreenStyle.imageContainer}>
        <Image
          source={pIcon ? {uri: pIcon} : image}
          style={PreferencesScreenStyle.image}
        />
      </View>
      <Text style={PreferencesScreenStyle.name}>
        <Trans>Hi</Trans> {userName}
      </Text>
    </View>
  );

  const intl = {
    updatedPref: t`Updated preferences`,
    fldr: t`Folder`,
    jrnl: t`Journal`
  };

  return (
    <View style={PreferencesScreenStyle.view}>
      {renderProfile()}
      <SubHeading
        style={{fontSize: styles.font.xl}}
        text={t`Default options`}
      />
      {defaultFolderPicker()}
      {defaultBlogPicker()}
      <MediumButton
        text={t`Update preferences`}
        onPress={() => {
          if (selectedBlogId) dispatch(setDefaultBlogId(selectedBlogId));
          if (selectedFolderTitle) {
            dispatch(setDefaultFolder(selectedFolderTitle));
          }
          Alert.alert(
            `${i18n._(intl.updatedPref)}`,
            `${i18n._(intl.fldr)}: ${selectedFolderTitle || defaultFolderTitle} 
            \n${i18n._(intl.jrnl)}: ${userBlogs.find(
              (b: UserBlog) => b.id === selectedBlogId
            )?.title ||
              userBlogs.find((b: UserBlog) => b.id === defaultBlogId)?.title}`
          );
        }}
      />
    </View>
  );
};

export default withI18n()(PreferencesScreen);
