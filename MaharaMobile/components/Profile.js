import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: '',
      picloaded: false
    }
  }

  receiveProfile = async (json) => {
    const api = 'module_mobileapi_get_user_profileicon',
      wstoken = this.props.token,
      serverUrl = 'https://master.dev.mahara.org/module/mobileapi/download.php?wsfunction=' + api + '&wstoken=' + wstoken;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'image/jpeg'
      }
    };

    const text = `<Text>Hi</Text>`;

    try {
      const response = await fetch(serverUrl, requestOptions);
      const blob = await response.blob();
      const fileReaderInstance = new FileReader();
       fileReaderInstance.readAsDataURL(blob);
       fileReaderInstance.onload = () => {
           base64data = fileReaderInstance.result;
           console.log(base64data);
           this.setState({
             picloaded: true,
             pic: `data:image/gif;base64,{${base64data}}`
           })
       }
    } catch(error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.receiveProfile();
  }

  render() {

    return (
      <View>
        {this.text}
      {this.state.pic ?
        <Image source={{uri: this.state.pic}}  style={{width: 200, height: 100}} />
        : null
      }
      </View>
    )
  }
}
