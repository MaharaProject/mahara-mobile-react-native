import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import {Icon, Input, Item, Picker, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  StackActions
} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFileToUploadList,
  addJournalEntryToUploadList,
  addTagsToItem,
  addUserTags,
  saveTaggedItemsToAsync
} from '../../actions/actions';
import buttons from '../../assets/styles/buttons';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import i18n from '../../i18n';
import {
  MaharaFile,
  MaharaPendingFile,
  PendingJournalEntry,
  UserBlog,
  UserFolder,
  UserTag
} from '../../models/models';
import {
  newJournalEntry,
  newMaharaFileFormData,
  newMaharaPendingFile,
  newPendingJournalEntry,
  newUserTag
} from '../../models/typeCreators';
import {RootState} from '../../reducers/rootReducer';
import {selectItemTagsStrings} from '../../reducers/userTagsReducer';
import {JOURNAL_ENTRY} from '../../utils/constants';
import {
  isValidText,
  putDefaultAtTop,
  removeExtension,
  setTagString
} from '../../utils/formHelper';
import {
  findUserTagByString,
  isMaharaPendingFile,
  isPendingJournalEntry
} from '../../utils/helperFunctions';
import CancelButton from '../UI/CancelButton/CancelButton';
import FormInput from '../UI/FormInput/FormInput';
import MediumButton from '../UI/MediumButton/MediumButton';
import RequiredWarningText from '../UI/RequiredWarningText/RequiredWarningText';
import SubHeading from '../UI/SubHeading/SubHeading';
import uploadFormStyles from './UploadForm.style';
import BlogPicker from './UploadFormJournalComponents';

