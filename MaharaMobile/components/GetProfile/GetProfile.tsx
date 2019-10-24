import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './GetProfile.style.ts';

export default class GetProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: ''
    }
  }

  render() {

    return (
      <View style={styles.view}>
        <View style={styles.container}>
          {this.props.image ?
            <Image source={{uri: this.props.image}} style={styles.image} />
          : null }
        </View>
        <Text style={styles.name}>Hi {this.props.name}</Text>
      </View>
    )
  }
}
