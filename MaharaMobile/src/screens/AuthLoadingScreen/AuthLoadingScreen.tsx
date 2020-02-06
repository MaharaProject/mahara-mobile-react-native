import React, { useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { useDispatch} from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import {
  updateUserBlogs,
  updateUserFolders,
  updateUserName,
  updateUserTags,
  addToken,
  updateLoginTypes,
  updateUrl,
  addFileToUploadList,
  addJournalEntryToUploadList,
  updateProfilePic
} from '../../actions/actions';
import { PendingJournalEntry, MaharaPendingFile } from '../../models/models';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const AuthLoadingScreen = (props: Props) => {
  const dispatch = useDispatch();

  const parseJSON = (jsonString: string) => JSON.parse(jsonString);

  const retrieveAsyncData = async () => {
    try {
      // Sort data strings
      await AsyncStorage.getItem('username').then((result: string) => {
        dispatch(updateUserName(result));
      });

      await AsyncStorage.getItem('userToken').then((result: string) => {
        dispatch(addToken(result));
      });

      await AsyncStorage.getItem('profileIcon').then((result: string) => {
        dispatch(updateProfilePic(result));
      });

      let localLogin = false;
      let tokenLogin = false;
      let ssoLogin = false;

      await AsyncStorage.getItem('localLogin').then((result: string) => {
        if (result) localLogin = JSON.parse(result);
      });

      await AsyncStorage.getItem('tokenLogin').then((result: string) => {
        if (result) tokenLogin = JSON.parse(result);
      });

      await AsyncStorage.getItem('ssoLogin').then((result: string) => {
        if (result) ssoLogin = JSON.parse(result);
      });

      dispatch(updateLoginTypes(null, localLogin, tokenLogin, ssoLogin));

      await AsyncStorage.getItem('url').then((result: string) => {
        dispatch(updateUrl(result));
      });

      // Sort data objects
      await AsyncStorage.getItem('userTags').then((result: string) => {
        if (result) {
          dispatch(updateUserTags(parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('userFolders').then((result: string) => {
        if (result) {
          dispatch(updateUserFolders(parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('userBlogs').then((result: string) => {
        if (result) {
          dispatch(updateUserBlogs(parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('uploadFiles').then((result: string) => {
        if (result) {
          const uploadFilesList = parseJSON(result);
          uploadFilesList.forEach((uploadFile: MaharaPendingFile) => {
            dispatch(addFileToUploadList(uploadFile));
          });
        }
      });

      await AsyncStorage.getItem('uploadJEntries').then((result: string) => {
        if (result) {
          const uploadJEntries = parseJSON(result);
          uploadJEntries.forEach((jEntry: PendingJournalEntry) => {
            dispatch(addJournalEntryToUploadList(jEntry));
          });
        }
      });
    } catch (error) {
      console.log(`Error getting items from AsyncStorage: ${error}`);
    }
  };

  // Fetch userToken from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (userToken !== null) {
      retrieveAsyncData().then(props.navigation.navigate('App'));
    } else props.navigation.navigate('SiteCheck');
  };

  useEffect(() => {
    bootstrapAsync();
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
