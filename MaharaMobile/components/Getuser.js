import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class Getuser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  };

  updateToken = (input) => {
    let token = input.trim();

    this.setState({
      token: token
    })

    console.log(this.state.token);
  }

  render() {

    return (
      <View style={{padding: 10, color: 'black'}}>
        <TextInput
          style={styles.textInputStyle}
          defaultValue='ab6f3b68f8b0b976cf6b51eac2cd54da'
          onChangeText={(token) => this.updateToken(token)}
        />
        <Button
          title="Verify token"
          onPress={() => this.props.handler(this.state.token) }
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    color: 'green',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 40,
  }
})
