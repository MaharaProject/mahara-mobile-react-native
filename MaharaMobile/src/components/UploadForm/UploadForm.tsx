import { i18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { useEffect, useState } from 'react';
import { Picker, Text, TouchableOpacity, View } from 'react-native';
import { StackActions } from 'react-navigation';
import { useDispatch } from 'react-redux';
import sanitize from 'sanitize-filename';
import { addFileToUploadList, addJournalEntryToUploadList } from '../../actions/actions';
import buttons from '../../assets/styles/buttons';
import forms from '../../assets/styles/forms';
import styles from '../../assets/styles/variables';
import { JournalEntry, MaharaFile, MaharaFileFormData, MaharaPendingFile, PendingJournalEntry, UserBlog, UserFolder, UserTag } from '../../models/models';
import { JOURNAL_ENTRY } from '../../utils/constants';
import { RequiredWarningText, setTagString, SubHeading, validateText } from '../../utils/formHelper';
import { isJournalEntry, isMaharaFileFormData } from '../../utils/helperFunctions';
import CancelButton from '../UI/CancelButton/CancelButton';
import FormInput from '../UI/FormInput/FormInput';
import MediumButton from '../UI/MediumButton/MediumButton';
import uploadFormStyles from './UploadForm.style';

type Props = {
  pickedFile?: MaharaFile;
  userFolders?: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs?: Array<UserBlog>;
  formType: string;
  token: string;
  url: string;
  editItem?: MaharaPendingFile | PendingJournalEntry;
  navigation: any;
};

type State = {
  selectedTags: Array<string>;
};

const UploadForm = (props: Props) => {
  // Translation strings
  const formStrings = {
    ENTER_TITLE: i18n._(t`Enter a title`),
    ERROR_NO_BLOGS: i18n._(t` Error: User has no Blogs`),
    CONFIRM_EDITS_TO: i18n._(t`Confirm edits to`),
    FIELDS_REQUIRED: i18n._(t`"Fields marked by * are required"`),
    SAVE_TO_PENDING: i18n._(t`Save item to Pending`),
    ADD_NEW_TAG: i18n._(t`Add new tag +`),
    NEW_TAG: i18n._(t`New tag\u2026`),
    ENTER_DESC: i18n._(t`Enter a description`),
    ENTER_DETAIL: i18n._(t`Enter detail`)
  };

  const dispatch = useDispatch();
  const isMultiLine = props.formType !== JOURNAL_ENTRY ? forms.multiLine : [forms.multiLine, uploadFormStyles.description];
  const placeholder = props.formType !== JOURNAL_ENTRY ? formStrings.ENTER_DESC : formStrings.ENTER_DETAIL;
  const checkUserBlogs = props.userBlogs ? props.userBlogs.length > 0 : null;
  const { formType } = props;
  let fileValid = props.pickedFile ? props.pickedFile.size > 0 : false;

  // STATE
  const [newTag, addNewTag] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [hidden, showTagInput] = useState(false);
  // form fields
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
  const [selectedTags, setTags] = useState<State['selectedTags']>([]);
  // error messages
  const [showInvalidTitleMessage, setShowInvalidTitleMessage] = useState(false);
  const [showInvalidDescMessage, setShowInvalidDescMessage] = useState(false);
  const [showInvalidFileMessage, setShowInvalidFileNessage] = useState(fileValid);

  useEffect(() => {
    if (props.editItem) {
      if (isMaharaFileFormData(props.editItem)) {
        const maharaFormData: MaharaFileFormData = props.editItem;

        setTitle(maharaFormData.title);
        setDescription(maharaFormData.description);
        setSelectedFolder(maharaFormData.foldername);
        setTags(maharaFormData.tags);
      }

      if (isJournalEntry(props.editItem)) {
        const journalEntry: JournalEntry = props.editItem;
        setTitle(journalEntry.title);
        setDescription(journalEntry.body);
        setSelectedBlog(journalEntry.blogid);
        setTags(journalEntry.tags);
      }
    }
  }, [props.editItem]);

  const addTag = (tag: string) => {
    if (tag === 'Add new tag +') {
      showTagInput(true);
    } else if (tag && !selectedTags.includes(tag)) {
      showTagInput(false);
      setTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(selectedTags.filter((item: string) => item !== tag));
  };

  // Add files to uploadList
  const handleForm = () => {
    const { pickedFile } = props;
    const journalUrl = `${props.url}webservice/rest/server.php?alt=json`;

    // Upload Journal Entry
    if (formType === JOURNAL_ENTRY) {
      const firstBlog = props.userBlogs ? props.userBlogs[0].id : 0;
      const jEntry: JournalEntry = {
        blogid: selectedBlog || firstBlog,
        wsfunction: 'module_mobileapi_upload_blog_post',
        wstoken: props.token,
        title: controlTitle,
        body: controlDesc,
        isdraft: false,
        tags: selectedTags
      };

      const pendingJournalEntry: PendingJournalEntry = {
        id: props.editItem ? props.editItem.id : Math.random() * 10 + jEntry.title,
        journalEntry: jEntry,
        url: journalUrl
      };

      // add journal entry to pending list
      dispatch(addJournalEntryToUploadList(pendingJournalEntry));
    } else if (pickedFile) {
      // Upload File
      const tagString = selectedTags ? setTagString(selectedTags) : '';
      const fileUrl = props.url + '/webservice/rest/server.php?alt=json' + tagString;
      const extension = pickedFile.name.match(/\.[0-9a-z]+$/i);
      const filename = controlTitle ? sanitize(controlTitle) + extension : pickedFile.name;
      const firstFolder = props.userFolders ? props.userFolders[0].title : '';
      const folder = selectedFolder || firstFolder; // TODO: setting to first folder until we set up preferred default folder functionality
      const webService = 'module_mobileapi_upload_file';

      const fileData: MaharaFile = {
        uri: pickedFile.uri,
        type: pickedFile.type,
        name: pickedFile.name,
        size: pickedFile.size
      };

      const formData: MaharaFileFormData = {
        description: controlDesc,
        filetoupload: fileData,
        foldername: folder,
        title: filename,
        webservice: webService,
        wstoken: props.token,
        tags: selectedTags
      };

      const pendingFileData: MaharaPendingFile = {
        id: props.editItem
          ? props.editItem.id
          : Math.random() * 10 + '' + fileData.type,
        maharaFormData: formData,
        mimetype: pickedFile.type,
        url: fileUrl,
        type: formType
      };

      dispatch(addFileToUploadList(pendingFileData));
    }

    // upon successful upload, remove the AddFile screen from the navigation stack
    props.navigation.dispatch(StackActions.popToTop());
    // then take user to PendingScreen
    props.navigation.navigate('Pending');
  };

  const updateTitle = (title: string) => {
    if (showInvalidTitleMessage) setShowInvalidTitleMessage(false);
    setControlTitleValid(validateText(formType, title));
    setTitle(title);
  };

  const updateDescription = (desc: string) => {
    if (showInvalidDescMessage) setShowInvalidDescMessage(false);
    setControlDescValid(validateText(formType, desc));
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
        <RequiredWarningText customText={i18n._(t`A file is required`)} />
      )}
      <SubHeading required={formType === JOURNAL_ENTRY}>
        <Trans>Title</Trans>
      </SubHeading>
      {showInvalidTitleMessage && <RequiredWarningText />}
      <FormInput
        valid={controlTitleValid}
        style={forms.textInput}
        placeholder={i18n._(t`${formStrings.ENTER_TITLE}`)}
        value={controlTitle}
        onChangeText={(title: string) => updateTitle(title.trim())}
      />
      <SubHeading required={formType === JOURNAL_ENTRY}>
        <Trans>Description</Trans>
      </SubHeading>
      {showInvalidDescMessage && <RequiredWarningText />}
      <FormInput
        valid={controlDescValid}
        style={isMultiLine}
        placeholder={placeholder}
        value={controlDesc}
        onChangeText={(desc: string) => updateDescription(desc.trim())}
      />
    </View>
  );

  const renderFolderPicker = () => {
    if (formType === JOURNAL_ENTRY) return null;
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
            {props.userFolders?.map((folder: UserFolder, index: number) => (
              <Picker.Item
                label={folder.title}
                value={folder.title}
                key={index}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  const renderBlogPicker = () => {
    if (formType !== JOURNAL_ENTRY) return null;
    if (formType === JOURNAL_ENTRY && !checkUserBlogs) {
      return (
        <RequiredWarningText
          customText={i18n._(t`${formStrings.ERROR_NO_BLOGS}`)}
        />
      );
    }
    return (
      <View>
        <SubHeading>Blog</SubHeading>
        <View style={forms.pickerWrapper}>
          <Picker
            accessibilityLabel={i18n._(t`Select blog`)}
            selectedValue={selectedBlog}
            style={forms.picker}
            onValueChange={(blogId: number) => setSelectedBlog(blogId)}>
            {props.userBlogs?.map((blog: UserBlog, index: number) => (
              <Picker.Item label={blog.title} value={blog.id} key={index} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  const renderTagsPicker = () => (
    <View>
      <View style={uploadFormStyles.tagsContainer}>
        <SubHeading>
          <Trans>Tags </Trans>
        </SubHeading>
        {hidden ? (
          <View style={uploadFormStyles.tagsInputContainer}>
            <FormInput
              style={[forms.textInput, uploadFormStyles.tagsTextInput]}
              placeholder={formStrings.NEW_TAG}
              onChangeText={(text: string) => addNewTag(text)}
            />
            <TouchableOpacity
              accessibilityRole="button"
              style={uploadFormStyles.addButton}
              onPress={() => {
                addTag(newTag);
                setSelectedTag('...');
              }}>
              <Text style={uploadFormStyles.addButtonText}>
                <Trans>Add</Trans>
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {selectedTags?.map((value: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => removeTag(value)}
            accessibilityRole="button"
            accessibilityLabel={value}
            accessibilityHint={i18n._(t`Click to remove tag`)}>
            <View style={forms.tag}>
              <Text style={forms.tagText}>{value}</Text>
              <Text style={forms.tagClose} accessibilityLabel="">x</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={forms.pickerWrapper}>
        <Picker
          accessibilityLabel={i18n._(t`Select tags`)}
          selectedValue={selectedTag}
          style={forms.picker}
          onValueChange={(itemValue: string) => {
            setSelectedTag(itemValue);
            addTag(itemValue);
          }}>
          <Picker.Item label="..." value="" color="#556d32" />
          {props.userTags?.map((value: UserTag, index: number) => (
            <Picker.Item label={value.tag} value={value.tag} key={index} />
          ))}
          <Picker.Item
            label={formStrings.ADD_NEW_TAG}
            value="Add new tag +"
            color="#556d32"
          />
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
          accessibilityLabel={i18n._(t`${formStrings.SAVE_TO_PENDING}`)}
          accessibilityRole="button">
          {/* Editing items */}
          {/* TODO: validation for edit button */}
          {props.editItem && (
            <Trans>
              <Text style={buttons.lg}>
                {i18n._(t`${formStrings.CONFIRM_EDITS_TO}`)}
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
              <Trans>Add {formType} to Pending</Trans>
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
      <RequiredWarningText
        customText={i18n._(t`${formStrings.FIELDS_REQUIRED}`)}
      />
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
