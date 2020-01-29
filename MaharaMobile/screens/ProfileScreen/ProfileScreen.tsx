import React, { Component, useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Profile from '../../components/Profile/Profile';
import profileScreenStyles from './ProfileScreen.style';
import {
  selectToken,
  selectUserName,
  selectProfileIcon,
  selectUrl,
} from '../../reducers/loginInfoReducer';
import styles from '../../assets/styles/variables';
import { clearReduxData, fetchProfilePic } from '../../utils/authHelperFunctions';
import { RootState } from '../../reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import HeaderMenuButton from '../../components/UI/HeaderMenuButton/HeaderMenuButton';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { I18n, i18n } from '@lingui/core';


type Props = {
  navigation: any; // need to double check type for this
  token: string;
  userName: string;
  url: string;
  profileIcon: string;
  jEntriesIds: string[];
  fileIds: string[];
  dispatch: any;
  i18n: I18n;
};

type State = {
  profileIcon: string;
};

const ProfileScreen = (props: Props) => {
  const profileStrings = {
    LOGOUT: props.i18n._(t`Logout`),
    GUEST_LOGOUT: props.i18n._(t`Logout as Guest`),
    GUEST: props.i18n._(t`GUEST`),
    CONTINUE_USER: props.i18n._(t`Continue as user`)
  };

  const [profileIcon, setProfileIcon] = useState('');
  const dispatch = useDispatch();

  const url = useSelector((state: RootState) => selectUrl(state));
  const token = useSelector((state: RootState) => selectToken(state));
  const userName = useSelector((state: RootState) => selectUserName(state));
  const pIcon = useSelector((state: RootState) => selectProfileIcon(state));

  const getProfilePic = async () => {
    if (token === 'guest') return;
    fetchProfilePic(dispatch, token, url);
  };

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    clearReduxData(dispatch);
    props.navigation.navigate('SiteCheck');
  };

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
            <MediumButton
              title={profileStrings.LOGOUT}
              onPress={signOutAsync}
            />
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={profileScreenStyles.container}>
          <Profile name={profileStrings.GUEST} profileIcon={profileIcon} />
        </View>
        <View style={profileScreenStyles.buttons}>
          <MediumButton
            title={profileStrings.GUEST_LOGOUT}
            onPress={() => signOutAsync()}
          />
          <MediumButton
            title={profileStrings.CONTINUE_USER}
            onPress={() => props.navigation.navigate('SiteCheck')}
          />
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

ProfileScreen.navigationOptions = (navData: any) => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: '#fff',
  headerLeft: <HeaderMenuButton navData={navData} />,
  headerTitle: 'Profile'
});

export default withI18n()(ProfileScreen);
