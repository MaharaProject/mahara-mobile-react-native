import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { addToken, userName } from '../../actions/actions.tsx';
import GetUser from '../../components/GetUser.tsx';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  }

  static navigationOptions = {
    header: null,
  };

  login = async (json) => {
    const url = 'https://master.dev.mahara.org/';
    const serverUrl = url + 'webservice/rest/server.php?alt=json';
    const api = 'module_mobileapi_sync';

    const body = {
      blogs: {},
      folders: {},
      tags: {},
      userprofile: {},
      userprofileicon: {},
      wsfunction: "module_mobileapi_sync",
      wstoken: this.state.token
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      this.receiveRequest(json);
    } catch (error) {
      this.errorHandle(error);
    }
  };

  receiveRequest = (json) => {
    if(json) {
      const username = json.userprofile.myname;

      this.props.dispatch(userName(username));

      const blogs = json.blogs.blogs;
      const tags = json.tags.tags;
      const folders = json.folders.folders;

      this.props.navigation.navigate('Profile');
    }
  }

  errorHandle = (error) => {
    console.log('error', error);
  }

  handleToken = (value) => {

    this.setState({token: value}, function() {
      this.login();
    });

    this.props.dispatch(addToken(value));
  }

  render() {

    return (
      <View style={styles.view}>
        <GetUser handler={this.handleToken} style={{padding: 20}} />
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.app.token
  }
}

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'grey'
  }
});
