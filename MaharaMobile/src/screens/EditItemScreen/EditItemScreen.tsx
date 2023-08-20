import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { KeyboardAvoidingView, ScrollView, VStack } from 'native-base';
import { connect } from 'react-redux';
import generic from 'assets/styles/generic';
import AddAudio from 'components/AddAudio/AddAudio';
import OutlineButton from 'components/UI/OutlineButton/OutlineButton';
import UploadForm from 'components/UploadForm/UploadForm';
import { useChangeNavigationWarning } from 'hooks/useChangeNavigationWarning';
import { PendingMFile, UserBlog, UserFolder, UserTag } from 'models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectToken,
  selectUrl
} from 'store/reducers/loginInfoReducer';
import { RootState } from 'store/reducers/rootReducer';
import { selectAllUploadFiles } from 'store/reducers/uploadFilesReducer';
import { selectAllJEntries } from 'store/reducers/uploadJEntriesReducer';
import { selectUserBlogs, selectUserFolders } from 'store/reducers/userArtefactsReducer';
import { getUserTags } from 'store/reducers/userTagsReducer';
import { pickDocument, renderImagePreview, takePhoto } from 'utils/addEditHelperFunctions';
import { CAMERA_ICON, FOLDER_ICON, emptyFile } from 'utils/constants';
import { getUploadTypeIntlStrings } from 'utils/helperFunctions';

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

function EditItemScreen(props: Props) {
  // ItemType is type UploadItemType ensures from the navigate in selectMediaScreen
  const { itemType } = props.route.params;
  const pendingFile: PendingMFile = props.route.params.itemToEdit;

  const [pickedFile, setPickedFile] = useState(
    pendingFile.maharaFormData ? pendingFile.maharaFormData.filetoupload : emptyFile
  );

  // Get item passed in as nav param from Upload Queue
  const { itemToEdit } = props.route.params;

  // track if the form has changes and block navigating away when dirty
  const [isDirty, setDirty] = useState(false);
  useChangeNavigationWarning(isDirty);

  return (
    <KeyboardAvoidingView
      // keyboardVerticalOffset={10}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
    >
      <ScrollView>
        <VStack space={4} style={generic.wrap}>
          {pickedFile.name &&
          (pickedFile.type.startsWith('image') || pickedFile.type.startsWith('video'))
            ? renderImagePreview(pickedFile.uri)
            : null}
          {itemType === 'FILE' && (
            <OutlineButton
              text={t`Select a different file`}
              onPress={() => {
                pickDocument(setPickedFile);
              }}
              style={null}
              icon={FOLDER_ICON}
            />
          )}
          {itemType === 'PHOTO' && (
            <OutlineButton
              onPress={() => takePhoto(setPickedFile)}
              icon={CAMERA_ICON}
              text={pickedFile.uri === '' ? t`Take photo` : t`Re-take photo`}
            />
          )}
          {itemType === 'AUDIO' && (
            <AddAudio audioFileToEdit={pickedFile} setPickedFile={setPickedFile} />
          )}
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
            setDirty={setDirty}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const EditItemScreenOptions = (navData) => ({
  title: t`Edit ${getUploadTypeIntlStrings(navData.route.params.itemType).toLowerCase()}`
});

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
