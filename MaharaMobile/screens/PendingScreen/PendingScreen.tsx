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
    selectedFiles: Array<any>;
    uploadFilesExist: boolean;
  }

export class PendingScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploadRequestPending: false,
      uploadRequestReceived: false,
      successMessage: '',
      selectedFiles: [],
      uploadFilesExist: (this.props.uploadList.files.length + this.props.uploadList.journalEntries.length > 0 ? true : false);
    }
  }

  static navigationOptions = {
    header: null
  };

  result = () => {
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state
    // there are items to upload
    if (this.state.uploadFilesExist) {
      return (
        <View>
          {this.props.uploadList.files.length != 0 ? this.renderPendingList('files') : null}
          {this.props.uploadList.journalEntries.length != 0 ? this.renderPendingList('journalEntries') : null}
        </View>
      )
      // no items to upload
    } else {
      if (uploadRequestPending) return <Spinner />
      else if (!uploadRequestPending && uploadRequestReceived) return <Text>{successMessage}</Text>
      else return <Text>No pending uploads</Text>
    }
  }


  /**
   * Renders a PendingList upon type of upload item
   * @param uploadType string: could be 'file' or 'journalEntry'
   */
  renderPendingList(uploadType: string) {
    let dataList: Array<any> = [];
    switch (uploadType) {
      case 'file':
        dataList = this.props.uploadList.files;
        break;
      case 'journalEntry':
        dataList = this.props.uploadList.journalEntries;
        break;
      default:
        break;
    }

    return (
      <View>
        <PendingList
          uploadType={uploadType}
          dataList={dataList}
          onRemove={this.onRemove}
          navigation={this.props.navigation}
        />
      </View>
    )
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

    this.props.dispatch(updateUploadList({
      files: [],
      journalEntries: []
    }));

  }

  /**
   * When 'Remove' is pressed, filter out the item with the given id and update the UploadList.
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
    return (
      <View style={styles.app} >
        <Header navigation={this.props.navigation} />
        <Text>Pending Uploads</Text>
        <View style={styles.container}>
          {this.result}
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
