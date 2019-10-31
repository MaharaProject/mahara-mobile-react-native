import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './Profile.style.ts';

export default class Profile extends Component {
  constructor(props) {
    super(props);
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
