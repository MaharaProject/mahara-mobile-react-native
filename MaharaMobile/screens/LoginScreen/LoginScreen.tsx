import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import GetUser from '../../components/GetUser.tsx';
// import ProfileScreen from '../Home/Home.tsx';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      token: ''
    };
  }

  static navigationOptions = {
    header: null,
  };

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
    if(json) {
      const username = json.userprofile.myname;

      this.setState({
        name: username
      });

      this.props.navigation.navigate('Profile', {
        name: this.state.name,
        token: this.state.token
      });
    }
  }

  errorHandle = (error) => {
    console.log('error', error);
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
      <View style={styles.view}>
        {this.state.token === '' ? <GetUser handler={this.handler} style={{padding: 20}} /> : null }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'grey'
  }
});
