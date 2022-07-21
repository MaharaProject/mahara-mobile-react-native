// // import {t} from '@lingui/macro';
// import { ' } from '@lingui/react';
import { faFileArchive, faFileCode, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faFile, faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FolderOpen } from '@material-ui/icons';
import { CommonActions } from '@react-navigation/native';
import { Box, Center, Container, ScrollView, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import generic from '../../assets/styles/generic';
import AddAudio from '../../components/AddAudio/AddAudio';
import CustomVerifyBackButton from '../../components/UI/CustomVerifyBackButton/CustomVerifyBackButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import UploadForm from '../../components/UploadForm/UploadForm';
// import i18n from '../../i18n';
import { UserBlog, UserFolder, UserTag } from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectToken,
  selectUrl,
} from '../../store/reducers/loginInfoReducer';
import { RootState } from '../../store/reducers/rootReducer';
import { selectAllUploadFiles } from '../../store/reducers/uploadFilesReducer';
import { selectAllJEntries } from '../../store/reducers/uploadJEntriesReducer';
import {
  selectUserBlogs,
  selectUserFolders,
} from '../../store/reducers/userArtefactsReducer';
import { getUserTags } from '../../store/reducers/userTagsReducer';
import {
  pickDocument,
  renderImagePreview,
  takePhoto,
} from '../../utils/addEditHelperFunctions';
import { emptyFile } from '../../utils/constants';
import { getUploadTypeIntlStrings } from '../../utils/helperFunctions';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  token: string;
  navigation: any;
  route: { params: { itemType: string } };
  url: string;
  userBlogs: Array<UserBlog>;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

const AddItemScreen = (props: Props) => {
  // State
  // TODO: itemtype is type UploadItemType ensures from the navigate in selectmediascreen
  const itemType = props.route.params?.itemType ?? 'FILE';
  const [pickedFile, setPickedFile] = useState(emptyFile);

  return (
    <ScrollView>
      <VStack space={2} style={generic.wrap}>
        {/* select a file button */}
        {pickedFile.name &&
        (pickedFile.type.startsWith('image') ||
          pickedFile.type.startsWith('video'))
          ? renderImagePreview(pickedFile.uri)
          : null}
        {itemType === 'FILE' && (
          <View>
            <OutlineButton
              text={
                pickedFile.uri === ''
                  ? // ? t`Select a file`
                    // : t`Select a different file`
                    'Select a file'
                  : 'Select a different file'
              }
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
            // text={pickedFile.uri === '' ? t`Take photo` : t`Re-take photo`}
            text={pickedFile.uri === '' ? 'Take photo' : 'Re-take photo'}
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
            editItem={null}
            navigation={props.navigation}
            defFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      </VStack>
    </ScrollView>
  );
};

export const AddItemScreenOptions = (navData) => {
  const itemType = navData.route.params?.itemType ?? 'FILE';
  const intlStringOfItemType = getUploadTypeIntlStrings(itemType).toLowerCase();
  // const addString = i18n._(t`Add`);
  const addString = 'Add';
  const headerTitle = addString.concat(' ', intlStringOfItemType);

  return {
    headerTitle,
    headerLeft: () => (
      // TODO: use the HeaderBackButton in the future for better accessibility (default)
      <CustomVerifyBackButton
        goBack={() => navData.navigation.dispatch(CommonActions.goBack())}
      />
    ),
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
  defaultBlogId: selectDefaultBlogId(state),
});

// export default connect(mapStateToProps)(withI18n()(AddItemScreen));
export default connect(mapStateToProps)(AddItemScreen);
