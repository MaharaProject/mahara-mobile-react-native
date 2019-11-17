import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faPlusCircle, faHistory } from '@fortawesome/free-solid-svg-icons';
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
          <TouchableOpacity style={styles.button} onPress={()=> {
              this.props.navigation.navigate('Profile');
          }}>
            <FontAwesomeIcon style={styles.icon} size={18} icon={ faUser } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> {
              this.props.navigation.navigate('Add');
          }}>
            <FontAwesomeIcon style={styles.icon} size={18} icon={ faPlusCircle } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> {
              this.props.navigation.navigate('PendingScreen');
          }}>
            <FontAwesomeIcon style={styles.icon} size={18} icon={ faHistory } />
          </TouchableOpacity>
        </View>
        <LogoSvg />
      </View>
    )
  }
}
