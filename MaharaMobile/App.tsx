import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Getuser from './components/Getuser.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      url: 'http://google.com',
      loading: true,
      token: ''
    };
  }

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
      wstoken: this.state.token
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
      this.receiveRequest(json);
    } catch (error) {
      this.errorHandle(error);
    }
  };

  receiveRequest = (json) => {
    this.setState({
     loading: false,
     message: 'Hi ' + json.userprofile.myname + '!'
    });
  }

  errorHandle = (error) => {
    this.setState({
      stuff: 'Unable to connect to server'
    })
    console.log('errorr', error);
  }

  handler = (value) => {
    this.setState({
      token: value
    })
    this.updateState();
  }

  render() {
    let message = this.state.message;

    return (
      <View style={styles.container}>
        <View style={{height: 180, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={{fontSize: 20, color: 'white'}}>Mahara Mobile</Text>
          <View>{this.state.message ? <Text style={{padding: 20}}>{this.state.message}</Text> : null}</View>
        </View>
        <View style={{flex: 1, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Getuser handler={this.handler} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
