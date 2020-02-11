import { i18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, Image, Picker, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import ProfileStyle from '../../components/Profile/Profile.style';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import { UserBlog, UserFolder } from '../../models/models';
import { selectProfileIcon, selectToken, selectUrl, selectUserName } from '../../reducers/loginInfoReducer';
import { RootState } from '../../reducers/rootReducer';
import { selectUserBlogs, selectUserFolders } from '../../reducers/userArtefactsReducer';
import { fetchProfilePic } from '../../utils/authHelperFunctions';
import { SubHeading } from '../../utils/formHelper';
import PreferencesScreenStyle from './PreferencesScreen.style';

const PreferencesScreen = (props: any) => {
  const image: any = require('../../assets/images/no_userphoto.png');

  const dispatch = useDispatch();

  // Items from reducers
  const url = useSelector((state: RootState) => selectUrl(state));
  const token = useSelector((state: RootState) => selectToken(state));
  const userName = useSelector((state: RootState) => selectUserName(state));
  const pIcon = useSelector((state: RootState) => selectProfileIcon(state));

  // Coomponent state
  const [profileIcon, setProfileIcon] = useState('');
  const userFolders = useSelector((state: RootState) => selectUserFolders(state));
  const userBlogs = useSelector((state: RootState) => selectUserBlogs(state));
  const [selectedFolder, setSelectedFolder] = useState('images');
  const [selectedBlogId, setSelectedBlogId] = useState(0);

  useEffect(() => {
    props.navigation.setParams({
      title: props.i18n._(t`Profile Settings`)
    });
  }, [props.i18n]);

  const getProfilePic = async () => {
    if (token === 'guest') return;
    fetchProfilePic(dispatch, token, url);
  };

  useEffect(() => {
    getProfilePic();
  }, [profileIcon]);

  const defaultFolderSelector = () => (
    <View>
      <SubHeading>
        <Trans>Default Folder</Trans>
      </SubHeading>
      <Picker
        accessibilityLabel={i18n._(t`Select folder`)}
        selectedValue={selectedFolder}
        style={forms.picker}
        onValueChange={(folder: string) => {
          setSelectedFolder(folder);
        }}>
        {userFolders?.map((folder: UserFolder, index: number) => (
          <Picker.Item label={folder.title} value={folder.title} key={index} />
        ))}
      </Picker>
    </View>
  );

  const defaultBlogSelector = () => (
    <View>
      <SubHeading>
        <Trans>Default Blog</Trans>
      </SubHeading>
      <Picker
        accessibilityLabel={i18n._(t`Select blog`)}
        selectedValue={selectedBlogId}
        style={forms.picker}
        onValueChange={(blogId: number) => setSelectedBlogId(blogId)}>
        {userBlogs?.map((blog: UserBlog, index: number) => (
          <Picker.Item label={blog.title} value={blog.id} key={index} />
        ))}
      </Picker>
    </View>
  );

  const renderProfile = () => (
    <View>
      <View style={PreferencesScreenStyle.container}>
        <Image
          source={props.profileIcon ? {uri: props.profileIcon} : image}
          style={ProfileStyle.image}
        />
      </View>
      <Text style={PreferencesScreenStyle.name}>
        <Trans>Hi</Trans> {props.name ? props.name : 'Guest'}
      </Text>
    </View>
  );

  return (
    <View>
      {renderProfile()}
      {defaultFolderSelector()}
      {defaultBlogSelector()}
      <MediumButton
        title={t`Update preferences`}
        onPress={() => {
          AsyncStorage.setItem('defaultFolderId', selectedFolder);
          Alert.alert(
            'Updated Preferences',
            `Folder: ${selectedFolder}\nBlog: ${userBlogs[selectedBlogId].title}`
          );
        }}
      />
    </View>
  );
};

PreferencesScreen.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  }
});
export default withI18n()(PreferencesScreen);
