import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class Getuser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stuff: '',
      url: 'http://google.com',
      loading: true,
      token: 'ab6f3b68f8b0b976cf6b51eac2cd54da',
      pic: 'http://google.com'
    };

    updateState = async (json) => {
      const url = 'https://master.dev.mahara.org/';
      const serverUrl = url + 'webservice/rest/server.php?alt=json';
      const api = 'module_mobileapi_sync';

      const body = {
        blogs: {},
        folders: {},
        tags: {},
        userprofile: {},
        userprofileicon: {},
        wsfunction: "module_mobileapi_sync",
        wstoken: "ab6f3b68f8b0b976cf6b51eac2cd54da"
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      try {
        const response = await fetch(serverUrl, requestOptions);
        const json = await response.json();
        receiveRequest(json);
      } catch (error) {
        errorHandle(error);
      }
    };

    receiveRequest = (json) => {
      console.log(json);

      this.setState({
       loading: false,
       stuff: 'Hi ' + json.userprofile.myname,
       pic: 'Pic: ' + json.userprofileicon.name,
      });
    }

    errorHandle = (error) => {
      this.setState({
        stuff: 'Unable to connect to server'
      })
      console.log(error);
    }
  };

  componentDidMount() {
    updateState();
  }

  render() {

    return (
      <View style={{padding: 10, color: 'black'}}>
        <Text>{this.state.pic}</Text>
        <Text>{this.state.stuff}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    color: 'green',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 40,
  }
})
