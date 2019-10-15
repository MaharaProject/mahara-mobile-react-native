import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class GetProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: ''
    }
  }

  render() {

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 100, padding: 10}}>
          {this.props.image ?
            <Image source={{uri: this.props.image}}  style={{minWidth: 100, minHeight: 100}} />
          : null }
        </View>
        <Text style={{padding: 20}}>Hi {this.props.name}</Text>
      </View>
    )
  }
}
