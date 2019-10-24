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
      picloaded: false
    }
  }

  static navigationOptions = {
    header: null
  };

  goToUploadScreen = () => {
    this.props.navigation.navigate('UploadFile');
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
        picloaded: true
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
          {this.state.picloaded ?
            <GetProfile
              style={{paddingTop: 20}}
              token={this.props.token}
              name={this.props.username}
              tags={this.props.usertags}
              folders={this.props.userfolders}
              image={this.state.pic}
            /> : null}
            <TouchableOpacity onPress={this.goToUploadScreen}>
              <Text style={buttons.large}>Upload a file</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.app.token,
    username: state.app.username,
    usertags: state.app.tags,
    userfolders: state.app.folders,
    userblogs: state.app.userblogs
  }
}

export default connect(mapStateToProps)(ProfileScreen);
