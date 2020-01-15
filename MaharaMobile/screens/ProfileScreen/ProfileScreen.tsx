import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import styles from './ProfileScreen.style';
import {
  selectUrl,
  selectToken,
  selectUserName,
  selectProfileIcon
} from '../../reducers/loginInfoReducer';
import MediumButton from '../../components/MediumButton/MediumButton';
import { clearReduxData, fetchProfilePic } from '../../utils/authHelperFunctions';
import { selectAllJEntriesIds } from '../../reducers/uploadJEntriesReducer';
import { selectAllUploadFilesIds } from '../../reducers/uploadFilesReducer';
import { RootState } from '../../reducers/rootReducer';

type Props = {
  navigation: any; // need to double check type for this
  token: string;
  userName: string;
  url: string;
  profileIcon: string;
  jEntriesIds: string[];
  fileIds: string[];
  dispatch: any;
};

type State = {
  profileIcon: string;
};

export class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profileIcon: ''
    };
  }

  componentDidMount() {
    this.getProfilePic();
  }

  getProfilePic = async () => {
    if (!this.props.token || this.props.token === 'guest') return;
    fetchProfilePic(this.props.dispatch, this.props.token);
  };

  signOutAsync = async () => {
    await AsyncStorage.clear();
    clearReduxData(this.props.dispatch);
    this.props.navigation.navigate('Auth');
  };

  generateProfileScreen = () => {
    if (this.props.token !== 'guest') {
      return (
        <View>
          <View style={styles.container}>
            <Profile
              name={this.props.userName}
              profileIcon={this.props.profileIcon}
            />
          </View>
          <View style={{ marginTop: 450 }}>
            <MediumButton title="Logout" onPress={this.signOutAsync} />
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.container}>
          <Profile
            name={this.props.userName}
            profileIcon={this.state.profileIcon || this.props.profileIcon}
          />
        </View>
        <View style={styles.buttons}>
          <MediumButton
            title="Logout as Guest"
            onPress={() => this.signOutAsync()}
          />
          <MediumButton
            title="Login"
            onPress={() => this.props.navigation.navigate('Auth')}
          />
        </View>
      </View>
    );
  };

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.app}>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>{this.generateProfileScreen()}</View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  token: selectToken(state),
  userName: selectUserName(state),
  profileIcon: selectProfileIcon(state),
  jEntryIds: selectAllJEntriesIds(state),
  fileIds: selectAllUploadFilesIds(state)
});

export default connect(mapStateToProps)(ProfileScreen);
