import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Header.style';
import LogoSvg from '../../assets/images/Logo';

type Props = {
  navigation: any;
}

export default class Header extends Component<Props> {
  render () {
    return (
      <View style={styles.view}>
        <View style={styles.buttonWrap}>
          <TouchableOpacity onPress={()=> {
              this.props.navigation.navigate('Profile');
          }}>
            <Text style={styles.button}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
              this.props.navigation.navigate('Add');
          }}>
            <Text style={styles.button}>Add stuff</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
              this.props.navigation.navigate('PendingScreen');
          }}>
            <Text style={styles.button}>Pending</Text>
          </TouchableOpacity>
        </View>
        <LogoSvg />
      </View>
    )
  }
}
