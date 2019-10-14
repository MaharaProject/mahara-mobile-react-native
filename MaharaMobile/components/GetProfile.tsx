import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

export default class GetProfile extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      pic: '',
      picloaded: false
    }
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
        picloaded: true,
        pic: 'file://' + res.path()
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this.state.pic ?
          <View style={{width: 100, padding: 10}}>
            <Image source={{uri: this.state.pic}}  style={{minWidth: 100, minHeight: 100}} />
          </View>
          : null
        }
        <Text style={{padding: 20}}>Hi {this.props.name}</Text>
      </View>
    )
  }
}
