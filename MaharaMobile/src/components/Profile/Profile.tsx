import { i18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { Image, Picker, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import forms from '../../assets/styles/forms';
import { UserBlog, UserFolder } from '../../models/models';
import { RootState } from '../../reducers/rootReducer';
import { selectUserBlogs, selectUserFolders } from '../../reducers/userArtefactsReducer';
import { SubHeading } from '../../utils/formHelper';
import ProfileStyle from './Profile.style';

type Props = {
  name: string;
  profileIcon: string;
};

const Profile = (props: Props) => {
  const image: any = require('../../assets/images/no_userphoto.png');
  const userFolders = useSelector((state: RootState) => selectUserFolders(state));
  const userBlogs = useSelector((state: RootState) => selectUserBlogs(state));

  const [defaultFolder, setDefaultFolder] = useState('images');
  const [defaultBlog, setDefaultBlog] = useState(userBlogs[0] || 'No Blogs');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(0);

  const renderFolderPicker = () => (
    <View>
      <SubHeading>
        <Trans>Default Folder</Trans>
      </SubHeading>
      <View style={forms.pickerWrapper}>
        <Picker
          accessibilityLabel={i18n._(t`Select folder`)}
          selectedValue={selectedFolder}
          style={forms.picker}
          onValueChange={(folder: string) => setSelectedFolder(folder)}>
          {userFolders?.map((folder: UserFolder, index: number) => (
            <Picker.Item
              label={folder.title}
              value={folder.title}
              key={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderBlogPicker = () => (
    <View>
      <SubHeading>Default Blog</SubHeading>
      <View style={forms.pickerWrapper}>
        <Picker
          enabled
          prompt="Select Default Blog"
          mode="dialog"
          accessibilityLabel={i18n._(t`Select blog`)}
          selectedValue={selectedBlog}
          style={forms.picker}
          onValueChange={(blogId: number) => {
            setSelectedBlog(blogId);
          }}>
          {userBlogs?.map((blog: UserBlog, index: number) => (
            <Picker.Item label={blog.title} value={blog.id} key={index} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <View style={ProfileStyle.view}>
      <View style={ProfileStyle.profileView}>
        <View style={ProfileStyle.container}>
          <Image
            source={props.profileIcon ? { uri: props.profileIcon } : image}
            style={ProfileStyle.image}
          />
        </View>
        <Text style={ProfileStyle.name}>
          <Trans>Hi</Trans> {props.name ? props.name : 'Guest'}
        </Text>
      </View>
      <View style={ProfileStyle.settingsView}>
        {renderBlogPicker()}
        {renderFolderPicker()}
      </View>
    </View>
  );
};

export default Profile;