type Props = {
  pickedFile?: MaharaFile;
  userFolders?: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
  formType: string;
  token: string;
  url: string;
  editItem?: MaharaPendingFile | PendingJournalEntry;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  defaultFolderTitle: string;
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
    editItemTags = useSelector((state: RootState) =>
      selectItemTagsStrings(state, props.editItem.id)
    );
  }

  const dispatch = useDispatch();
  const isMultiLine =
    props.formType !== JOURNAL_ENTRY
      ? forms.multiLine
      : [forms.multiLine, uploadFormStyles.description];
  const checkUserBlogs = props.userBlogs ? props.userBlogs.length > 0 : null;
  const {formType} = props;
  let fileValid = props.pickedFile ? props.pickedFile.size > 0 : false;

  // STATE
  const [newTagText, setNewTagText] = useState('');
  const [selectedTag, setSelectedTag] = useState<State['selectedTag']>();
  const [showTagInput, setShowTagInput] = useState(false);
  // form values
  const [isDraft, setIsDraft] = useState(false);
  const [controlTitle, setTitle] = useState('');
  const [controlDesc, setDescription] = useState('');
  const [controlTitleValid, setControlTitleValid] = useState(
    props.formType !== JOURNAL_ENTRY
  );
  const [controlDescValid, setControlDescValid] = useState(
    props.formType !== JOURNAL_ENTRY
  );
  const [selectedFolder, setSelectedFolder] = useState(
    props.defaultFolderTitle
  );
  const [selectedBlog, setSelectedBlog] = useState(props.defaultBlogId);
  const [selectedTags, setSelectedTags] = useState<State['selectedTags']>(
    editItemTags
  );
  const [newTags, setNewTags] = useState<State['newTags']>([]);
  const [itemTagIds, setItemTagIds] = useState<State['itemTagIds']>(new Set());
  // error messages
  const [showInvalidTitleMessage, setShowInvalidTitleMessage] = useState(false);
  const [showInvalidDescMessage, setShowInvalidDescMessage] = useState(false);
  const [showInvalidFileMessage, setShowInvalidFileMessage] = useState(
    fileValid
  );

  useEffect(() => {
    if (props.editItem) {
      if (isMaharaPendingFile(props.editItem)) {
        const {maharaFormData} = props.editItem;
        // The file is set in AddItemScreen as the pickedFile.
        setTitle(removeExtension(maharaFormData.name));
        setDescription(maharaFormData.description);
        setSelectedFolder(maharaFormData.foldername);
        setControlTitleValid(true);
        setControlDescValid(true);
      }
      if (isPendingJournalEntry(props.editItem)) {
        const {journalEntry} = props.editItem;
        setTitle(journalEntry.title);
        setDescription(journalEntry.body);
        setSelectedBlog(journalEntry.blogid);
        setIsDraft(journalEntry.isdraft);
        setControlTitleValid(true);
        setControlDescValid(true);
      }
    }
  }, [props.editItem]);

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
   * Add/edit files to uploadList and update new usertags in redux
   */
  const handleForm = () => {
    const {pickedFile} = props;
    const journalUrl = `${props.url}webservice/rest/server.php?alt=json`;
    const id = props.editItem ? props.editItem.id : null;
    let pendingJournalEntry: PendingJournalEntry = null;
    let pendingFileData: MaharaPendingFile = null;

    // Upload Journal Entry
    if (formType === JOURNAL_ENTRY) {
      const firstBlog = props.userBlogs ? props.userBlogs[0].id : 0;
      const jEntry = newJournalEntry(
        selectedBlog || firstBlog,
        props.token,
        controlTitle,
        controlDesc,
        isDraft
      );

      pendingJournalEntry = newPendingJournalEntry(id, journalUrl, jEntry);

      // add journal entry to pending list
      dispatch(addJournalEntryToUploadList(pendingJournalEntry));
    } else if (pickedFile) {
      // Upload File
      const tagString = selectedTags ? setTagString(selectedTags) : '';
      const fileUrl = `${props.url}/webservice/rest/server.php?alt=json${tagString}`;
      const extension = pickedFile.name.match(/\.[0-9a-z]+$/i);

      const filename = controlTitle
        ? controlTitle + extension
        : pickedFile.name;

      const firstFolder = props.userFolders ? props.userFolders[0].title : '';
      const folder = selectedFolder || firstFolder;
      const webService = 'module_mobileapi_upload_file';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let updatedPickedFile: any = {}; // deliberate any
      if (filename !== pickedFile.name) {
        updatedPickedFile = {
          ...pickedFile,
          name: filename
        };
      }

      const formData = newMaharaFileFormData(
        webService,
        props.token,
        folder,
        filename,
        controlDesc,
        updatedPickedFile.name ? updatedPickedFile : pickedFile
      );

      pendingFileData = newMaharaPendingFile(
        id,
        fileUrl,
        formData,
        pickedFile.type,
        formType
      );

      dispatch(addFileToUploadList(pendingFileData));
    }

    // Update tags in redux
    if (newTags.length > 0) {
      dispatch(addUserTags(newTags));
    }
    // Attach tags to item on queue to pending
    if (selectedTags.length > 0) {
      dispatch(
        addTagsToItem(
          pendingFileData?.id || pendingJournalEntry?.id,
          itemTagIds
        )
      );
      dispatch(saveTaggedItemsToAsync());
    }

    // upon successful upload, remove the AddFile screen from the navigation stack
    props.navigation.dispatch(StackActions.popToTop());
    // then take user to PendingScreen
    props.navigation.navigate('Pending');
  };

  const updateTitle = (title: string) => {
    if (showInvalidTitleMessage) setShowInvalidTitleMessage(false);
    setControlTitleValid(isValidText(formType, title));
    setTitle(title);
  };

  const updateDescription = (desc: string) => {
    if (showInvalidDescMessage) setShowInvalidDescMessage(false);
    setControlDescValid(isValidText(formType, desc));
    setDescription(desc);
  };

  const renderDisplayedFilename = () => {
    if (formType === JOURNAL_ENTRY) return null;
    return (
      <View>
        <SubHeading required={formType !== JOURNAL_ENTRY} text={t`File`} />
        {fileValid ? (
          <Text accessibilityLabel={i18n._(t`A file has been added.`)}>
            {props.pickedFile?.name}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderTextInputs = () => (
    <View>
      {/* Error messages */}
      {showInvalidFileMessage && (
        <RequiredWarningText customText={t`A file is required.`} />
      )}
      <SubHeading
        required={formType === JOURNAL_ENTRY}
        text={formType === JOURNAL_ENTRY ? t`Title` : t`Name`}
      />
      {showInvalidTitleMessage && <RequiredWarningText />}
      <FormInput
        valid={controlTitleValid}
        value={controlTitle}
        onChangeText={(title: string) => updateTitle(title)}
      />
      <SubHeading
        required={formType === JOURNAL_ENTRY}
        text={formType === JOURNAL_ENTRY ? t`Entry` : t`Description`}
      />
      {showInvalidDescMessage && <RequiredWarningText />}
      <FormInput
        multiline
        valid={controlDescValid}
        value={controlDesc}
        onChangeText={(desc: string) => updateDescription(desc)}
      />
    </View>
  );

  const renderFolderPicker = () => {
    if (formType === JOURNAL_ENTRY) return null;

    const matchingFolder = props.userFolders.find(
      f => f.title === props.defaultFolderTitle
    );

    const folders: Array<UserFolder> = putDefaultAtTop(
      null,
      matchingFolder,
      props.userFolders
    );

    return (
      <View>
        <SubHeading text={t`Folder`} />
        <Item regular>
          <Picker
            placeholder={props.defaultFolderTitle}
            accessibilityLabel={i18n._(t`Select folder`)}
            selectedValue={selectedFolder}
            onValueChange={(folder: string) => setSelectedFolder(folder)}>
            {folders &&
              folders.map((f: UserFolder) => {
                const label =
                  f.title === props.defaultFolderTitle
                    ? `${f.title} - default`
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
            key={index}
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
              name="add-outline"
            />
            <Icon onPress={() => setShowTagInput(false)} name="close-outline" />
          </Item>
        )}
      </View>
      {/* Display drop down of existing tags */}
      <View>
        <Item regular style={buttons.default}>
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
            <Picker.Item
              label={i18n._(t`Add new tag +`)}
              value="Add new tag +"
            />
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
    </View>
  );

  const renderUserMessages = () => {
    if (!controlTitleValid) setShowInvalidTitleMessage(true);
    if (!controlDescValid) setShowInvalidDescMessage(true);
    if (!fileValid) setShowInvalidFileMessage(true);
  };

  const renderButtons = () => {
    if (formType === JOURNAL_ENTRY) fileValid = true;
    const validButton = controlTitleValid && controlDescValid && fileValid;
    return (
      <View>
        <MediumButton
          onPress={() => (validButton ? handleForm() : renderUserMessages())}
          accessibilityLabel={i18n._(t`Queue to upload`)}
          invalid={!validButton}
          icon="time-outline"
          text={
            props.editItem
              ? t`Confirm edits to ${formType}`
              : t`Queue to upload`
          }
        />

        {/* Allow users to cancel edits */}
        {props.editItem && (
          <MediumButton
            text={t`Cancel`}
            style={buttons.cancel}
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
    if (formType === JOURNAL_ENTRY) {
      return (
        <View>
          <BlogPicker
            userBlogs={props.userBlogs}
            setSelectedBlog={setSelectedBlog}
            selectedBlog={selectedBlog}
            isDraft={isDraft}
            checkUserBlogs={checkUserBlogs}
            setIsDraft={setIsDraft}
          />
        </View>
      );
    }

    // TODO other formTypes
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
