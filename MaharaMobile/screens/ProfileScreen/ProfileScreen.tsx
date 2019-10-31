import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import styles from './ProfileScreen.style';
import { buttons } from '../../assets/styles/buttons';


type Props = {
  navigation: any; // need to double check type for this
  token: string;
}

type State = {
  pic: string;
  picLoaded: boolean;
}

export class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      pic: ''
    }
  }

  static navigationOptions = {
    header: null
  };

  goToUploadScreen = () => {
    this.props.navigation.navigate('Add');
  }

  goToPendingScreen = () => {
    this.props.navigation.navigate('PendingScreen');
  }

  receiveProfilePic = async () => {
    const api = 'module_mobileapi_get_user_profileicon&height=100&width=100',
          wstoken = this.props.token,
          serverUrl = 'https://master.dev.mahara.org/module/mobileapi/download.php?wsfunction=' + api + '&wstoken=' + wstoken;

    RNFetchBlob.config({
      fileCache: true
    })
    .fetch('GET', serverUrl)

    .then((res) => {
      console.log('The file saved to ', res.path());

      this.setState({
        pic: 'file://' + res.path()
      })
    })

    .catch((errorMessage, statusCode) => {
      // error handling
      console.log('error', errorMessage, statusCode);
    })
  }

  componentDidMount() {
    this.receiveProfilePic();
  }

  render() {
    return (
      <View style={styles.app}>
        <Header />
        <View style={styles.container}>
            <Profile
              token={this.props.token}
              name={this.props.userName}
              tags={this.props.userTags}
              blogs={this.props.userBlogs}
              folders={this.props.userFolders}
              image={this.state.pic}
            />
            <TouchableOpacity onPress={this.goToUploadScreen}>
              <Text style={buttons.large}>Upload a file</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToPendingScreen}>
              <Text style={buttons.large}>Go to Pending Screen</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.app.token,
    userName: state.app.userName
  }
}

export default connect(mapStateToProps)(ProfileScreen);
