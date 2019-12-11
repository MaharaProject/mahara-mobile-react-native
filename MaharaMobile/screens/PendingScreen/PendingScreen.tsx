import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { updateUploadList, uploadItemToMahara } from '../../actions/actions'
import { MaharaStore, MaharaPendingFile, PendingJournalEntry } from '../../models/models';
import Spinner from '../../components/Spinner/Spinner'
import PendingList from '../../components/PendingList/PendingList';
import { conditionalExpression } from '@babel/types';

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
      uploadFilesExist: (this.props.uploadList.files.length + this.props.uploadList.journalEntries.length > 0 ? true : false)
    }
  }

  static navigationOptions = {
    header: null
  };

  pendingDisplay = () => {
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state
    // there are items to upload
    let list: Array<any> = [];

    if (this.props.uploadList.files.length != 0) list = list.concat(this.props.uploadList.files);
    if (this.props.uploadList.journalEntries.length != 0) list = list.concat(this.props.uploadList.journalEntries)

    if (this.state.uploadFilesExist) {
      return (
        <View>
          {this.renderPendingList(list)}
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
   * Renders a PendingList
   * @param dataList array of files and journal entries
   */
  renderPendingList(dataList: Array<any>) {
    return (
      <PendingList
        dataList={dataList}
        onRemove={this.onRemove}
        navigation={this.props.navigation}
      />
    )
  }

  onUploadClick = () => {
    const obj = this.props.uploadList;
    Object.values(obj).forEach((array: Array<any>) => {
      array.forEach((item: any) => {
        const uploadItem = item.maharaFormData || item.journalEntry;
        this.props.dispatch(uploadItemToMahara(item.url, uploadItem));
        this.props.dispatch(updateUploadList({ files: [], journalEntries: [] }))
      })
    })
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
        <View style={styles.listContainer}>
          {this.pendingDisplay()}
        </View>
        <View style={styles.buttonContainer}>
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
