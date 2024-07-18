import React, { useEffect, useState } from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Box, Select, Spacer, Text, VStack, View } from '@gluestack-ui/themed-native-base';
import { t } from '@lingui/macro';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'assets/styles/variables';
import CancelButton from 'components/UI/CancelButton/CancelButton';
import FormInput from 'components/UI/FormInput/FormInput';
import MediumButton from 'components/UI/MediumButton/MediumButton';
import MediumButtonDark from 'components/UI/MediumButtonDark/MediumButtonDark';
import SubHeading from 'components/UI/SubHeading/SubHeading';
import SubHeadingColon from 'components/UI/SubHeadingColon/SubHeadingColon';
import SubHeadingNoColon from 'components/UI/SubHeadingNoColon/SubHeadingNoColon';
import {
  File,
  PendingJEntry,
  PendingMFile,
  UploadItemType,
  UserBlog,
  UserFolder,
  UserTag
} from 'models/models';
import {
  newJournalEntry,
  newMaharaFile,
  newPendingJEntry,
  newPendingMFile
} from 'models/typeCreators';
import {
  addUserTags,
  saveTaggedItemsToAsync,
  updateItemTags as updateItemTagsIds
} from 'store/actions/actions';
import { addFileToUploadList } from 'store/actions/uploadFiles';
import { addJournalEntryToUploadList } from 'store/actions/uploadJEntries';
import { RootState } from 'store/reducers/rootReducer';
import { getItemTags } from 'store/reducers/userTagsReducer';
import { emptyPendingJEntry, emptyPendingMFile } from 'utils/constants';
import {
  RequiredWarningText,
  isValidText,
  putDefaultAtTop,
  removeExtension,
  setTagString
} from 'utils/formHelper';
import { getUploadTypeIntlStrings, isPendingJEntry, isPendingMFile } from 'utils/helperFunctions';
import { maharaTheme } from 'utils/theme';
import TagsPicker from './TagsPicker';
import { BlogPicker } from './UploadFormComponents';

type Props = {
  pickedFile?: File;
  userFolders?: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
  itemType: UploadItemType;
  token: string;
  url: string;
  editItem?: PendingMFile | PendingJEntry;
  navigation: any;
  defFolderTitle: string;
  defaultBlogTitle: string;
  setDirty(dirty: boolean): void;
};

type State = {
  selectedTags: Array<string>;
  selectedTag: UserTag;
  newTags: Array<UserTag>;
  itemTagIds: Array<number>;
};

