import { i18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Picker, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultBlogId, setDefaultFolder } from '../../actions/actions';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import ProfileStyle from '../../components/Profile/Profile.style';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import { UserBlog, UserFolder } from '../../models/models';
import { selectDefaultBlogId, selectDefaultFolderTitle, selectProfileIcon, selectToken, selectUrl, selectUserName } from '../../reducers/loginInfoReducer';
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
  const defaultFolderTitle = useSelector((state: RootState) => selectDefaultFolderTitle(state));
  const defaultBlogId = useSelector((state: RootState) => selectDefaultBlogId(state));

  // Component state
  const [profileIcon, setProfileIcon] = useState('');
  const userFolders = useSelector((state: RootState) => selectUserFolders(state));
  const userBlogs = useSelector((state: RootState) => selectUserBlogs(state));
  const [selectedFolderTitle, setSelectedFolderTitle] = useState('');
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

  const defaultFolderPicker = () => (
    <View>
      <SubHeading>
        <Trans>Default Folder</Trans>: {defaultFolderTitle}
      </SubHeading>
      <Picker
        accessibilityLabel={i18n._(t`Select folder`)}
        selectedValue={selectedFolderTitle}
        style={forms.picker}
        onValueChange={(folder: string) => {
          setSelectedFolderTitle(folder);
        }}>
        <Picker.Item label="Change folder ..."></Picker.Item>
        {userFolders?.map((f: UserFolder, index) => (
          <Picker.Item label={f.title} value={f.title} key={f.id} />
        ))}
      </Picker>
    </View>
  );

  const defaultBlogPicker = () => (
    <View>
      <SubHeading>
        <Trans>Default Blog</Trans>: {userBlogs.find((b: UserBlog) => b.id === defaultBlogId)?.title}
      </SubHeading>
      <Picker
        accessibilityLabel={i18n._(t`Select blog`)}
        selectedValue={selectedBlogId}
        style={forms.picker}
        onValueChange={(blogId: number) => setSelectedBlogId(blogId)}>
        <Picker.Item label="Change blog ..."></Picker.Item>
        {userBlogs?.map((b: UserBlog) => (
          <Picker.Item label={b.title} value={b.id} key={b.id} />
        ))}
      </Picker>
    </View>
  );

  const renderProfile = () => (
    <View>
      <View style={PreferencesScreenStyle.container}>
        <Image
          source={pIcon ? { uri: pIcon } : image}
          style={ProfileStyle.image}
        />
      </View>
      <Text style={PreferencesScreenStyle.name}>
        <Trans>Hi</Trans> {userName}
      </Text>
    </View>
  );

  return (
    <View>
      {renderProfile()}
      {defaultFolderPicker()}
      {defaultBlogPicker()}
      <MediumButton
        title={t`Update preferences`}
        onPress={() => {
          if (selectedBlogId) dispatch(setDefaultBlogId(selectedBlogId));
          if (selectedFolderTitle) dispatch(setDefaultFolder(selectedFolderTitle));
          Alert.alert(
            'Updated Preferences',
            `Folder: ${selectedFolderTitle}
            \nBlog: ${
              userBlogs.find((b: UserBlog) => b.id === selectedBlogId)?.title
            }`
          );
        }}
      />
    </View>
  );
};

PreferencesScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`Preferences`)
});
export default withI18n()(PreferencesScreen);
