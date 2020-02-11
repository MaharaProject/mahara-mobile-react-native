/* eslint-disable prettier/prettier */
import { I18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../../components/Profile/Profile';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import { selectProfileIcon, selectToken, selectUrl, selectUserName } from '../../reducers/loginInfoReducer';
import { RootState } from '../../reducers/rootReducer';
import { clearReduxData, fetchProfilePic } from '../../utils/authHelperFunctions';
import profileScreenStyles from './ProfileSettingsScreen.style';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  token: string;
  userName: string;
  url: string;
  profileIcon: string;
  jEntriesIds: string[];
  fileIds: string[];
  i18n: I18n;
};

const ProfileSettingsScreen = (props: Props) => {
  const [profileIcon, setProfileIcon] = useState('');
  const dispatch = useDispatch();
  const url = useSelector((state: RootState) => selectUrl(state));
  const token = useSelector((state: RootState) => selectToken(state));
  const userName = useSelector((state: RootState) => selectUserName(state));
  const pIcon = useSelector((state: RootState) => selectProfileIcon(state));

  useEffect(() => {
    props.navigation.setParams({
      title: props.i18n._(t`Profile Settings`)
    });
  }, [props.i18n]);

  const getProfilePic = async () => {
    if (token === 'guest') return;
    fetchProfilePic(dispatch, token, url);
  };

  // TODO: moved to authHelper in util
  // const signOutAsync = async () => {
  //   await AsyncStorage.clear();
  //   clearReduxData(dispatch);
  //   props.navigation.navigate('SiteCheck');
  // };

  useEffect(() => {
    getProfilePic();
  }, [profileIcon]);

  const generateProfileScreen = () => {
    if (token !== 'guest') {
      return (
        <View>
          <View style={profileScreenStyles.container}>
            <Profile name={userName} profileIcon={pIcon} />
          </View>
          <View style={{ marginTop: 450 }}>
            <MediumButton title={t`Logout`} onPress={signOutAsync} />
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={profileScreenStyles.container}>
          <Profile name={props.i18n._(t`GUEST`)} profileIcon={profileIcon} />
        </View>
        <View style={profileScreenStyles.buttons}>
          <MediumButton title={t`Logout as Guest`} onPress={() => signOutAsync()} />
          <MediumButton title={t`Continue as user`} onPress={() => props.navigation.navigate('SiteCheck')} />
        </View>
      </View>
    );
  };

  return (
    <View style={profileScreenStyles.app}>
      <View style={profileScreenStyles.container}>
        {generateProfileScreen()}
      </View>
    </View>
  );
};

ProfileSettingsScreen.navigationOptions = ({navigation}) => {
  const title = navigation.getParam('title');
  return {
    headerTitle: title
  };
};

export default withI18n()(ProfileSettingsScreen);
