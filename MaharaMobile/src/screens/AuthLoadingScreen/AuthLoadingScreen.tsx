import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {PendingJEntry, PendingMFile} from '../../models/models';
import {
  updateLoginTypes,
  updateTaggedItemsFromAsync,
  updateUserTags,
  updateUserTagsIds
} from '../../store/actions/actions';
import {
  addToken,
  setDefaultBlogId,
  setDefaultFolder,
  setDidTryAL,
  updateProfilePic,
  updateUrl,
  updateUserName
} from '../../store/actions/loginInfo';
import {addFileToUploadList} from '../../store/actions/uploadFiles';
import {addJournalEntryToUploadList} from '../../store/actions/uploadJEntries';
import {
  updateUserBlogs,
  updateUserFolders
} from '../../store/actions/userArtefacts';
import {
  DEFAULT_BLOG_ID,
  DEFAULT_FOLDER_TITLE,
  TAGGED_ITEMS,
  TAGS_IDS,
  USER_TAGS
} from '../../utils/constants';

const AuthLoadingScreen = () => {
  const dispatch = useDispatch();

  const parseJSON = (jsonString: string) => JSON.parse(jsonString);

  const retrieveAsyncData = async () => {
    console.log('retrieveAsyncData');
    try {
      // Sort data strings
      await AsyncStorage.getItem('username').then((result: string) => {
        dispatch(updateUserName(result));
      });

      await AsyncStorage.getItem('userToken').then((result: string) => {
        dispatch(addToken(result));
      });

      await AsyncStorage.getItem('profileIcon').then(
        (result: string | null) => {
          result != null
            ? dispatch(updateProfilePic(result))
            : dispatch(updateProfilePic(''));
        }
      );

      let localLogin = false;
      let tokenLogin = false;
      let ssoLogin = false;

      await AsyncStorage.getItem('localLogin').then((result: string | null) => {
        if (result) localLogin = JSON.parse(result);
      });

      await AsyncStorage.getItem('tokenLogin').then((result: string | null) => {
        if (result) tokenLogin = JSON.parse(result);
      });

      await AsyncStorage.getItem('ssoLogin').then((result: string | null) => {
        if (result) ssoLogin = JSON.parse(result);
      });

      dispatch(updateLoginTypes(null, localLogin, tokenLogin, ssoLogin));

      await AsyncStorage.getItem('url').then((result: string | null) => {
        result != null ? dispatch(updateUrl(result)) : dispatch(updateUrl(''));
      });

      await AsyncStorage.getItem(DEFAULT_FOLDER_TITLE).then(
        (result: string | null) => {
          if (result) {
            dispatch(setDefaultFolder(result));
          }
        }
      );

      // Sort data objects
      await AsyncStorage.getItem(USER_TAGS).then((result: string | null) => {
        if (result) {
          dispatch(updateUserTags(parseJSON(result)));
        }
      });

      await AsyncStorage.getItem(TAGS_IDS).then((result: string) => {
        dispatch(updateUserTagsIds(parseJSON(result)));
      });

      await AsyncStorage.getItem(TAGGED_ITEMS).then((result: string | null) => {
        if (result) {
          dispatch(updateTaggedItemsFromAsync(parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('userFolders').then(
        (result: string | null) => {
          if (result) {
            dispatch(updateUserFolders(parseJSON(result)));
          }
        }
      );

      await AsyncStorage.getItem('userBlogs').then((result: string | null) => {
        if (result) {
          dispatch(updateUserBlogs(parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('uploadFiles').then(
        (result: string | null) => {
          if (result) {
            const uploadFilesList = parseJSON(result);
            uploadFilesList.forEach((uploadFile: PendingMFile) => {
              dispatch(addFileToUploadList(uploadFile));
            });
          }
        }
      );

      await AsyncStorage.getItem('uploadJEntries').then(
        (result: string | null) => {
          if (result) {
            const uploadJEntries = parseJSON(result);
            uploadJEntries.forEach((jEntry: PendingJEntry) => {
              dispatch(addJournalEntryToUploadList(jEntry));
            });
          }
        }
      );

      // TODO ? Object - because blogId is a number TODO
      await AsyncStorage.getItem(DEFAULT_BLOG_ID).then(
        (result: string | null) => {
          if (result) {
            const defaultBlogId = parseJSON(result);
            dispatch(setDefaultBlogId(defaultBlogId));
          }
        }
      );
    } catch (error) {
      // console.log(`Error getting items from AsyncStorage: ${error}`);
    }
  };

  // Fetch userToken from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (userToken !== null) {
      retrieveAsyncData()
        .then
        // () => props.navigation.navigate('App')
        ();
    } else {
      // props.navigation.navigate('SiteCheck')
      dispatch(setDidTryAL());
    }
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
