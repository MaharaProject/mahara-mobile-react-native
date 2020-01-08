import React, { Component, useState } from 'react';
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

const AddFileScreen = (props: Props, state: State) => {
  let initialState = { uri: '', name: '', type: '', size: 0 }
  let isEditting = false

  if (props.navigation.getParam('item')) {
    initialState = props.navigation.getParam('item').maharaFormData.filetoupload
    isEditting = true
  }

  const [pickedFile, setPickedFile] = useState<MaharaFile>(initialState);
  const [filePickerButtonText, setFilePickerButtonText] = useState(isEditting ? 'Pick a different file' : 'Select a file');

  const pickDocument = async () => {
    // iPhone/Android
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        //error
        console.log('error:', error);

        // No file picked
        if (!res) {
          Alert.alert('Invalid file', 'Please pick a file', [{ text: 'Okay', style: 'destructive' }]);
          return;
        }

        // Android
        setPickedFile({
          name: res.fileName,
          uri: res.uri,
          type: res.type,
          size: Number(res.fileSize)
        });
        setFilePickerButtonText('Pick a different file')
      }
    );
  };

  return (
    <ScrollView>
      <View style={generic.wrap}>
        {pickedFile.name ? (
          <View style={styles.imageWrap}>
            <Image source={{ uri: pickedFile.uri }} style={styles.image} />
          </View>
        ) : null}
        <View>
          <TouchableOpacity onPress={() => pickDocument()}>
            <Text style={buttons.lg}>{filePickerButtonText}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <UploadForm
            pickedFile={pickedFile}
            userFolders={props.userFolders}
            userTags={props.userTags}
            formType="file"
            token={props.token}
            url={props.url}
            editItem={props.navigation.getParam('item')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

AddFileScreen.navigationOptions = {
  headerTitle: 'Add a file'
};

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
