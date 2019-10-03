import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class Profile extends Component {
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

    RNFetchBlob.fetch('GET', serverUrl)

    .then((res) => {
      let status = res.info().status;

      if(status == 200) {
        let base64Str = res.base64();
        this.setState({
          picloaded: true,
          pic: `data:'image/jpeg';base64,${base64Str}`
        });
      } else {
        // TODO: handle other status codes
      }
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
