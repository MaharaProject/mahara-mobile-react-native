import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import Header from '../../components/Header/Header.tsx';
import GetProfile from '../../components/GetProfile/GetProfile.tsx';
import styles from './ProfileScreen.style.ts';
import { buttons } from '../../assets/styles/buttons.ts';

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      pic: '',
      picLoaded: false
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

  receiveProfilePic = async (json) => {
    const api = 'module_mobileapi_get_user_profileicon&height=100&width=100',
          wstoken = this.props.token,
          serverUrl = 'https://master.dev.mahara.org/module/mobileapi/download.php?wsfunction=' + api + '&wstoken=' + wstoken;

    RNFetchBlob.config({
      fileCache: true
    })
    .fetch('GET', serverUrl)

    .then((res) => {
      console.log('The file saved to ', res.path());

      this.setState({
        pic: 'file://' + res.path(),
        picLoaded: true
      })
    })

    .catch((errorMessage, statusCode) => {
      // error handling
      console.log('error', errorMessage, statusCode);
    })
  }

  componentDidMount() {
    this.receiveProfilePic();
  }

  render() {

    return (
      <View style={styles.app}>
        <Header />
        <View style={styles.container}>
          {this.state.picLoaded ?
            <GetProfile
              style={{paddingTop: 20}}
              token={this.props.token}
              name={this.props.userName}
              tags={this.props.userTags}
              folders={this.props.userFolders}
              image={this.state.pic}
            /> : null}
            <TouchableOpacity onPress={this.goToUploadScreen}>
              <Text style={buttons.large}>Upload a file</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToPendingScreen}>
              <Text style={buttons.large}>Go to Pending Screen</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.app.token,
    userName: state.app.userName,
    userTags: state.app.userTags,
    userFolders: state.app.userFolders,
    userBlogs: state.app.userBlogs
  }
}

export default connect(mapStateToProps)(ProfileScreen);
