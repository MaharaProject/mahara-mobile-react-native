import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Getuser from './components/Getuser.tsx';
import Uploadfile from './components/Uploadfile.tsx';
import Profile from './components/Profile.tsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: true,
      token: ''
    };
  }


  login = async (json) => {
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
     name: json.userprofile.username
    });
  }

  errorHandle = (error) => {
    this.setState({
      stuff: 'Unable to connect to server'
    })
    console.log('errorr', error);
  }

  handler = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:token');
      this.setState({token: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }

    this.login();
  }

  render() {

    return (
      <View style={styles.app}>
        <View style={styles.view}>
          <Text style={styles.title}>Mahara Mobile</Text>
        </View>
        <View style={styles.container}>
          {this.state.token === '' ? <Getuser handler={this.handler} style={{padding: 20}} /> : null }
          {this.state.token ? <Uploadfile style={{paddingTop: 20}} /> : null }
          {this.state.token ? <Profile style={{paddingTop: 20}} token={this.state.token} name={this.state.name} /> : null }
        </View>
      </View>
    );
  }
};

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
