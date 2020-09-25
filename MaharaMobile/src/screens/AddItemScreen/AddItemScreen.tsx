import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useState} from 'react';
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
import {emptyFile} from '../../utils/constants';
import {getUploadTypeIntlStrings} from '../../utils/helperFunctions';

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

const AddItemScreen = (props: Props) => {
  // State
  const itemType: UploadItemType = props.navigation.getParam('itemType');
  const [pickedFile, setPickedFile] = useState(emptyFile);

  return (
    <ScrollView>
      <View style={generic.wrap}>
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
                  ? t`Select a file`
                  : t`Select a different file`
              }
              onPress={() => pickDocument(setPickedFile)}
              style={null}
              icon="folder-open"
            />
          </View>
        )}
        {/* take a photo button */}
        {itemType === 'PHOTO' && (
          <OutlineButton
            onPress={() => takePhoto(setPickedFile)}
            icon="camera"
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
            editItem={null}
            navigation={props.navigation}
            defFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      </View>
    </ScrollView>
  );
};

AddItemScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: i18n._(
      t`Add ${getUploadTypeIntlStrings(navigation.getParam('itemType'))}`
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

export default connect(mapStateToProps)(withI18n()(AddItemScreen));
