import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      stuff: '',
      loading: true,
      token: 'ab6f3b68f8b0b976cf6b51eac2cd54da',
      dataSource: []
    };

    updateState =(json) => {
      const token = 'ab6f3b68f8b0b976cf6b51eac2cd54da';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'applications/json' },
        body: JSON.stringify({token})
      };

      fetch("https://master.dev.mahara.org/module/mobileapi/json/info.php", requestOptions)
        .then(response => response.json())
        .then((responseJson)=> receiveRequest(responseJson))
        .catch(error=>errorHandle(error)) //catch the errors if any
    };

    receiveRequest = (json) => {
      this.setState({
       loading: false,
       dataSource: json,
       stuff: 'Loaded info.php'
      });

      // Check to see if webservices & rest enabled

      console.log('json', json);

      if (!json.wsenabled) {
          console.log("Webservices not enabled :(");
          return;
      }

      if (!(Array.isArray(json.wsprotocols) && json.wsprotocols.includes("rest"))) {
          console.log("REST not enabled :(");
          return;
      }

      if (!(Array.isArray(json.logintypes))) {
          console.log("No logintypes???");
          return;
      }
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
        <TextInput
          placeholder="Enter thing here"
          style={styles.textInputStyle}
          placeholderTextColor="black"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text>
          {this.state.text}
          {this.state.stuff}
        </Text>
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
