import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useEffect, useState} from 'react';
import {Picker, Text, TouchableOpacity, View} from 'react-native';
import {Switch} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  StackActions
} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import sanitize from 'sanitize-filename';
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
import {
  JournalEntry,
  MaharaFile,
  MaharaFileFormData,
  MaharaPendingFile,
  PendingJournalEntry,
  UserBlog,
  UserFolder,
  UserTag
} from '../../models/models';
import {RootState} from '../../reducers/rootReducer';
import {selectItemTagsStrings} from '../../reducers/userTagsReducer';
import {JOURNAL_ENTRY} from '../../utils/constants';
import {
  isValidText,
  putDefaultAtTop,
  setTagString
} from '../../utils/formHelper';
import {
  findUserTagByString,
  isMaharaPendingFile,
  isPendingJournalEntry,
  newUserTag
} from '../../utils/helperFunctions';
import CancelButton from '../UI/CancelButton/CancelButton';
import FormInput from '../UI/FormInput/FormInput';
import MediumButton from '../UI/MediumButton/MediumButton';
import RequiredWarningText from '../UI/RequiredWarningText/RequiredWarningText';
import SubHeading from '../UI/SubHeading/SubHeading';
import uploadFormStyles from './UploadForm.style';

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
  let editItemTags = [];
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
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [selectedTags, setSelectedTags] = useState<State['selectedTags']>(
    editItemTags
  );
  const [newTags, setNewTags] = useState<State['newTags']>([]);
  const [itemTagIds, setItemTagIds] = useState<State['itemTagIds']>(new Set());
  // error messages
  const [showInvalidTitleMessage, setShowInvalidTitleMessage] = useState(false);
  const [showInvalidDescMessage, setShowInvalidDescMessage] = useState(false);
  const [showInvalidFileMessage, setShowInvalidFileNessage] = useState(
    fileValid
  );

  useEffect(() => {
    if (props.editItem) {
      if (isMaharaPendingFile(props.editItem)) {
        const {maharaFormData} = props.editItem;
        // The file is set in AddItemScreen as the pickedFile.
        setTitle(maharaFormData.title);
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
        setControlTitleValid(true);
        setControlDescValid(true);
      }
    }
  }, [props.editItem]);

  const hideTagInput = () => {
    setShowTagInput(false);
    setSelectedTag(newUserTag('...')); // TOD CHECK
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
   * Add files to uploadList and update new usertags in redux
   */
  const handleForm = () => {
    const {pickedFile} = props;
    const journalUrl = `${props.url}webservice/rest/server.php?alt=json`;
    let pendingJournalEntry: PendingJournalEntry = null;
    let pendingFileData: MaharaPendingFile = null;

    // Upload Journal Entry
    if (formType === JOURNAL_ENTRY) {
      const firstBlog = props.userBlogs ? props.userBlogs[0].id : 0;
      const jEntry: JournalEntry = {
        blogid: selectedBlog || firstBlog,
        wsfunction: 'module_mobileapi_upload_blog_post',
        wstoken: props.token,
        title: controlTitle,
        body: controlDesc,
        isdraft: isDraft
      };

      pendingJournalEntry = {
        id: props.editItem
          ? props.editItem.id
          : Math.random() * 10 + jEntry.title,
        journalEntry: jEntry,
        url: journalUrl
      };

      // add journal entry to pending list
      dispatch(addJournalEntryToUploadList(pendingJournalEntry));
    } else if (pickedFile) {
      // Upload File
      const tagString = selectedTags ? setTagString(selectedTags) : '';
      const fileUrl = `${props.url}/webservice/rest/server.php?alt=json${tagString}`;
      const extension = pickedFile.name.match(/\.[0-9a-z]+$/i);
      const filename = controlTitle
        ? sanitize(controlTitle) + extension
        : pickedFile.name;
      const firstFolder = props.userFolders ? props.userFolders[0].title : '';
      const folder = selectedFolder || firstFolder; // TODO: setting to first folder until we set up preferred default folder functionality
      const webService = 'module_mobileapi_upload_file';

      const formData: MaharaFileFormData = {
        description: controlDesc,
        filetoupload: pickedFile,
        foldername: folder,
        title: filename,
        webservice: webService,
        wstoken: props.token
      };

      pendingFileData = {
        id: props.editItem
          ? props.editItem.id
          : `${Math.random() * 10}${pickedFile.type}`,
        maharaFormData: formData,
        mimetype: pickedFile.type,
        url: fileUrl,
        type: formType
      };

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
        <SubHeading required={formType !== JOURNAL_ENTRY}>File</SubHeading>
        {fileValid ? (
          <Text accessibilityLabel={i18n._(t`A file has been added`)}>
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
        <RequiredWarningText customText={t`A file is required`} />
      )}
      <SubHeading required={formType === JOURNAL_ENTRY}>
        <Trans>Title</Trans>
      </SubHeading>
      {showInvalidTitleMessage && <RequiredWarningText />}
      <FormInput
        valid={controlTitleValid}
        style={forms.textInput}
        value={controlTitle}
        onChangeText={(title: string) => updateTitle(title)}
      />
      <SubHeading required={formType === JOURNAL_ENTRY}>
        <Trans>Description</Trans>
      </SubHeading>
      {showInvalidDescMessage && <RequiredWarningText />}
      <FormInput
        valid={controlDescValid}
        style={isMultiLine}
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
        <SubHeading>
          <Trans>Folder</Trans>
        </SubHeading>
        <View style={forms.pickerWrapper}>
          <Picker
            accessibilityLabel={i18n._(t`Select folder`)}
            selectedValue={selectedFolder}
            style={forms.picker}
            onValueChange={(folder: string) => setSelectedFolder(folder)}>
            {folders.map((f: UserFolder) => {
              const label =
                f.title === props.defaultFolderTitle
                  ? `${f.title} - default`
                  : f.title;
              return <Picker.Item label={label} value={f.title} key={f.id} />;
            })}
          </Picker>
        </View>
      </View>
    );
  };

  const renderJournalDraftSwitch = () => (
    <View style={{flexDirection: 'row'}}>
      <SubHeading>
        <Trans>Draft Journal Entry &nbsp;</Trans>
      </SubHeading>
      <Switch
        value={isDraft}
        accessibilityRole="switch"
        onValueChange={() => setIsDraft(!isDraft)}
        color={styles.colors.tertiary}
      />
    </View>
  );

  const renderBlogPicker = () => {
    if (formType !== JOURNAL_ENTRY) return null;

    // Await the aync retrieving data (default blogs)
    const matchingBlog = props.userBlogs.find(
      async (b: UserBlog) => b.id === props.defaultBlogId
    );
    const blogs: Array<UserBlog> = putDefaultAtTop(
      matchingBlog,
      null,
      props.userBlogs
    );

    if (formType === JOURNAL_ENTRY && !checkUserBlogs) {
      return <RequiredWarningText customText={t`Error: User has no Blogs`} />;
    }
    return (
      <View>
        {renderJournalDraftSwitch()}
        <SubHeading>
          <Trans>Journal</Trans>
        </SubHeading>
        <View style={forms.pickerWrapper}>
          <Picker
            accessibilityLabel={i18n._(t`Select blog`)}
            selectedValue={selectedBlog}
            style={forms.picker}
            onValueChange={(blogId: number) => setSelectedBlog(blogId)}>
            {blogs.map((blog: UserBlog) => {
              const label =
                blog.id === props.defaultBlogId
                  ? `${blog.title} - default`
                  : blog.title;
              return (
                <Picker.Item label={label} value={blog.id} key={blog.id} />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  };

  const renderTagsPicker = () => (
    // const displayedSelectedTags = selectedTags.concat(arr);
    <View>
      <View style={uploadFormStyles.tagsContainer}>
        <SubHeading>
          <Trans>Tags </Trans>
        </SubHeading>
        {/* Create new tag */}
        {showTagInput && (
          <View style={uploadFormStyles.tagsInputContainer}>
            <FormInput
              style={[forms.textInput, uploadFormStyles.tagsTextInput]}
              placeholder={t`Add new tag +`}
              onChangeText={(text: string) => setNewTagText(text)}
            />
            <TouchableOpacity
              accessibilityRole="button"
              style={uploadFormStyles.addButton}
              onPress={() => selectTagHandler(newTagText)}>
              <Text style={uploadFormStyles.addButtonText}>
                <Trans>Add</Trans>
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Display selected tags */}
        {/* TODO: get selectedTags from connected in redux */}
        {selectedTags?.map((value: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => removeTag(value)}
            accessibilityRole="button"
            accessibilityLabel={value}
            accessibilityHint={i18n._(t`Click to remove tag`)}>
            <View style={forms.tag}>
              <Text style={forms.tagText}>{value}</Text>
              <Text style={forms.tagClose} accessibilityLabel="">
                x
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* Display drop down of existing tags */}
      <View style={forms.pickerWrapper}>
        <Picker
          accessibilityLabel={i18n._(t`Select tags`)}
          selectedValue={selectedTag}
          style={forms.picker}
          onValueChange={(itemValue: string) => selectTagHandler(itemValue)}>
          <Picker.Item label="..." value="" color="#556d32" />
          <Picker.Item
            label={i18n._(t`Add new tag +`)}
            value="Add new tag +"
            color="#556d32"
          />
          {props.userTags.map((value: UserTag, index: number) => (
            <Picker.Item
              label={value.tag}
              value={value.tag}
              key={props.userTags[index].id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderUserMessages = () => {
    if (!controlTitleValid) setShowInvalidTitleMessage(true);
    if (!controlDescValid) setShowInvalidDescMessage(true);
    if (!fileValid) setShowInvalidFileNessage(true);
  };

  const renderButtons = () => {
    if (formType === JOURNAL_ENTRY) fileValid = true;
    const validButton = controlTitleValid && controlDescValid && fileValid;
    return (
      <View>
        <TouchableOpacity
          onPress={() => (validButton ? handleForm() : renderUserMessages())}
          accessibilityLabel={i18n._(t`Queue to upload`)}
          accessibilityRole="button">
          {/* Editing items */}
          {props.editItem && (
            <Trans>
              <Text
                style={{
                  ...buttons.lg,
                  backgroundColor: validButton
                    ? buttons.lg.backgroundColor
                    : styles.colors.darkgrey
                }}>
                Confirm edits to
                {formType}
              </Text>
            </Trans>
          )}

          {/* Creating items */}
          {!props.editItem && (
            <Text
              style={{
                ...buttons.lg,
                backgroundColor: validButton
                  ? buttons.lg.backgroundColor
                  : styles.colors.darkgrey
              }}>
              <FontAwesome5Icon name="clock" size={20}>
                {' '}
                <Trans>Queue to upload</Trans>
              </FontAwesome5Icon>
            </Text>
          )}
        </TouchableOpacity>

        {/* Allow users to cancel edits - TODO: in future do not hop navigation stacks -
          pressing the device back button will still remain on the wrong stack: AddScreen not Pending */}
        {props.editItem && (
          <MediumButton
            title={t`Cancel`}
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

  return (
    <View>
      <RequiredWarningText customText={t`Fields marked by * are required`} />
      {renderDisplayedFilename()}
      {renderTextInputs()}
      {renderFolderPicker()}
      {renderBlogPicker()}
      {renderTagsPicker()}
      {renderButtons()}
    </View>
  );
};

export default withI18n()(UploadForm);
