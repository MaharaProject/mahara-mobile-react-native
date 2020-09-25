import {t} from '@lingui/macro';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect} from 'react-redux';
import generic from '../../assets/styles/generic';
import AddAudio from '../../components/AddAudio/AddAudio';
import CustomVerifyBackButton from '../../components/UI/CustomVerifyBackButton/CustomVerifyBackButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import UploadForm from '../../components/UploadForm/UploadForm';
import i18n from '../../i18n';
import {
  File,
  PendingJEntry,
  PendingMFile as PendingFile,
  UploadItemType,
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
import {
  getUploadTypeIntlStrings,
  isPendingMFile
} from '../../utils/helperFunctions';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  token: string;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  url: string;
  userBlogs: Array<UserBlog>;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

const EditItemScreen = (props: Props) => {
  let editingFile: File = {
    name: '',
    size: 0,
    type: '',
    uri: ''
  };

  // Get item passed in as nav param from Upload Queue
  const itemToEdit: PendingFile | PendingJEntry = props.navigation.getParam(
    'itemToEdit'
  );

  if (itemToEdit) {
    if (isPendingMFile(itemToEdit)) {
      const maharaPendingFile: PendingFile = itemToEdit;
      editingFile = maharaPendingFile.maharaFormData.filetoupload;
    }
  }

  // State
  const itemType: UploadItemType = props.navigation.getParam('itemType');
  const [pickedFile, setPickedFile] = useState<File>(editingFile);

  useEffect(() => {
    setPickedFile(editingFile);
  }, []);

  return (
    <ScrollView>
      <View style={generic.wrap}>
        {pickedFile.name &&
        (pickedFile.type.startsWith('image') ||
          pickedFile.type.startsWith('video'))
          ? renderImagePreview(pickedFile.uri)
          : null}
        {itemType === 'FILE' && (
          <View>
            <OutlineButton
              text={t`Select a different file`}
              onPress={() => {
                pickDocument(setPickedFile);
              }}
              style={null}
              icon="folder-open"
            />
          </View>
        )}
        {itemType === 'PHOTO' && (
          <OutlineButton
            onPress={() => takePhoto(setPickedFile)}
            icon="camera"
            text={pickedFile.uri === '' ? t`Take photo` : t`Re-take photo`}
          />
        )}
        {itemType === 'AUDIO' && (
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
            itemType={itemType}
            token={props.token}
            url={props.url}
            editItem={itemToEdit}
            navigation={props.navigation}
            defFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditItemScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: i18n._(
      t`Edit ${getUploadTypeIntlStrings(navigation.getParam('itemType'))}`
    ),
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
