import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { updateUploadList, uploadFileToMahara } from '../../actions/actions'
import { MaharaFile, MaharaStore, MaharaPendingFile } from '../../models/models';
import Spinner from '../../components/Spinner/Spinner'
import UploadItem from '../../components/UploadItem/UploadItem';

type Props =
  {
    uploadList: Array<MaharaPendingFile>;
    dispatch: any;
    navigation: any;
  }

type State =
  {
    uploadRequestPending: boolean;
    uploadRequestReceived: boolean;
    successMessage: string;
    selectedFiles: Array<MaharaPendingFile>
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

  // Handlers
  editFileHandler = (fileId: string) => this.props.navigation.navigate({
    routeName: 'FileDetails',
    params: {
      fileId: fileId
    }
  })

  // static navigationOptions = {
  //   header: null
  // };

  renderFlatlist() {
    return (
      <View>
        <FlatList
          data={this.props.uploadList}
          extraData={this.state.selectedFiles}
          renderItem={({ item }) => {
            let isItemSelected = false;
            if (this.state.selectedFiles) {
              this.state.selectedFiles.forEach(file => {
                return (file.id === item.id) ? isItemSelected = true : false
              })
            }
            return (
              <TouchableOpacity
                style={isItemSelected && styles.highlighted}
                onPress={() => this.props.navigation.navigate('UploadFileScreen')}
                onLongPress={() => this.handleLongPress(item)}
              >
                {/* <Text>ID: {item.id}</Text> */}
                <UploadItem
                  file={item}
                  onRemove={this.onRemove}
                  onEdit={() => this.editFileHandler.bind(this)}
                />

              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  handleLongPress = (item: MaharaPendingFile) => {
    const selectedFiles = new Set([...this.state.selectedFiles]); // copy and mutate new state
    selectedFiles.has(item) ? selectedFiles.delete(item) : selectedFiles.add(item);
    this.setState({ selectedFiles: Array.from(selectedFiles) });
  }

  onUploadClick = () => {
    this.props.uploadList.forEach((uploadFile: MaharaPendingFile) => {
      this.props.dispatch(uploadFileToMahara(uploadFile.tagsUrl, uploadFile.maharaFormData));
    });
    // send uploadList to API
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
    this.props.dispatch(updateUploadList([]))

    this.setState({
      successMessage: 'Your files have been uploaded to Mahara'
    })

    // // if receive !200:
    this.setState({
      successMessage: 'It appears that you are offline or some other error has occurred. Please try again later.'
    })
  }

  onDelete = () => {
    const newUploadList = new Set(this.props.uploadList)
    this.state.selectedFiles.forEach(file => {
      newUploadList.delete(file);
    })

    this.props.dispatch(updateUploadList(Array.from(newUploadList)))
    this.setState({
      selectedFiles: []
    })
  }

  onRemove = (fileId: string) => {
    console.log('here')
    const newUploadList = this.props.uploadList.filter(file => file.id !== fileId)
    console.log('New Upload List');
    console.log(newUploadList)
    this.props.dispatch(updateUploadList(newUploadList));

  }

  render() {
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state

    return (
      <View style={styles.app} >
        <Header navigation={this.props.navigation} />
        <Text>Pending Uploads</Text>
        <View style={styles.container}>
          {/* if file is selected, show the Delete button */}
          {selectedFiles.length > 0 ? <Button title='Delete' onPress={this.onDelete} /> : null}

          {/* if there are no items in uploadList, show text */}
          {this.props.uploadList.length > 0 ? this.renderFlatlist() : <Text>No pending uploads</Text>}

          {/* If state is uploadRequestPending, show spinner */}
          {uploadRequestPending ? <Spinner /> : null}

          {/* If sate is not uploadRequestPending give successm message */}
          {!uploadRequestPending && uploadRequestReceived ? <Text>{successMessage}</Text> : null}
          <TouchableOpacity onPress={this.onUploadClick}>
            <Text style={buttons.lg}>Upload to your Mahara</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = (state: MaharaStore) => {
  return {
    token: state.app.token,
    uploadList: state.app.uploadList,
  }
}

export default connect(mapStateToProps)(PendingScreen);
