import {I18n, i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Picker, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDefaultBlogId, setDefaultFolder} from '../../actions/actions';
import image from '../../assets/images/no_userphoto.png';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import ProfileStyle from '../../components/Profile/Profile.style';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import SubHeading from '../../components/UI/SubHeading/SubHeading';
import {UserBlog, UserFolder} from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectProfileIcon,
  selectToken,
  selectUrl,
  selectUserName
} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
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
  const [selectedFolderTitle, setSelectedFolderTitle] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState(0);

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
        <SubHeading>
          <Trans>Destination folder:</Trans>
        </SubHeading>
        <Picker
          accessibilityLabel={i18n._(t`Select folder`)}
          selectedValue={selectedFolderTitle}
          style={forms.picker}
          onValueChange={(folder: string) => {
            setSelectedFolderTitle(folder);
          }}>
          {sortedFolders.map((f: UserFolder) => {
            const label =
              f.title === defaultFolderTitle ? `${f.title} - default` : f.title;
            return <Picker.Item label={label} value={f.title} key={f.id} />;
          })}
        </Picker>
      </View>
    );
  };

  const defaultBlogPicker = () => {
    // Find matching blog to the default blog
    const match = userBlogs.find(b => b.id === defaultBlogId);
    const blogs = putDefaultAtTop(match, null, userBlogs) as Array<UserBlog>;
    return (
      <View>
        <SubHeading>
          <Trans>Destination journal:</Trans>
        </SubHeading>
        <Picker
          accessibilityLabel={i18n._(t`Select journal`)}
          selectedValue={selectedBlogId}
          style={forms.picker}
          onValueChange={(blogId: number) => setSelectedBlogId(blogId)}>
          {blogs.map((blog: UserBlog) => {
            const label =
              blog.id === defaultBlogId
                ? `${blog.title} - default`
                : blog.title;
            return <Picker.Item label={label} value={blog.id} key={blog.id} />;
          })}
        </Picker>
      </View>
    );
  };
  const renderProfile = () => (
    <View>
      <View style={PreferencesScreenStyle.container}>
        <Image
          source={pIcon ? {uri: pIcon} : image}
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
      <SubHeading style={{fontSize: 25}}>
        <Trans>Default options:</Trans>
      </SubHeading>
      {defaultFolderPicker()}
      {defaultBlogPicker()}
      <MediumButton
        title={t`Update preferences`}
        onPress={() => {
          if (selectedBlogId) dispatch(setDefaultBlogId(selectedBlogId));
          if (selectedFolderTitle) {
            dispatch(setDefaultFolder(selectedFolderTitle));
          }
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

PreferencesScreen.navigationOptions = () => ({
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
