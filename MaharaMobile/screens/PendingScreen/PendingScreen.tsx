import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import styles from './PendingScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { uploadToMahara, updateUploadList } from '../../actions/actions'
import { MaharaFile, Store } from '../../models/models';
import Spinner from '../../components/Spinner/Spinner'

type Props =
  {
    uploadList: Array<MaharaFile>;
    dispatch: any;
    navigation: any;
  }

type State =
  {
    uploadRequestPending: boolean;
    uploadRequestReceived: boolean;
    successMessage: string;
    selectedFiles: Array<MaharaFile>
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

  //TEMP
  // DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'First Item',
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     title: 'Second Item',
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     title: 'Third Item',
  //   },
  // ];

  static navigationOptions = {
    header: null
  };

  renderFlatlist() {
    return (
      <View>
        <FlatList
          data={this.props.uploadList}
          extraData={this.state.selectedFiles}
          renderItem={({ item }) => {
            let itemSelected
            if (this.state.selectedFiles) {
              this.state.selectedFiles.forEach(file => {
                return (file.name === item.name) ? itemSelected = true : null
              })
            }
            return (
              <TouchableOpacity
                style={itemSelected && styles.highlighted}
                onPress={() => this.props.navigation.navigate('UploadFileScreen')}
                onLongPress={() => this.handleLongPress(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.name + item.size}
        />
      </View>
    )
  }

  handleLongPress(item: MaharaFile) {
    const selectedFiles = new Set([...this.state.selectedFiles]); // copy and mutate new state
    selectedFiles.has(item) ? selectedFiles.delete(item) : selectedFiles.add(item);
    this.setState({ selectedFiles: Array.from(selectedFiles) });
  }

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
    this.props.dispatch(updateUploadList([]))

    this.setState({
      successMessage: 'Your files have been uploaded to Mahara'
    })

    // if receive !200:
    this.setState({
      successMessage: 'It appears that you are offline or some other error has occurred. Please try again later.'
    })
  }

  onDelete() {
    const newUploadList = new Set(this.props.uploadList)
    this.state.selectedFiles.forEach(file => {
      newUploadList.delete(file)
    })

    this.props.dispatch(updateUploadList(Array.from(newUploadList)))
    this.setState({
      selectedFiles: []
    })
  }

  render() {
    const { uploadRequestPending, uploadRequestReceived, successMessage, selectedFiles } = this.state

    return (
      <View style={styles.app}>
        <Header navigation={this.props.navigation} />
        <Text>Pending Uploads</Text>
        <View style={styles.container}>
          {selectedFiles.length > 0 ? <Button title='Delete' onPress={() => { this.onDelete() }} /> : null}
          {this.props.uploadList.length > 0 ? this.renderFlatlist() : <Text>No pending uploads</Text>}
          {uploadRequestPending ? <Spinner /> : null}
          {!uploadRequestPending && uploadRequestReceived ? successMessage : null}
          <TouchableOpacity onPress={this.onUploadClick}>
            <Text style={buttons.lg}>Upload to your Mahara</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = (state: Store) => {
  return {
    token: state.app.token,
    uploadList: state.app.uploadList,
  }
}

export default connect(mapStateToProps)(PendingScreen);
