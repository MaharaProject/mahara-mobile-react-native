import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import {StackActions} from '@react-navigation/native';
import {Icon, Input, Item, Picker, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-native-redux';
import buttons from '../../assets/styles/buttons';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import i18n from '../../i18n';
import {
  File,
  PendingJEntry,
  PendingMFile,
  UploadItemType,
  UserBlog,
  UserFolder,
  UserTag
} from '../../models/models';
import {
  newJournalEntry,
  newMaharaFile,
  newPendingJEntry,
  newPendingMFile,
  newUserTag
} from '../../models/typeCreators';
import {
  addTagsToItem,
  addUserTags,
  saveTaggedItemsToAsync
} from '../../store/actions/actions';
import {addFileToUploadList} from '../../store/actions/uploadFiles';
import {addJournalEntryToUploadList} from '../../store/actions/uploadJEntries';
import {RootState} from '../../store/reducers/rootReducer';
import {selectItemTagsStrings} from '../../store/reducers/userTagsReducer';
import {emptyPendingJEntry, emptyPendingMFile} from '../../utils/constants';
import {
  isValidText,
  putDefaultAtTop,
  removeExtension,
  setTagString
} from '../../utils/formHelper';
import {
  findUserTagByString,
  getUploadTypeIntlStrings,
  isPendingJEntry,
  isPendingMFile
} from '../../utils/helperFunctions';
import CancelButton from '../UI/CancelButton/CancelButton';
import FormInput from '../UI/FormInput/FormInput';
import MediumButton from '../UI/MediumButton/MediumButton';
import RequiredWarningText from '../UI/RequiredWarningText/RequiredWarningText';
import SubHeading from '../UI/SubHeading/SubHeading';
import uploadFormStyles from './UploadForm.style';
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
  itemTagIds: Set<number>;
};

