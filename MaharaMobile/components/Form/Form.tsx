import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from './Form.style.ts';

export default class Form extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.view}>
        <Text>Hi</Text>
      </View>
    )
  }
}
