import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Header.style.ts';

export default class Header extends Component {

  render () {

    return (
      <View style={styles.view}>
        <Image source={{uri: '../../assets/images/logo-big.svg'}} style={{width: 30, height: 40}} />
      </View>
    )
  }
}
