import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import styles from './ProfileScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { MaharaStore } from '../../models/models';

type Props = {
  navigation: any; // need to double check type for this
  token: string;
  userName: string;
  url: string;
}

type State = {
  profileIcon: string;
}

export class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      profileIcon: ''
    }
  }

  static navigationOptions = {
    header: null
  };

  goToUploadScreen = () => {
    this.props.navigation.navigate('Add');
  }

  goToPendingScreen = () => {
    this.props.navigation.navigate('PendingScreen');
  }

  receiveProfilePic = async () => {
    const api = 'module_mobileapi_get_user_profileicon&height=100&width=100',
      wstoken = this.props.token,
      serverUrl = 'https://master.dev.mahara.org/module/mobileapi/download.php?wsfunction=' + api + '&wstoken=' + wstoken;

    RNFetchBlob.config({
      fileCache: true
    })
      .fetch('GET', serverUrl)
      .then((res) => {
        const image = `file://${res.path()}`;
        this.setState({
          profileIcon: image
        })
      })
      .catch((error) => {
        // error handling
        console.log(error);
      })
  }

  componentDidMount() {
    this.receiveProfilePic();
  }

  render() {
    return (
      <View style={styles.app}>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          <Profile
            name={this.props.userName}
            profileIcon={this.state.profileIcon}
          />
          <TouchableOpacity onPress={this.goToUploadScreen}>
            <Text style={buttons.lg}>Upload a file</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToPendingScreen}>
            <Text style={buttons.lg}>Go to Pending Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = (state: MaharaStore) => {
  return {
    url: state.app.url,
    token: state.app.token,
    userName: state.app.userName
  }
}

export default connect(mapStateToProps)(ProfileScreen);
