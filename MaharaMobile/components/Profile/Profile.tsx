import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from './Profile.style';
import { store } from '../../models/models';

type Props = {
  image: string;
  name: string;
  pic: string;
}

export class Profile extends Component<Props> {
  constructor(props : Props) {
    super(props);
  }

  render() {
    const image: any = require('../../assets/images/no_userphoto.png');

    return (
      <View style={styles.view}>
        <View style={styles.container}>
        <Image source={this.props.pic ? {uri: this.props.pic } : image} style={styles.image} />
        </View>
        <Text style={styles.name}>Hi {this.props.name}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state: store) => {
  return {
    image: state.app.image
  }
}

export default connect(mapStateToProps)(Profile);
