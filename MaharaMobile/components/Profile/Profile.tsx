import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Profile.style';

type Props = {
  name: string;
  profileIcon: string;
}

export default class Profile extends Component<Props> {
  render() {
    const image: any = require('../../assets/images/no_userphoto.png');

    return (
      <View style={styles.view}>
        <View style={styles.container}>
          <Image source={this.props.profileIcon ? { uri: this.props.profileIcon } : image} style={styles.image} />
        </View>
        <Text style={styles.name}>Hi {this.props.name}</Text>
      </View>
    )
  }
}
