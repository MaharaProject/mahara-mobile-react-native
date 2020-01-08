import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, Alert } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import styles from '../AddFileScreen/AddFileScreen.style';
import generic from '../../assets/styles/generic';
import { buttons } from '../../assets/styles/buttons';
import { MaharaFile, UserTag, UserFolder, MaharaPendingFile } from '../../models/models';
import {
  selectUrl,
  selectToken
} from '../../reducers/loginInfoReducer';
import { selectUserFolders } from '../../reducers/userArtefactsReducer';
import { selectUserTags } from '../../reducers/userTagsReducer';
import { selectAllUploadFiles } from '../../reducers/uploadFilesReducer';
import { RootState } from '../../reducers/rootReducer';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userName: string;
  token: string;
  dispatch: any;
  navigation: any;
  url: string;
  uploadList: {
    files: Array<MaharaPendingFile>;
  }
};

type State = {
  pickedFile: MaharaFile;
  filePickerButtonText: string;
};

export class AddFileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pickedFile: { uri: '', name: '', type: '', size: 0 },
      filePickerButtonText: 'Select a file'
    };
  }

  pickDocument = async () => {
    // iPhone/Android
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        //error
        console.log('consolelog error:', error);

        // No file picked
        if (!res) {
          Alert.alert('Invalid file', 'Please pick a file', [{ text: 'Okay', style: 'destructive' }]);
          return;
        }

        const pickedFile: MaharaFile = {
          name: res.fileName,
          uri: res.uri,
          type: res.type,
          size: Number(res.fileSize)
        };

        // Android
        this.setState({
          pickedFile: pickedFile,
          filePickerButtonText: 'Pick a different file'
        });
      }
    );
  };

  static navigationOptions = {
    headerTitle: 'Add a file'
  };

  render() {
    return (
      <ScrollView>
        <View style={generic.wrap}>
          {this.state.pickedFile.name ? (
            <View style={styles.imageWrap}>
              <Image source={{ uri: this.state.pickedFile.uri }} style={styles.image} />
            </View>
          ) : null}
          <View>
            <TouchableOpacity onPress={() => this.pickDocument()}>
              <Text style={buttons.lg}>{this.state.filePickerButtonText}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <UploadForm
              pickedFile={this.state.pickedFile}
              userFolders={this.props.userFolders}
              userTags={this.props.userTags}
              formType="file"
              token={this.props.token}
              url={this.props.url}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    url: selectUrl(state),
    token: selectToken(state),
    userTags: selectUserTags(state),
    userFolders: selectUserFolders(state),
    uploadFiles: selectAllUploadFiles(state)
  };
};

export default connect(mapStateToProps)(AddFileScreen);
