import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import GetProfile from '../../components/GetProfile/GetProfile.tsx';

import RNFetchBlob from 'rn-fetch-blob';

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
        <View style={styles.view}>
          <Text style={styles.title}>Mahara Mobile</Text>
        </View>
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
            <Button
              title="Upload a file"
              onPress={this.goToUploadScreen}
            />
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

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff'
  },
  view: {
    height: 100,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  message: {
    paddingBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue'
  }
});
