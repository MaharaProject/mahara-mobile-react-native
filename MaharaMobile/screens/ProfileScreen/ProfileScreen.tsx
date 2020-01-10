import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import styles from './ProfileScreen.style';
import {
  selectUrl,
  selectToken,
  selectUserName,
} from '../../reducers/loginInfoReducer';
import { RootState } from '../../reducers/reducers';
import { buttons } from '../../assets/styles/buttons';

type Props = {
  navigation: any; // need to double check type for this
  token: string;
  userName: string;
  url: string;
};

type State = {
  profileIcon: string;
};

export class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profileIcon: '',
    };
  }

  componentDidMount() {
    this.receiveProfilePic();
  }

  receiveProfilePic = async () => {
    const api = 'module_mobileapi_get_user_profileicon&height=100&width=100';
    const wstoken = this.props.token;
    const serverUrl =
      'https://master.dev.mahara.org/module/mobileapi/download.php?wsfunction=' +
      api +
      '&wstoken=' +
      wstoken;

    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', serverUrl)
      .then(res => {
        const image = `file://${res.path()}`;
        this.setState({
          profileIcon: image,
        });
      })
      .catch(error => {
        // error handling
        console.log(error);
      });
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.app}>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          {this.props.userName !== '' ? (
            <Profile
              name={this.props.userName}
              profileIcon={this.state.profileIcon}
            />
          ) : (
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Auth')}>
                <Text style={[buttons.md, styles.buttons]}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  token: selectToken(state),
  userName: selectUserName(state),
});

export default connect(mapStateToProps)(ProfileScreen);
