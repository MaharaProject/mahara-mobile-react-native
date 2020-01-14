import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, Alert } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import AddAudio from '../../components/AddAudio/AddAudio';
import styles from '../AddFileScreen/AddFileScreen.style';
import generic from '../../assets/styles/generic';
import { buttons } from '../../assets/styles/buttons';
import { MaharaFile, UserTag, UserBlog, UserFolder, MaharaPendingFile } from '../../models/models';
import {
  selectUrl,
  selectToken
} from '../../reducers/loginInfoReducer';
import { selectUserBlogs, selectUserFolders } from '../../reducers/userArtefactsReducer';
import { selectAllJEntries } from '../../reducers/uploadJEntriesReducer';
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
  },
  formType: string;
  userBlogs: Array<UserBlog>;
};

const AddFileScreen = (props: Props) => {
  let initialState = { uri: '', name: '', type: '', size: 0 };
  let isEditing = false;
  let formType = props.navigation.getParam('formType');
  const [pickedFile, setPickedFile] = useState<MaharaFile>(initialState);
  const [filePickerButtonText, setFilePickerButtonText] = useState(props.navigation.getParam('item') ? 'Pick a different file' : 'Select a file');

  // check if user is adding new or editing existing
  // populate form with existing details and set 'type' so headerTitle is accurate
  if (props.navigation.getParam('item')) {
    if (props.navigation.getParam('item').maharaFormData) {
      initialState = props.navigation.getParam('item').maharaFormData.filetoupload;
      isEditing = true;
    }
  }

  useEffect(() => {
    if (isEditing) {
      setPickedFile(initialState);
    }
  }, [initialState]);

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

  const addPickedFile = (file: MaharaFile) => {
    setPickedFile(file);
  }

  return (
    <ScrollView>
      <View style={generic.wrap}>
        {pickedFile.name && formType === 'file' ? (
          <View style={styles.imageWrap}>
            <Image source={{ uri: pickedFile.uri }} style={styles.image} />
          </View>
        ) : null}
        {formType === 'file' &&
        <View>
          <TouchableOpacity onPress={() => pickDocument()}>
            <Text style={buttons.lg}>{filePickerButtonText}</Text>
          </TouchableOpacity>
        </View>
        }
        {formType === 'audio' &&
          <View>
            <AddAudio
              addPickedFile = {addPickedFile}
              isEditing = {isEditing}
            />
          </View>
        }
        <View>
          <UploadForm
            pickedFile={pickedFile}
            userFolders={props.userFolders}
            userTags={props.userTags}
            userBlogs={props.userBlogs}
            formType={formType}
            token={props.token}
            url={props.url}
            editItem={props.navigation.getParam('item')}
            navigation={props.navigation}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const setAddorEdit = (props: Props) => {
  if (props.navigation.getParam('item')) {
    return 'Edit'
  } else {
    return 'Add'
  }
}

AddFileScreen.navigationOptions = (props: Props) => ({
  headerTitle: `${setAddorEdit(props)} ${props.navigation.getParam('formType')}`
});

const mapStateToProps = (state: RootState) => {
  return {
    url: selectUrl(state),
    token: selectToken(state),
    userTags: selectUserTags(state),
    userFolders: selectUserFolders(state),
    userBlogs: selectUserBlogs(state),
    uploadJournals: selectAllJEntries(state),
    uploadFiles: selectAllUploadFiles(state)
  };
};

export default connect(mapStateToProps)(AddFileScreen);
