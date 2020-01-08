import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { removeUploadFile, removeUploadJEntry } from '../../actions/actions'
import { MaharaPendingFile, PendingJournalEntry } from '../../models/models';
import Spinner from '../../components/Spinner/Spinner'
import PendingList from '../../components/PendingList/PendingList';
import { uploadItemToMahara } from '../../utils/helperFunctions';
import { RootState } from '../../reducers/reducers';
import { selectAllUploadFiles, selectAllUploadFilesIds } from '../../reducers/uploadFilesReducer';
import { selectAllJEntriesIds, selectAllJEntries } from '../../reducers/uploadJEntriesReducer';
import Header from '../../components/Header/Header';

type Props =
  {
    uploadFiles: Array<MaharaPendingFile>;
    uploadJEntries: Array<PendingJournalEntry>;
    uploadFilesIds: Array<string>;
    uploadJEntriesIds: Array<string>;
    dispatch: any;
    navigation: any;
  }

type State =
  {
    uploadRequestPending: boolean;
    uploadRequestReceived: boolean;
    successMessage: string;
    selectedFiles: Array<any>;
    uploadItemsExist: boolean;
  }


export class PendingScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploadRequestPending: false,
      uploadRequestReceived: false,
      successMessage: '',
      selectedFiles: [],
      uploadItemsExist: (this.props.uploadFiles.length + this.props.uploadJEntries.length > 0 ? true : false),
    }
  }

  static navigationOptions = {
    // header: null
  };

  pendingDisplay = () => {
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state
    // there are items to upload
    let list: Array<any> = [];

    if (this.props.uploadFilesIds.length > 0) list = list.concat(this.props.uploadFiles);
    if (this.props.uploadJEntriesIds.length > 0) list = list.concat(this.props.uploadJEntries)

    if (this.state.uploadItemsExist) {
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
    this.props.uploadFiles.forEach(file => this.props.dispatch(uploadItemToMahara(file.url, file.maharaFormData)));
    this.props.uploadJEntries.forEach(journalEntry => this.props.dispatch(uploadItemToMahara(journalEntry.url, journalEntry.journalEntry)));
    this.props.uploadFiles.forEach(file => this.props.dispatch(removeUploadFile(file.id)))
    this.props.uploadJEntries.forEach(journalEntry => this.props.dispatch(removeUploadJEntry(journalEntry.id)))
  }


  /**
   * When 'Remove' is pressed, filter out the item with the given id and update the UploadList.
   */
  onRemove = (itemId: string) => {
    console.log('itemId', itemId)
    this.props.dispatch(removeUploadFile(itemId));
    this.props.dispatch(removeUploadJEntry(itemId));
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

const mapStateToProps = (state: RootState) => {
  return {
    uploadFiles: selectAllUploadFiles(state),
    uploadFilesIds: selectAllUploadFilesIds(state),
    uploadJEntries: selectAllJEntries(state),
    uploadJEntriesIds: selectAllJEntriesIds(state)
  };
}

export default connect(mapStateToProps)(PendingScreen);
