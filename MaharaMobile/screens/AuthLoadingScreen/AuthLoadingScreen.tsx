import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
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
import {setUpGuest} from '../../utils/authHelperFunctions';
import {MaharaPendingFile, PendingJournalEntry} from '../../models/models';

type Props = {
  navigation: any;
  dispatch: any;
};

type State = {};

class AuthLoadingScreen extends Component<Props, State> {
  componentDidMount() {
    this.bootstrapAsync();
  }

  // Fetch userToken from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (userToken !== null) {
      this.retrieveAsync().then(this.props.navigation.navigate('App'));
    } else this.props.navigation.navigate('Auth');
  };

  retrieveAsync = async () => {
    try {
      // Sort data strings
      await AsyncStorage.getItem('username').then(async (result: any) => {
        await this.props.dispatch(updateUserName(result));
      });

      let localLogin = false;
      let tokenLogin = false;
      let ssoLogin = false;
      await AsyncStorage.getItem('localLogin').then(async (result: any) => {
        if (result) localLogin = JSON.parse(result);
      });
      await AsyncStorage.getItem('tokenLogin').then(async (result: any) => {
        if (result) tokenLogin = JSON.parse(result);
      });

      await AsyncStorage.getItem('ssoLogin').then(async (result: any) => {
        if (result) ssoLogin = JSON.parse(result);
      });
      this.props.dispatch(
        updateLoginTypes(null, localLogin, tokenLogin, ssoLogin)
      );

      await AsyncStorage.getItem('url').then(async (result: any) => {
        await this.props.dispatch(updateUrl(result));
      });

      await AsyncStorage.getItem('userToken').then(async (result: any) => {
        await this.props.dispatch(addToken(result));
      });
      await AsyncStorage.getItem('profileIcon').then(async (result: any) => {
        await this.props.dispatch(updateProfilePic(result));
      });

      // Sort data objects
      await AsyncStorage.getItem('userTags').then(async (result: any) => {
        if (result) {
          this.props.dispatch(updateUserTags(this.parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('userFolders').then(async (result: any) => {
        if (result) {
          await this.props.dispatch(updateUserFolders(this.parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('userBlogs').then(async (result: any) => {
        if (result) {
          await this.props.dispatch(updateUserBlogs(this.parseJSON(result)));
        }
      });

      await AsyncStorage.getItem('uploadFiles').then(async (result: any) => {
        if (result) {
          const uploadFilesList = this.parseJSON(result);
          uploadFilesList.forEach((uploadFile: MaharaPendingFile) =>
            this.props.dispatch(addFileToUploadList(uploadFile))
          );
        }
      });

      await AsyncStorage.getItem('uploadJEntries').then(async (result: any) => {
        if (result) {
          const uploadJEntries = this.parseJSON(result);
          uploadJEntries.forEach((jEntry: PendingJournalEntry) =>
            this.props.dispatch(addJournalEntryToUploadList(jEntry))
          );
        }
      });
    } catch (error) {
      console.log(`Error getting items from AsyncStorage: ${error}`);
    }
  };

  parseJSON = (jsonString: string) => JSON.parse(jsonString);

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect()(AuthLoadingScreen);
