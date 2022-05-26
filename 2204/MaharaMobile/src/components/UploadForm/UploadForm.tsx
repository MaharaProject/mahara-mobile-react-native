// import {t} from '@lingui/macro';
// import {withI18n} from '@lingui/react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { StackActions } from '@react-navigation/native';
import { Box, Item, Picker, Select, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import i18n from '../../i18n';
import {
  File,
  PendingJEntry,
  PendingMFile,
  UploadItemType,
  UserBlog,
  UserFolder,
  UserTag,
} from '../../models/models';
import {
  newJournalEntry,
  newMaharaFile,
  newPendingJEntry,
  newPendingMFile,
} from '../../models/typeCreators';
import {
  updateItemTags as updateItemTagsIds,
  addUserTags,
  saveTaggedItemsToAsync,
} from '../../store/actions/actions';
import { addFileToUploadList } from '../../store/actions/uploadFiles';
import { addJournalEntryToUploadList } from '../../store/actions/uploadJEntries';
import { RootState } from '../../store/reducers/rootReducer';
import { getItemTags } from '../../store/reducers/userTagsReducer';
import { emptyPendingJEntry, emptyPendingMFile } from '../../utils/constants';
import {
  isValidText,
  putDefaultAtTop,
  removeExtension,
  RequiredWarningText,
  setTagString,
} from '../../utils/formHelper';
import {
  getUploadTypeIntlStrings,
  isPendingJEntry,
  isPendingMFile,
} from '../../utils/helperFunctions';
import CancelButton from '../UI/CancelButton/CancelButton';
import FormInput from '../UI/FormInput/FormInput';
import MediumButton from '../UI/MediumButton/MediumButton';
import SubHeading from '../UI/SubHeading/SubHeading';
import TagsPicker from './TagsPicker';
import BlogPicker from './UploadFormComponents';

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
  defaultBlogId: number;
};

type State = {
  selectedTags: Array<string>;
  selectedTag: UserTag;
  newTags: Array<UserTag>;
  itemTagIds: Array<number>;
};

