import React, { useState } from 'react';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { t } from '@lingui/macro';
import { KeyboardAvoidingView, ScrollView, VStack, View } from 'native-base';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import generic from 'assets/styles/generic';
import AddAudio from 'components/AddAudio/AddAudio';
import OutlineButton from 'components/UI/OutlineButton/OutlineButton';
import UploadForm from 'components/UploadForm/UploadForm';
import { useChangeNavigationWarning } from 'hooks/useChangeNavigationWarning';
import { UploadItemType, UserBlog, UserFolder, UserTag } from 'models/models';
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
import { emptyFile } from 'utils/constants';
import { getUploadTypeIntlStrings } from 'utils/helperFunctions';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  token: string;
  navigation: any;
  route: { params: { itemType: UploadItemType } };
  url: string;
  userBlogs: Array<UserBlog>;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

function AddItemScreen(props: Props) {
  const itemType = props.route.params?.itemType ?? 'FILE';
  const [pickedFile, setPickedFile] = useState(emptyFile);

  // track if the form has changes and block navigating away when dirty
  const [isDirty, setDirty] = useState(false);
  useChangeNavigationWarning(isDirty);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
      <VStack space={2} style={generic.wrap}>
        {/* select a file button */}
        {pickedFile.name &&
        (pickedFile.type.startsWith('image') || pickedFile.type.startsWith('video'))
          ? renderImagePreview(pickedFile.uri)
          : null}
        {itemType === 'FILE' && (
          <View>
            <OutlineButton
              text={pickedFile.uri === '' ? t`Select a file` : t`Select a different file`}
              onPress={() => pickDocument(setPickedFile)}
              style={null}
              icon={faFolder}
            />
          </View>
        )}
        {/* take a photo button */}
        {itemType === 'PHOTO' && (
          <OutlineButton
            onPress={() => takePhoto(setPickedFile)}
            icon={faCamera}
            text={pickedFile.uri === '' ? t`Take photo` : t`Re-take photo`}
          />
        )}
        {/* record audio button */}
        {itemType === 'AUDIO' && (
          <View>
            <AddAudio setPickedFile={setPickedFile} />
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
            navigation={props.navigation}
            defFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
            setDirty={setDirty}
          />
        </View>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export const AddItemScreenOptions = (navData) => ({
  title: t`Add ${getUploadTypeIntlStrings(navData.route.params.itemType).toLowerCase()}`
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

export default connect(mapStateToProps)(AddItemScreen);
