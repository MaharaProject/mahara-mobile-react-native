import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { uploadToMahara } from '../../actions/actions'
import Card from '../../components/Card/Card'
import Spinner from '../../components/Spinner/Spinner'

type Props =
  {
    uploadList: Array<any>; // change to be Array<File>
    dispatch: Function; // TODO ?
  }

type State =
  {
    uploadRequestPending: boolean;
    uploadRequestReceived: boolean;
    successMessage: string;
  }

export class PendingScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploadRequestPending: false,
      uploadRequestReceived: false,
      successMessage: ''
    }
  }

  static navigationOptions = {
    header: null
  };

  onUploadClick() {
    // send uploadList to API
    this.props.dispatch(uploadToMahara(this.props.uploadList))
    this.setState({
      uploadRequestPending: true
    })

    // received response:
    this.setState({
      uploadRequestPending: false,
      uploadRequestReceived: true,
    })

    // if receive 200 OK status:
    // clear uploadList
    this.setState({
      successMessage: 'Your files have been uploaded to Mahara'
    })

    // if receive !200:
    this.setState({
      successMessage: 'It appears that you are offline or some other error has occurred. Please try again later.'
    })
  }

  render() {
    const { uploadList } = this.props
    const { uploadRequestPending, uploadRequestReceived, successMessage } = this.state

    let cardDisplay = uploadList.map( card => {
      <Card
        title={card.title}
        description={card.description}
      />
    })

    return (
      <View style={styles.app}>
        <Header />
        <View style={styles.container}>
          { uploadList.length > 0 ? cardDisplay : <Text>No pending uploads</Text> }
          { uploadRequestPending ? <Spinner /> : null }
          { !uploadRequestPending && uploadRequestReceived ? successMessage : null}
          <TouchableOpacity onPress={this.onUploadClick}>
            <Text style={buttons.large}>Upload to your Mahara</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.app.token,
    uploadList: state.app.uploadList
  }
}

export default connect(mapStateToProps)(PendingScreen);
