import React, { useState } from 'react';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {
    Center,
    KeyboardAvoidingView,
    ScrollView,
    VStack,
    View
} from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { LogBox, Platform } from 'react-native';
import { connect } from 'react-redux';
import generic from 'assets/styles/generic';
import AddAudio from 'components/AddAudio/AddAudio';
import OutlineButton from 'components/UI/OutlineButton/OutlineButton';
import UploadForm from 'components/UploadForm/UploadForm';
import { useChangeNavigationWarning } from 'hooks/useChangeNavigationWarning';
import { UploadItemType, UserBlog, UserFolder, UserTag } from 'models/models';
import {
    selectDefaultBlogTitle,
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
    defaultBlogTitle: string;
};
function AddItemScreen(props: Props) {
    const itemType = props.route.params?.itemType ?? 'FILE';
    const [pickedFile, setPickedFile] = useState(emptyFile);

    // track if the form has changes and block navigating away when dirty
    const [isDirty, setDirty] = useState(false);
    useChangeNavigationWarning(isDirty);

    return (
        <KeyboardAvoidingView
            // keyboardVerticalOffset={10}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        >
            <ScrollView>
                <VStack space="xs" style={generic.wrap}>
                    {/* select a file button */}
                    {pickedFile.name &&
                    (pickedFile.type.startsWith('image') || pickedFile.type.startsWith('video'))
                        ? renderImagePreview(pickedFile.uri)
                        : null}
                    {itemType === 'FILE' && (
                        <OutlineButton
                            text={
                                pickedFile.uri === ''
                                    ? t`Select a file`
                                    : t`Select a different file`
                            }
                            onPress={() => pickDocument(setPickedFile)}
                            style={null}
                            icon={faFolder}
                        />
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
                    {itemType === 'AUDIO' && <AddAudio setPickedFile={setPickedFile} />}
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
                        defaultBlogTitle={props.defaultBlogTitle}
                        setDirty={setDirty}
                    />
                </VStack>
            </ScrollView>
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
    defaultBlogTitle: selectDefaultBlogTitle(state)
});

export default connect(mapStateToProps)(AddItemScreen);
