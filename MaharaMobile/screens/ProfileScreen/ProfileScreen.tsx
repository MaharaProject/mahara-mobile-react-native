import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import GetProfile from '../../components/GetProfile.tsx';
import UploadFileScreen from '../UploadFileScreen/UploadFileScreen.tsx';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      name: navigation.getParam('name'),
      token: navigation.getParam('token')
    };
  }

  static navigationOptions = {
    title: 'Profile',
  };

  goToUploadScreen = () => {
    this.props.navigation.navigate('UploadFile', {
      token: this.state.token
    });
  }

  render() {

    return (
      <View style={styles.app}>
        <View style={styles.view}>
          <Text style={styles.title}>Mahara Mobile</Text>
        </View>
        <View style={styles.container}>
          <GetProfile style={{paddingTop: 20}} token={this.state.token} name={this.state.name} />
          <Button
            title="Upload a file"
            onPress={this.goToUploadScreen}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff'
  },
  view: {
    height: 100,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  message: {
    paddingBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue'
  }
});
