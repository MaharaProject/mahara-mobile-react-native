import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import generic from '../../assets/styles/generic';
import AddAudio from '../../components/AddAudio/AddAudio';
import CustomVerifyBackButton from '../../components/UI/CustomVerifyBackButton/CustomVerifyBackButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import UploadForm from '../../components/UploadForm/UploadForm';
import i18n from '../../i18n';
import {
  MaharaFile,
  MaharaPendingFile,
  PendingJournalEntry,
  UserBlog,
  UserFolder,
  UserTag
} from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectToken,
  selectUrl
} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {selectAllUploadFiles} from '../../reducers/uploadFilesReducer';
import {selectAllJEntries} from '../../reducers/uploadJEntriesReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
import {selectUserTags} from '../../reducers/userTagsReducer';
import {
  pickDocument,
  renderImagePreview,
  takePhoto
} from '../../utils/addEditHelperFunctions';
import {AUDIO, FILE, PHOTO} from '../../utils/constants';
import {isMaharaPendingFile} from '../../utils/helperFunctions';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userName: string;
  token: string;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  url: string;
  uploadList: {
    files: Array<MaharaPendingFile>;
  };
  formType: string;
  userBlogs: Array<UserBlog>;
  i18n: I18n;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

const EditItemScreen = (props: Props) => {
  let editingFile: MaharaFile = {
    name: '',
    size: 0,
    type: '',
    uri: ''
  };

  // Get item passed in as nav param from Upload Queue
  const itemToEdit:
    | MaharaPendingFile
    | PendingJournalEntry = props.navigation.getParam('itemToEdit');

  if (itemToEdit) {
    if (isMaharaPendingFile(itemToEdit)) {
      const maharaPendingFile: MaharaPendingFile = itemToEdit;
      editingFile = maharaPendingFile.maharaFormData.filetoupload;
    }
  }

  // State
  const formType = props.navigation.getParam('formType');
  const [pickedFile, setPickedFile] = useState<MaharaFile>(editingFile);

  const [filePickerButtonText, setFilePickerButtonText] = useState(
    t`Select a different file`
  );

  useEffect(() => {
    setPickedFile(editingFile);
  }, []);

  return (
    <ScrollView>
      <View style={generic.wrap}>
        {pickedFile.name && (formType === FILE || formType === PHOTO)
          ? renderImagePreview(pickedFile.uri)
          : null}
        {formType === FILE && (
          <View>
            <OutlineButton
              text={filePickerButtonText}
              onPress={() => {
                pickDocument(setPickedFile);
              }}
              style={null}
              icon="folder-open"
            />
          </View>
        )}
        {formType === PHOTO && (
          <OutlineButton
            onPress={() => takePhoto(setPickedFile)}
            icon="camera"
            text={pickedFile.uri === '' ? t`Take photo` : t`Re-take photo`}
          />
        )}
        {formType === AUDIO && (
          <View>
            <AddAudio editItem={itemToEdit} setPickedFile={setPickedFile} />
          </View>
        )}
        <View>
          <UploadForm
            pickedFile={pickedFile}
            userFolders={props.userFolders}
            userTags={props.userTags}
            userBlogs={props.userBlogs}
            formType={formType}
            token={props.token}
            url={props.url}
            editItem={itemToEdit}
            navigation={props.navigation}
            defaultFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditItemScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: i18n._(t`Edit ${navigation.getParam('formType')}`),
    headerLeft: <CustomVerifyBackButton navigation={navigation} />
  };
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  token: selectToken(state),
  userTags: selectUserTags(state),
  userFolders: selectUserFolders(state),
  userBlogs: selectUserBlogs(state),
  uploadJournals: selectAllJEntries(state),
  uploadFiles: selectAllUploadFiles(state),
  defaultFolderTitle: selectDefaultFolderTitle(state),
  defaultBlogId: selectDefaultBlogId(state)
});

export default connect(mapStateToProps)(EditItemScreen);
