import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Header.style.ts';
import LogoSvg from '../../assets/images/Logo.tsx';

export default class Header extends Component {

  render () {

    return (
      <View style={styles.view}>
        <LogoSvg />
      </View>
    )
  }
}