const UploadForm = (props: Props) => {
  let editItemTags: Array<string> = [];
  if (props.editItem) {
    const pendingItem = props.editItem;
    editItemTags = useSelector((state: RootState) =>
      selectItemTagsStrings(state, pendingItem.id)
    );
  }

  const dispatch = useDispatch();
  const checkUserBlogs = props.userBlogs ? props.userBlogs.length > 0 : null;
  const {itemType} = props;
  const {pickedFile} = props;

  // STATE
  const [newTagText, setNewTagText] = useState('');
  const [selectedTag, setSelectedTag] = useState<State['selectedTag']>();
  const [showTagInput, setShowTagInput] = useState(false);
  // form values
  const [isDraft, setIsDraft] = useState(false);
  const [fileValid, setFileValid] = useState(pickedFile && pickedFile.size > 0);
  const [title, setTitle] = useState(''); // title and filename
  const [titleValid, setTitleValid] = useState(props.itemType !== 'J_ENTRY');
  const [description, setDescription] = useState(''); // description and journal entry
  const [descValid, setDescValid] = useState(props.itemType !== 'J_ENTRY');

  const [selectedFolder, setSelectedFolder] = useState(props.defFolderTitle);
  const [selectedBlog, setSelectedBlog] = useState(props.defaultBlogId);
  const [selectedTags, setSelectedTags] = useState<State['selectedTags']>(
    editItemTags
  );
  const [newTags, setNewTags] = useState<State['newTags']>([]);
  const [itemTagIds, setItemTagIds] = useState<State['itemTagIds']>(new Set());
  // error messages

  useEffect(() => {
    if (props.editItem) {
      if (isPendingMFile(props.editItem)) {
        const {maharaFormData} = props.editItem;
        // The file is set in AddItemScreen as the pickedFile.
        setTitle(removeExtension(maharaFormData.name));
        setDescription(maharaFormData.description);
        setSelectedFolder(maharaFormData.foldername);
        setTitleValid(true);
        setDescValid(true);
        setFileValid(true);
      }
      if (isPendingJEntry(props.editItem)) {
        const {journalEntry} = props.editItem;
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

  const hideTagInput = () => {
    setShowTagInput(false);
    setSelectedTag(newUserTag('...')); // TODO CHECK
  };

  /**
   * Creates a new UserTag instance and adds it to the set of tags of the current item being
   * created/edited. - then add to set of new tags being created to later add to redux and
   * hides the tag input.
   *
   * @param tagString string of tag to be created.
   */
  const addNewTagToItem = (tagString: string) => {
    const newTag = newUserTag(tagString);
    setItemTagIds(itemTagIds.add(newTag.id));
    setNewTags([...newTags, newTag]);
    hideTagInput();
  };

  /**
   * Handles action for the item selected in the tags picker dropdown.
   *
   * - If tagString === 'Add new tag +', show the tag input
   * - If the tagString matches an existing UserTag, assign that tagString as the selected one.
   * - If the tagString does not match an existing UserTag, assign that tagString as the
   *   selcted one and addNewTagToItem().
   * @param tagString for new UserTag
   */
  const selectTagHandler = (tagString: string) => {
    if (tagString === '') return;
    if (tagString === 'Add new tag +') {
      setShowTagInput(true);
      return;
    }

    if (selectedTags.includes(tagString)) return;

    // Find a matching tag
    const tagMatch = findUserTagByString(tagString, props.userTags);
    if (tagMatch) {
      setSelectedTag(tagMatch);
      setSelectedTags([...selectedTags, tagMatch.tag]);
      setItemTagIds(itemTagIds.add(tagMatch.id));
    } else {
      setSelectedTags([...selectedTags, tagString]);
      addNewTagToItem(tagString);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((item: string) => item !== tag));
  };

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
    const tagString = selectedTags ? setTagString(selectedTags) : '';
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
    if (selectedTags.length > 0) {
      dispatch(addTagsToItem(id, itemTagIds));
      dispatch(saveTaggedItemsToAsync());
    }

    // upon successful upload, remove the AddFile screen from the navigation stack
    props.navigation.dispatch(StackActions.popToTop());
    // then take user to PendingScreen
    props.navigation.navigate('PendingScreen', {added: true});
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
    if (itemType === 'J_ENTRY') return null;
    return (
      <View>
        <SubHeading required text={t`File`} />
        {fileValid ? (
          <Text accessibilityLabel={i18n._(t`A file has been added.`)}>
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
        text={itemType === 'J_ENTRY' ? t`Title` : t`Name`}
      />
      {/* {!titleValid && <RequiredWarningText />} */}
      <FormInput
        valid={itemType === 'J_ENTRY' && titleValid}
        value={title}
        onChangeText={(text: string) => updateTitle(text)}
      />
      <SubHeading
        required={itemType === 'J_ENTRY'}
        text={itemType === 'J_ENTRY' ? t`Entry` : t`Description`}
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
    if (itemType === 'J_ENTRY') return null;

    const matchingFolder = props.userFolders.find(
      f => f.title === props.defFolderTitle
    );

    const folders: Array<UserFolder> = putDefaultAtTop(
      null,
      matchingFolder,
      props.userFolders
    );

    return (
      <View>
        <SubHeading required text={t`Folder`} />
        {props.defFolderTitle === undefined && (
          <RequiredWarningText
            customText={t`Error: You do not have any folders on your site.`}
          />
        )}
        <Item regular>
          <Picker
            placeholder={props.defFolderTitle}
            accessibilityLabel={i18n._(t`Select folder`)}
            selectedValue={selectedFolder}
            onValueChange={(folder: string) => setSelectedFolder(folder)}>
            {folders &&
              folders.map((f: UserFolder) => {
                const label =
                  f.title === props.defFolderTitle
                    ? `${f.title} - ${i18n._(t`default`)}`
                    : f.title;
                return <Picker.Item label={label} value={f.title} key={f.id} />;
              })}
          </Picker>
        </Item>
      </View>
    );
  };

  const renderTagsPicker = () => (
    // const displayedSelectedTags = selectedTags.concat(arr);
    <View>
      <View style={uploadFormStyles.tagsContainer}>
        <SubHeading text={t`Tags`} />

        {/* Display selected tags */}
        {selectedTags?.map((value: string, index: number) => (
          <TouchableOpacity
            key={Math.random() * 100 + value}
            onPress={() => removeTag(value)}
            accessibilityRole="button"
            accessibilityLabel={value}
            accessibilityHint={i18n._(t`Tap to remove tag`)}>
            <View style={forms.tag}>
              <Text style={forms.tagText}>{value}</Text>
              <Text style={forms.tagClose} accessibilityLabel="">
                x
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* Create new tag */}
        {showTagInput && (
          <Item regular>
            <Input
              placeholder={i18n._(t`New tag...`)}
              onChangeText={(text: string) => setNewTagText(text)}
            />

            <Icon
              onPress={() => selectTagHandler(newTagText)}
              name="checkmark-outline"
            />
            <Icon onPress={() => setShowTagInput(false)} name="close-outline" />
          </Item>
        )}
      </View>
      {/* Display drop down of existing tags */}
      <Item regular style={[buttons.default]}>
        <Picker
          mode="dropdown"
          iosHeader="Select tags"
          placeholder={i18n._(t`Select tags`)}
          accessibilityLabel={i18n._(t`Select tags`)}
          selectedValue={selectedTag}
          onValueChange={(itemValue: string) => selectTagHandler(itemValue)}>
          <Picker.Item
            label={i18n._(t`Select tags...`)}
            value=""
            color={styles.colors.darkgrey}
          />
          <Picker.Item label={i18n._(t`Add new tag +`)} value="Add new tag +" />
          {props.userTags.map((value: UserTag, index: number) => (
            <Picker.Item
              label={value.tag}
              value={value.tag}
              key={props.userTags[index].id}
            />
          ))}
        </Picker>
      </Item>
    </View>
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
          icon="time-outline"
          text={
            props.editItem
              ? t`Confirm edits to ${intlItemType}`
              : t`Queue to upload`
          }
        />

        {/* Allow users to cancel edits */}
        {props.editItem && (
          <CancelButton
            navigation={props.navigation}
            onPress={() => {
              props.navigation.popToTop();
              props.navigation.navigate('Pending');
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
      <RequiredWarningText customText={t`Fields marked by * are required.`} />
      {renderDisplayedFilename()}
      {renderTextInputs()}
      {renderFolderPicker()}
      {renderJournalPickerSwitch()}
      {renderTagsPicker()}
      {renderButtons()}
    </View>
  );
};

export default withI18n()(UploadForm);
