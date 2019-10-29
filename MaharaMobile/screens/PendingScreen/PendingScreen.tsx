import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { uploadToMahara, updateUploadList } from '../../actions/actions'
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
    selectedFiles: Array<any> //change to be Array<File>
  }

export class PendingScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploadRequestPending: false,
      uploadRequestReceived: false,
      successMessage: '',
      selectedFiles: []
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

  onDelete() {
    // clear uploadList of selectedFiles
    const newUploadList = this.props.uploadList.filter(item => {
      this.state.selectedFiles.forEach(file => {
        return item.id !== file.id
      })
    })

    // send newUploadList to store
    this.props.dispatch(updateUploadList(newUploadList))
  }

  renderFlatlist() {
    return (
      <View>
        <FlatList
          data={this.props.uploadList}
          extraData={this.state.selectedFiles}
          renderItem={({item}) => {
            const itemSelected = this.state.selectedFiles[item.id]
            return (
              <TouchableOpacity
                // style ={itemSelected && styles.highlighted}
                onLongPress={() => this.handleLongPress(item)}
                onPress={() => this.props.navigation.navigate('UploadFileScreen')}
              />
            )
          }}
        />
      </View>
    )
  }

  handleLongPress(item) {
    const selectedFiles = { ...this.state.selectedFiles }; // copy and mutate new state
    selectedFiles[item.id] = !selectedFiles[item.id];
    this.setState({ selectedFiles });
  }

  render() {
    const { uploadList } = this.props
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state

    return (
      <View style={styles.app}>
        <Header />
        <View style={styles.container}>
          { selectedFiles.length > 0 ? <Button title='Delete' onPress={() => {this.onDelete()}}/> : null }
          { uploadList.length > 0 ? this.renderFlatlist() : <Text>No pending uploads</Text> }
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
    uploadList: state.app.uploadList,
  }
}

export default connect(mapStateToProps)(PendingScreen);
