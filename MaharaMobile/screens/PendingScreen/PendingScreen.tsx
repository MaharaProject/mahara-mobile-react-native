import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { updateUploadList, uploadFileToMahara, uploadJournalToMahara } from '../../actions/actions'
import { MaharaStore, MaharaPendingFile, PendingJournalEntry } from '../../models/models';
import Spinner from '../../components/Spinner/Spinner'
import UploadItem from '../../components/UploadItem/UploadItem';
import PendingList from '../../components/PendingList/PendingList';

type Props =
  {
    uploadList: {
      files: Array<MaharaPendingFile>,
      journalEntries: Array<PendingJournalEntry>
    };
    dispatch: any;
    navigation: any;
  }

type State =
  {
    uploadRequestPending: boolean;
    uploadRequestReceived: boolean;
    successMessage: string;
    selectedFiles: Array<any>
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

  renderFlatlist() {
    return (
      <View>
        <PendingList
          uploadType='file'
          dataList={this.props.uploadList.files}
          onRemove={this.onRemove}
          navigation={this.props.navigation}
        />
        <PendingList
          uploadType='journalEntry'
          dataList={this.props.uploadList.journalEntries}
          onRemove={this.onRemove}
          navigation={this.props.navigation}
        />
      </View>
    )
  }

  /**
   * When users press and hold a card item in the Pending Screen, 'Delete' button appears.
   * Handle which item is selected in state (currently only one selection possible max)
   */
  handleLongPress = (item: MaharaPendingFile | PendingJournalEntry) => {
    const selectedFiles = new Set([...this.state.selectedFiles]); // copy and mutate new state
    selectedFiles.has(item) ? selectedFiles.delete(item) : selectedFiles.add(item);
    this.setState({ selectedFiles: Array.from(selectedFiles) });
  }

  onUploadClick = () => {
    // Upload Files
    this.props.uploadList.files.forEach((uploadFile: MaharaPendingFile) => {
      this.props.dispatch(uploadFileToMahara(uploadFile.url, uploadFile.maharaFormData));
    });

    // Upload Journal Entries 
    this.props.uploadList.journalEntries.forEach((journalEntry: PendingJournalEntry) => {
      this.props.dispatch(uploadJournalToMahara(journalEntry.url, journalEntry.journalEntry));
    });

    // send uploadList to API
    this.setState({
      uploadRequestPending: true
    });

    // received response:
    this.setState({
      uploadRequestPending: false,
      uploadRequestReceived: true,
    });

    // if receive 200 OK status:
    // clear uploadList
    this.props.dispatch(updateUploadList({
      files: [],
      journalEntries: []
    }));

    this.setState({
      successMessage: 'Your files have been uploaded to Mahara'
    })

    // // if receive !200:
    this.setState({
      successMessage: 'It appears that you are offline or some other error has occurred. Please try again later.'
    });
  }

  /**
   * Clear the selected file/journal enty and remove it also from the UploadList
   */
  onDelete = () => {
    const newUploadListFiles = new Set(this.props.uploadList.files);
    this.state.selectedFiles.forEach(file => {
      newUploadListFiles.delete(file);
    });

    const newUploadListJournalEntries = new Set(this.props.uploadList.journalEntries);
    this.state.selectedFiles.forEach(file => {
      newUploadListJournalEntries.delete(file);
    });

    this.props.dispatch(
      updateUploadList({
        files: Array.from(newUploadListFiles),
        journalEntries: Array.from(newUploadListJournalEntries)
      })
    );
    this.setState({
      selectedFiles: []
    });
  }

  /**
   * When the user presses the 'REMOVE' button on the card,
   * Filter out the file or journal entry with the given id and update the UploadList throught dispatch.
   */
  onRemove = (itemId: string) => {
    const updatedFiles = this.props.uploadList.files.filter((file: MaharaPendingFile) => file.id !== itemId)
    const updatedJournalEntries = this.props.uploadList.journalEntries.filter((entry: PendingJournalEntry) => entry.id !== itemId)

    this.props.dispatch(updateUploadList({
      files: updatedFiles,
      journalEntries: updatedJournalEntries
    }));
  }

  render() {
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state

    return (
      <View style={styles.app} >
        <Header navigation={this.props.navigation} />
        <Text>Pending Uploads</Text>
        <View style={styles.container}>
          {/* if there are no items in uploadList, show text */}
          {this.props.uploadList.files.length > 0 || this.props.uploadList.journalEntries.length > 0 ? this.renderFlatlist() : <Text>No pending uploads</Text>}
          {uploadRequestPending ? <Spinner /> : null}
          {/* If state is not uploadRequestPending give success message */}
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
  };
}

export default connect(mapStateToProps)(PendingScreen);
