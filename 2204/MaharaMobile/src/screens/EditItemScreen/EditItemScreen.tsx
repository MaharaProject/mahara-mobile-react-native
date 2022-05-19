// // import {t} from '@lingui/macro';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import generic from '../../assets/styles/generic';
import AddAudio from '../../components/AddAudio/AddAudio';
import CustomVerifyBackButton from '../../components/UI/CustomVerifyBackButton/CustomVerifyBackButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import UploadForm from '../../components/UploadForm/UploadForm';
import i18n from '../../i18n';
import {PendingMFile, UserBlog, UserFolder, UserTag} from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectToken,
  selectUrl
} from '../../store/reducers/loginInfoReducer';
import {RootState} from '../../store/reducers/rootReducer';
import {selectAllUploadFiles} from '../../store/reducers/uploadFilesReducer';
import {selectAllJEntries} from '../../store/reducers/uploadJEntriesReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../store/reducers/userArtefactsReducer';
import {getUserTags} from '../../store/reducers/userTagsReducer';
import {
  pickDocument,
  renderImagePreview,
  takePhoto
} from '../../utils/addEditHelperFunctions';
import {emptyFile} from '../../utils/constants';
import {getUploadTypeIntlStrings} from '../../utils/helperFunctions';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  token: string;
  navigation: any;
  route: any;
  url: string;
  userBlogs: Array<UserBlog>;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

const EditItemScreen = (props: Props) => {
  // ItemType is type UploadItemType ensures from the navigate in selectMediaScreen
  const {itemType} = props.route.params;
  const pendingFile: PendingMFile = props.route.params.itemToEdit;

  const [pickedFile, setPickedFile] = useState(
    pendingFile.maharaFormData
      ? pendingFile.maharaFormData.filetoupload
      : emptyFile
  );

  // Get item passed in as nav param from Upload Queue
  const {itemToEdit} = props.route.params;

  useEffect(() => {
    setPickedFile(pickedFile);
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
            <AddAudio
              audioFileToEdit={pickedFile}
              setPickedFile={setPickedFile}
            />
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

export const EditItemScreenOptions = (navData) => {
  return {
    headerTitle: i18n._(
      t`Edit ${getUploadTypeIntlStrings(
        navData.route.params.itemType
      ).toLowerCase()}`
    ),
    headerLeft: () => (
      <CustomVerifyBackButton
        goBack={() => navData.navigation.dispatch(CommonActions.goBack())}
      />
    )
  };
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  token: selectToken(state),
  userTags: getUserTags(state),
  userFolders: selectUserFolders(state),
  userBlogs: selectUserBlogs(state),
  uploadJournals: selectAllJEntries(state),
  uploadFiles: selectAllUploadFiles(state),
  defaultFolderTitle: selectDefaultFolderTitle(state),
  defaultBlogId: selectDefaultBlogId(state)
});

export default connect(mapStateToProps)(EditItemScreen);