const UploadForm = (props: Props) => {
  let existingItemTags: Array<UserTag>;
  if (props.editItem) {
    const uploadItem = props.editItem;

    existingItemTags = useSelector((state: RootState) =>
      getItemTags(state, uploadItem.id)
    );
  }

  const dispatch = useDispatch();
  const checkUserBlogs = props.userBlogs ? props.userBlogs.length > 0 : null;
  const { itemType } = props;
  const { pickedFile } = props;

  // STATE
  const [isDraft, setIsDraft] = useState(false);
  const [fileValid, setFileValid] = useState(pickedFile && pickedFile.size > 0);
  const [title, setTitle] = useState(''); // title and filename
  const [titleValid, setTitleValid] = useState(props.itemType !== 'J_ENTRY');
  const [description, setDescription] = useState(''); // description and journal entry
  const [descValid, setDescValid] = useState(props.itemType !== 'J_ENTRY');

  const [selectedFolder, setSelectedFolder] = useState(props.defFolderTitle);
  const [selectedBlog, setSelectedBlog] = useState(props.defaultBlogId);
  const [selectedTagsStrings, setSelectedTagsStrings] = useState<
    State['selectedTags']
  >([]);
  const [itemTagsIds, setItemTagsIds] = useState<Array<number>>([]);
  const [newTags, setNewTags] = useState<State['newTags']>([]);
  // the itemTagsIds is what gets submitted by the form

  useEffect(() => {
    if (props.editItem) {
      if (isPendingMFile(props.editItem)) {
        const { maharaFormData } = props.editItem;
        // The file is set in AddItemScreen as the pickedFile.
        setTitle(removeExtension(maharaFormData.name));
        setDescription(maharaFormData.description);
        setSelectedFolder(maharaFormData.foldername);
        setTitleValid(true);
        setDescValid(true);
        setFileValid(true);
      }
      if (isPendingJEntry(props.editItem)) {
        const { journalEntry } = props.editItem;
        setTitle(journalEntry.title);
        setDescription(journalEntry.body);
        setSelectedBlog(journalEntry.blogid);
        setIsDraft(journalEntry.isdraft);
        setTitleValid(true);
        setDescValid(true);
      }
    }
  }, [props.editItem]);

  const checkFileValid = () => {
    if (itemType === 'J_ENTRY') {
      setFileValid(true);
    }

    if (pickedFile) {
      setFileValid(pickedFile.size > 0);
    }
  };

  useEffect(() => {
    checkFileValid();
  }, [pickedFile]);

  /**
   * Creates PendingJEntry, adds to upload queue
   * Updates the id if needed and returns the id
   * @param id
   */
  const addJEntryToUpload = (id: string): string => {
    const journalUrl = `${props.url}webservice/rest/server.php?alt=json`;
    let pendingJournalEntry: PendingJEntry = emptyPendingJEntry;

    const firstBlog = props.userBlogs ? props.userBlogs[0].id : 0;
    const jEntry = newJournalEntry(
      selectedBlog || firstBlog,
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
    const tagString = selectedTagsStrings
      ? setTagString(selectedTagsStrings)
      : '';
    const fileUrl = `${props.url}/webservice/rest/server.php?alt=json${tagString}`;
    const extension = file.name.match(/\.[0-9a-z]+$/i) ?? '';

    const filename = title ? title + extension : file.name;

    const firstFolder = props.userFolders ? props.userFolders[0].title : '';
    const folder = selectedFolder || firstFolder;
    const webService = 'module_mobileapi_upload_file';

    const updatedFile = {
      ...file,
      name: filename,
    };

    const formData = newMaharaFile(
      webService,
      props.token,
      folder,
      filename,
      description,
      updatedFile
    );

    pendingFileData = newPendingMFile(
      id,
      fileUrl,
      formData,
      file.type,
      itemType
    );

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
    // if (selectedTags.length > 0) {
    // if a tag was removed, we need to update it too.
    dispatch(updateItemTagsIds(id, itemTagsIds));
    dispatch(saveTaggedItemsToAsync());
    // }

    // upon successful upload, remove the AddFile screen from the navigation stack
    props.navigation.dispatch(StackActions.popToTop());
    // then take user to PendingScreen
    props.navigation.navigate('Upload queue tab', { added: true });
  };

  const updateTitle = (newTitle: string) => {
    setTitleValid(isValidText(itemType, newTitle));
    setTitle(newTitle);
  };

  const updateDescription = (desc: string) => {
    setDescValid(isValidText(itemType, desc));
    setDescription(desc);
  };

  const renderDisplayedFilename = () => {
    if (itemType === 'J_ENTRY') {
      return null;
    }
    return (
      <View>
        {/* <SubHeading required text={t`File`} /> */}
        <SubHeading required text="File" />
        {fileValid ? (
          <Text
          // accessibilityLabel={i18n._(t`A file has been added.`)}
          >
            {pickedFile?.name}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderTextInputs = () => (
    <View>
      {/* Error messages */}
      {/* {!fileValid && itemType !== 'J_ENTRY' && (
        <RequiredWarningText customText={t`A file is required.`} />
      )} */}
      <SubHeading
        required={itemType === 'J_ENTRY'}
        // text={itemType === 'J_ENTRY' ? t`Title` : t`Name`}
        text={itemType === 'J_ENTRY' ? 'Title' : 'Name'}
      />
      {/* {!titleValid && <RequiredWarningText />} */}
      <FormInput
        valid={itemType === 'J_ENTRY' && titleValid}
        value={title}
        onChangeText={(text: string) => updateTitle(text)}
      />
      <SubHeading
        required={itemType === 'J_ENTRY'}
        // text={itemType === 'J_ENTRY' ? t`Entry` : t`Description`}
        text={itemType === 'J_ENTRY' ? 'Entry' : 'Description'}
      />
      {/* {!descValid && <RequiredWarningText />} */}
      <FormInput
        multiline
        valid={itemType === 'J_ENTRY' && descValid}
        value={description}
        onChangeText={(desc: string) => updateDescription(desc)}
      />
    </View>
  );

  const renderFolderPicker = () => {
    if (itemType === 'J_ENTRY') {
      return null;
    }

    const matchingFolder = props.userFolders.find(
      (f) => f.title === props.defFolderTitle
    );

    const folders: Array<UserFolder> = putDefaultAtTop(
      null,
      matchingFolder,
      props.userFolders
    );

    return (
      <View>
        {/* <SubHeading required text={t`Folder`} /> */}
        <SubHeading required text="Folder" />
        {props.defFolderTitle === undefined && (
          <RequiredWarningText
            // customText={t`Error: You do not have any folders on your site.`}
            customText="Error: You do not have any folders on your site."
          />
        )}
        <Box regular>
          <Select
            placeholder={props.defFolderTitle}
            // accessibilityLabel={i18n._(t`Select folder`)}
            selectedValue={selectedFolder}
            onValueChange={(folder: string) => setSelectedFolder(folder)}>
            {folders &&
              folders.map((f: UserFolder) => {
                const label =
                  f.title === props.defFolderTitle
                    ? // ? `${f.title} - ${i18n._(t`default`)}`
                      `${f.title} - default}`
                    : f.title;
                return <Select.Item label={label} value={f.title} key={f.id} />;
              })}
          </Select>
        </Box>
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
      // onUpdateItemTags={}
    />
  );

  const getFormValidation = () => {
    const fileFormIsValid = fileValid && !!selectedFolder;
    const journalFormIsValid = descValid && titleValid && selectedBlog !== 0;

    if (itemType !== 'J_ENTRY') {
      return fileFormIsValid;
    }
    return journalFormIsValid;
  };

  const renderButtons = () => {
    const validButton = getFormValidation();
    const intlItemType = getUploadTypeIntlStrings(itemType);
    return (
      <View>
        <MediumButton
          onPress={handleForm}
          invalid={!validButton}
          icon={faClock}
          text={
            props.editItem
              ? // ? t`Confirm edits to ${intlItemType}`
                // : t`Queue to upload`
                `Confirm edits to ${intlItemType}`
              : 'Queue to upload'
          }
        />

        {/* Allow users to cancel edits */}
        {props.editItem && (
          <CancelButton
            navigation={props.navigation}
            onPress={() => {
              props.navigation.popToTop();
              props.navigation.navigate('Upload queue tab');
            }}
          />
        )}

        {!props.editItem && <CancelButton navigation={props.navigation} />}
      </View>
    );
  };

  const renderJournalPickerSwitch = () => {
    if (itemType === 'J_ENTRY') {
      return (
        <View>
          <BlogPicker
            userBlogs={props.userBlogs}
            setSelectedBlog={setSelectedBlog}
            selectedBlog={selectedBlog}
            isDraft={isDraft}
            checkUserBlogs={checkUserBlogs}
            setIsDraft={setIsDraft}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      );
    }

    // TODO other itemTypes
    return <View />;
  };

  return (
    <View>
      <RequiredWarningText
        // customText={t`Fields marked by * are required.`}
        customText="Fields marked by * are required."
      />
      {renderDisplayedFilename()}
      {renderTextInputs()}
      {renderFolderPicker()}
      {renderJournalPickerSwitch()}
      {renderTagsPicker()}
      {renderButtons()}
    </View>
  );
};

// export default withI18n()(UploadForm);
export default UploadForm;