function UploadForm(props: Props) {
  const existingItemTags = useSelector((state: RootState) =>
    props.editItem ? getItemTags(state, props.editItem.id) : []
  );

  const dispatch = useDispatch();
  const checkUserBlogs = props.userBlogs ? props.userBlogs.length > 0 : null;
  const { itemType } = props;
  const { pickedFile } = props;

  // STATE
  const [isDraft, setIsDraft] = useState(false);
  const [fileValid, setFileValid] = useState(pickedFile && pickedFile.size && pickedFile.size > 0);
  const [title, setTitle] = useState(''); // title and filename
  const [titleValid, setTitleValid] = useState(props.itemType !== 'J_ENTRY');
  const [description, setDescription] = useState(''); // file description (or image caption) and journal entry
  const [descValid, setDescValid] = useState(props.itemType !== 'J_ENTRY');
  const [alttext, setAltText] = useState(''); // file alt text

  const [selectedFolder, setSelectedFolder] = useState(props.defFolderTitle);
  const [selectedBlogTitle, setSelectedBlogTitle] = useState(props.defaultBlogTitle);
  const [selectedTagsStrings, setSelectedTagsStrings] = useState<State['selectedTags']>([]);
  const [itemTagsIds, setItemTagsIds] = useState<Array<number>>([]);
  const [newTags, setNewTags] = useState<State['newTags']>([]);

  /**
   * Listen to form values and mark dirty if any values are set
   *  - checks non-default
   *  - check arrays contain values
   *  - checks strings are truthy (non empty)
   */
  useEffect(() => {
    if (
      pickedFile?.uri ||
      title ||
      description ||
      alttext ||
      selectedFolder !== props.defFolderTitle ||
      selectedBlogTitle !== props.defaultBlogTitle ||
      selectedTagsStrings?.length
    ) {
      props.setDirty(true);
    } else {
      props.setDirty(false);
    }
  }, [
    description,
    alttext,
    pickedFile,
    props,
    selectedBlogTitle,
    selectedFolder,
    selectedTagsStrings,
    title
  ]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    if (props.editItem) {
      if (isPendingMFile(props.editItem)) {
        const { maharaFormData } = props.editItem;
        // The file is set in AddItemScreen as the pickedFile.
        setTitle(removeExtension(maharaFormData.name));
        setDescription(maharaFormData.description);
        setAltText(maharaFormData.alttext);
        setSelectedFolder(maharaFormData.foldername);
        setTitleValid(true);
        setDescValid(true);
        setFileValid(true);
      }
      if (isPendingJEntry(props.editItem)) {
        const { journalEntry } = props.editItem;
        setTitle(journalEntry.title);
        setDescription(journalEntry.body);
        setSelectedBlogTitle(journalEntry.title);
        setIsDraft(journalEntry.isdraft);
        setTitleValid(true);
        setDescValid(true);
      }
    }
  }, [props.editItem]);

  /* check file valid */
  useEffect(() => {
    if (itemType === 'J_ENTRY') {
      setFileValid(true);
    }

    if (pickedFile) {
      setFileValid(pickedFile.size && pickedFile.size > 0);
    }
  }, [itemType, pickedFile]);

  /**
   * Creates PendingJEntry, adds to upload queue
   * Updates the id if needed and returns the id
   * @param id
   */
  const addJEntryToUpload = (id: string): string => {
    const journalUrl = `${props.url}webservice/rest/server.php?alt=json`;
    let pendingJournalEntry: PendingJEntry = emptyPendingJEntry;
    const matchingBlog: UserBlog = props.userBlogs.find((b) => b.title === selectedBlogTitle);

    const firstBlogId = props.userBlogs ? props.userBlogs[0].id : '0';
    const jEntry = newJournalEntry(
      matchingBlog.id || firstBlogId,
      props.token,
      title,
      description,
      isDraft
    );
    pendingJournalEntry = newPendingJEntry(id, journalUrl, jEntry);

    // add journal entry to pending list
    dispatch(addJournalEntryToUploadList(pendingJournalEntry));
    return pendingJournalEntry.id;
  };

  /**
   * Creates PendingMFile, adds to upload queue
   * Updates the id if needed and returns the id
   * @param file
   * @param id
   */
  const addFileToUpload = (file: File, id: string): string => {
    let pendingFileData: PendingMFile = emptyPendingMFile;
    const tagString = selectedTagsStrings ? setTagString(selectedTagsStrings) : '';
    const fileUrl = `${props.url}/webservice/rest/server.php?alt=json${tagString}`;
    const extension = file.name.match(/\.[0-9a-z]+$/i) ?? '';

    const filename = title ? title + extension : file.name;

    const firstFolder = props.userFolders ? props.userFolders[0].title : '';
    const folder = selectedFolder || firstFolder;
    const webService = 'module_mobileapi_upload_file';

    const updatedFile = {
      ...file,
      name: filename
    };

    const formData = newMaharaFile(
      webService,
      props.token,
      folder,
      filename,
      description,
      alttext,
      updatedFile
    );

    pendingFileData = newPendingMFile(id, fileUrl, formData, file.type, itemType);

    dispatch(addFileToUploadList(pendingFileData));
    return pendingFileData.id;
  };

  /**
   * Add/edit files to uploadList and update new usertags in redux
   */
  const handleForm = () => {
    let id = props.editItem ? props.editItem.id : '';

    // Upload Journal Entry
    if (itemType === 'J_ENTRY') {
      id = addJEntryToUpload(id);
    } else if (pickedFile) {
      // Upload File
      const file: File = pickedFile;
      id = addFileToUpload(file, id);
    }

    // Update tags in redux
    if (newTags.length > 0) {
      dispatch(addUserTags(newTags));
    }

    // Attach tags to item on queue to pending
    dispatch(updateItemTagsIds(id, itemTagsIds));
    dispatch(saveTaggedItemsToAsync());

    // mark form as clean again (to not block navigation)
    props.setDirty(false);
    // upon successful upload, remove the AddFile screen from the navigation stack
    // then take user to PendingScreen
    props.navigation.dispatch({
      ...CommonActions.navigate('Upload queue tab', { added: true, saving: true }),
      ...StackActions.popToTop()
    });
  };

  const updateTitle = (newTitle: string) => {
    setTitleValid(isValidText(itemType, newTitle));
    setTitle(newTitle);
  };

  const updateDesc = (desc: string) => {
    setDescValid(isValidText(itemType, desc));
    setDescription(desc);
  };

  const updateAltText = (altText: string) => {
    setDescValid(isValidText(itemType, altText));
    setAltText(altText);
  };

  const renderDisplayedFilename = () => {
    if (itemType === 'J_ENTRY') {
      return null;
    }
    return (
      <View>
        <SubHeadingColon required text={t`File`} />
        {fileValid ? (
          <Text fontSize="lg" accessibilityLabel={t`A file has been added.`}>
            {pickedFile?.name}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderTextInputs = () => (
    <View>
      <SubHeadingColon
        required={itemType === 'J_ENTRY'}
        text={itemType === 'J_ENTRY' ? t`Title` : t`Name`}
      />
      <FormInput
        valid={itemType === 'J_ENTRY'}
        value={title}
        onChangeText={(text: string) => updateTitle(text)}
      />
      {itemType === 'J_ENTRY' && <SubHeadingColon text={t`Entry`} />}
      {itemType === 'PHOTO' && <SubHeadingColon text={t`Caption`} />}
      {itemType === 'FILE' && (
        <SubHeadingColon
          text={pickedFile && pickedFile.type?.startsWith('image') ? t`Caption` : t`Description`}
        />
      )}

      <FormInput
        multiline
        valid={itemType === 'J_ENTRY' && descValid}
        value={description}
        onChangeText={updateDesc}
      />

      {/* {pickedFile?.type?.startsWith('image') && (
        <View>
          <SubHeadingColon text={t`Alt text`} />
          <FormInput
            valid
            value={alttext}
            onChangeText={(altText: string) => updateAltText(altText)}
          />
        </View>
      )} */}
    </View>
  );

  const renderFolderPicker = () => {
    if (itemType === 'J_ENTRY') {
      return null;
    }

    const matchingFolder = props.userFolders.find((f) => f.title === props.defFolderTitle);

    const folders = putDefaultAtTop(matchingFolder, props.userFolders);

    return (
      <View>
        {props.userFolders.length > 1 && <SubHeadingColon required text={t`Folder`} />}

        {props.userFolders.length === 1 && (
          <SubHeadingNoColon text={t`Folder: ${selectedFolder}`} />
        )}
        {props.defFolderTitle === undefined && (
          <RequiredWarningText customText={t`Error: You do not have any folders on your site.`} />
        )}
        {props.userFolders.length > 1 && (
          <Box>
            <Select
              size="lg"
              height={styles.heights.input}
              placeholder={props.defFolderTitle}
              accessibilityLabel={t`Select folder`}
              selectedValue={selectedFolder}
              onValueChange={(folder: string) => setSelectedFolder(folder)}
              color={maharaTheme.colors.dark}
            >
              {folders &&
                folders.map((f: UserFolder) => {
                  const label =
                    f.title === props.defFolderTitle ? `${f.title} - ${t`default`}` : f.title;
                  return <Select.Item label={label} value={f.title} key={f.id} />;
                })}
            </Select>
          </Box>
        )}
      </View>
    );
  };

  const onNewUserTag = (newTag: UserTag) => {
    setNewTags([...newTags, newTag]);
  };

  const renderTagsPicker = () => (
    <TagsPicker
      existingTags={existingItemTags}
      userTags={props.userTags}
      onAddNewUserTag={onNewUserTag}
      onSetItemUploadTagsString={setSelectedTagsStrings}
      onUpdateItemTagsIds={setItemTagsIds}
    />
  );

  const getFormValidation = () => {
    const fileFormIsValid = fileValid && !!selectedFolder;
    const journalFormIsValid = descValid && titleValid && selectedBlogTitle !== '0';

    if (itemType !== 'J_ENTRY') {
      return fileFormIsValid;
    }
    return journalFormIsValid;
  };

  const renderQueueCancelButtons = () => {
    const validButton = getFormValidation();
    const intlItemType = getUploadTypeIntlStrings(itemType).toLocaleLowerCase();
    return (
      <VStack space="xl" alignItems="stretch">
        <Box style={{ paddingTop: 10 }} />
        <MediumButtonDark
          onPress={handleForm}
          invalid={!validButton}
          icon={faClock}
          text={props.editItem ? t`Confirm edits to ${intlItemType}` : t`Queue to upload`}
        />
        <Box />
        <CancelButton
          onPress={() => {
            props.navigation.dispatch(CommonActions.goBack());
          }}
        />
      </VStack>
    );
  };

  const renderJournalPickerSwitch = () => {
    if (itemType === 'J_ENTRY') {
      return (
        <View>
          <BlogPicker
            userBlogs={props.userBlogs}
            setSelectedBlogTitle={setSelectedBlogTitle}
            selectedBlogTitle={selectedBlogTitle}
            isDraft={isDraft}
            checkUserBlogs={checkUserBlogs}
            setIsDraft={setIsDraft}
            defaultBlogTitle={props.defaultBlogTitle}
          />
        </View>
      );
    }

    // TODO other itemTypes
    return <View />;
  };

  return (
    <View>
      <RequiredWarningText customText={t`Fields marked by * are required.`} />
      {renderDisplayedFilename()}
      {renderTextInputs()}
      {renderFolderPicker()}
      {renderJournalPickerSwitch()}
      {renderQueueCancelButtons()}
    </View>
  );
}

export default UploadForm;
