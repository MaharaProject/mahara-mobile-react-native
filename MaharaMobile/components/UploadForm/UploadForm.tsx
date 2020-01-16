import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';

import styles from './UploadForm.style';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';
import { UserFolder, MaharaFile, JournalEntry,UserTag, UserBlog, PendingJournalEntry, MaharaFileFormData, MaharaPendingFile } from '../../models/models';
import { addFileToUploadList, addJournalEntryToUploadList } from '../../actions/actions';
import setTagString from '../../utils/formhelper';
import popNavigationStack from '../../utils/helperFunctions';
import { StackActions } from 'react-navigation';

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
}

type State = {
  selectedTags: Array<string>;
};

const UploadForm = (props: Props) => {
  const [newTag, addNewTag] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [hidden, showTagInput] = useState(false);
  // form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [selectedTags, setTags] = useState<State['selectedTags']>([]);

  useEffect(() => {
    if (props.editItem) {
      if (props.editItem.maharaFormData) {
        setTitle(props.editItem.maharaFormData.title)
        setDescription(props.editItem.maharaFormData.description)
        setSelectedFolder(props.editItem.maharaFormData.foldername)
        setTags(props.editItem.maharaFormData.tags)
      }

      if (props.editItem.journalEntry) {
        setTitle(props.editItem.journalEntry.title)
        setDescription(props.editItem.journalEntry.body)
        setSelectedBlog(props.editItem.journalEntry.blogid)
        setTags(props.editItem.journalEntry.tags)
      }
    }
  }, [props.editItem]);

  const dispatch = useDispatch();
  const isMultiLine = props.formType !== 'journal entry' ? forms.multiLine : [forms.multiLine, styles.description];
  const placeholder = props.formType !== 'journal entry' ? 'Enter a description' : 'Enter detail';
  const checkUserBlogs = props.userBlogs ? props.userBlogs.length > 1 : null;
  const checkFile = props.pickedFile ? props.pickedFile.size > 0 : null;
  const type = props.formType;

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
    if (props.formType === 'journal entry') {
      const firstBlog = props.userBlogs ? props.userBlogs[0].id : 0;
      const journalEntry: JournalEntry = {
        blogid: selectedBlog ? selectedBlog : firstBlog,
        wsfunction: 'module_mobileapi_upload_blog_post',
        wstoken: props.token,
        title: title,
        body: description,
        isdraft: false,
        tags: selectedTags
      };

      const pendingJournalEntry: PendingJournalEntry = {
        id: props.editItem ? props.editItem.id : Math.random() * 10 + journalEntry.title,
        journalEntry: journalEntry,
        url: journalUrl
      };

      // add journal entry to pending list
      dispatch(addJournalEntryToUploadList(pendingJournalEntry));

    } else if (pickedFile) {
      // Upload File
      const tagString = selectedTags ? setTagString(selectedTags) : '';
      const fileUrl = props.url + '/webservice/rest/server.php?alt=json' + tagString;
      const extension = pickedFile.name.match(/\.[0-9a-z]+$/i);
      const filename = title ? title + extension : pickedFile.name;
      const firstFolder = props.userFolders ? props.userFolders[0].title : '';
      const folder = selectedFolder || firstFolder; // TODO: setting to first folder until we set up preferred default folder functionality
      const webservice = 'module_mobileapi_upload_file';

      const fileData: MaharaFile = {
        uri: pickedFile.uri,
        type: pickedFile.type,
        name: pickedFile.name,
        size: pickedFile.size
      };

      const maharaFormData: MaharaFileFormData = {
        description: description,
        filetoupload: fileData,
        foldername: folder,
        title: filename,
        webservice: webservice,
        wstoken: props.token,
        tags: selectedTags
      }

      const pendingFileData: MaharaPendingFile = {
        id: props.editItem ? props.editItem.id : Math.random() * 10 + '' + fileData.type,
        maharaFormData: maharaFormData,
        mimetype: pickedFile.type,
        url: fileUrl
      }

      dispatch(addFileToUploadList(pendingFileData));
    }

    // upon successful upload, remove the AddFile screen from the navigation stack
    props.navigation.dispatch(StackActions.popToTop());
    // then take user to PendingScreen
    props.navigation.navigate({routeName: 'Pending', params: { fileType: type }});
  };

  return (
    <View>
      <TextInput
        style={forms.textInput}
        placeholder="Enter a title"
        value={title}
        onChangeText={(title) => { setTitle(title) }}
      />
      <TextInput
        style={isMultiLine}
        placeholder={placeholder}
        value={description}
        onChangeText={(description) => { setDescription(description) }}
      />
      {props.formType !== 'journal entry' ?
        <View style={forms.pickerWrapper}>
          {/* Folder dropdown */}
          <Picker
            selectedValue={selectedFolder}
            style={forms.picker}
            onValueChange={folder => {setSelectedFolder(folder)}}
          >
            {props.userFolders && props.userFolders.map((folder: UserFolder, index: number) => (
              <Picker.Item label={folder.title} value={folder.title} key={index} />
            ))}
          </Picker>
        </View>
        : null}
      {(props.formType === 'journal entry' && checkUserBlogs) ?
        <View>
          <Text style={styles.formTitle}>Blog:</Text>
          <View style={forms.pickerWrapper}>
            <Picker
              selectedValue={selectedBlog}
              style={forms.picker}
              onValueChange={blogId => { setSelectedBlog(blogId)}}
            >
              {props.userBlogs && props.userBlogs.map((blog: UserBlog, index: number) => (
                <Picker.Item label={blog.title} value={blog.id} key={index} />
              ))}
            </Picker>
          </View>
        </View>
        : null}
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Tags:</Text>
        {hidden ?
          <View style={styles.tagsInputContainer}>
            <TextInput
              style={[forms.textInput, styles.tagsTextInput]}
              placeholder="New tag..."
              onChangeText={text => addNewTag(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => {
              addTag(newTag);
              setSelectedTag('...');
            }}>
              <Text style={styles.addButtonText}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
          : null}
        {selectedTags && selectedTags.map((value: string, index: number) => (
          <TouchableOpacity key={index} onPress={() => removeTag(value)}>
            <View style={forms.tag}>
              <Text style={forms.tagText}>{value}</Text>
              <Text style={forms.tagClose}>x</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* Dropdown for Tags */}
      <View style={forms.pickerWrapper}>
        <Picker
          selectedValue={selectedTag}
          style={forms.picker}
          onValueChange={(itemValue) => {
            setSelectedTag(itemValue);
            addTag(itemValue);
          }}
        >
          <Picker.Item label="..." value="" color="#556d32" />
          {props.userTags && props.userTags.map((value: UserTag, index: number) => (
            <Picker.Item label={value.tag} value={value.tag} key={index} />
          ))}
          <Picker.Item label="Add new tag +" value="Add new tag +" color={"#556d32"} />
        </Picker>
      </View>
      {checkFile || title && description ?
        <TouchableOpacity onPress={() => handleForm() }>
          { props.editItem && <Text style={buttons.lg}>Confirm edits to {type}</Text> }
          { !props.editItem && <Text style={buttons.lg}>Add {type} to Pending</Text> }
        </TouchableOpacity>
      : null}
    </View>
  );
};

export default UploadForm;
