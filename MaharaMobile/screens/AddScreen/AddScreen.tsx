import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, Alert } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';

import { uploadJournalToMahara, updateUploadList, addFileToUploadList, addJournalEntryToUploadList } from '../../actions/actions';
import Header from '../../components/Header/Header';
import { UploadForm } from '../../components/UploadForm/UploadForm';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';
import styles from './AddScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { MaharaFile, JournalEntry, UserTag, UserFolder, UserBlog, MaharaStore, MaharaPendingFile, MaharaFileFormData, PendingJournalEntry } from '../../models/models';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
  userName: string;
  token: string;
  dispatch: any;
  navigation: any;
  uploadList: {
    files: Array<MaharaPendingFile>,
    journalEntries: Array<PendingJournalEntry>
  }
};

type State = {
  title: string;
  description: string;
  pickedFile: MaharaFile;
  pickedFolder: string;
  pickedBlog: number;
  selectedTags: Array<string>;
  showTagInput: boolean;
  formType: string;
  webservice: string;
  filePickerButtonText: string;
  mediaTypeHeader: string;
};

const initialState = {
  title: '',
  description: '',
  pickedFile: { uri: '', name: '', type: '', size: 0 },
  pickedFolder: '',
  pickedBlog: 0,
  selectedTags: [],
  showTagInput: false,
  formType: '',
  webservice: 'module_mobileapi_upload_file',
  filePickerButtonText: 'Pick a file',
  mediaTypeHeader: ''
};

export class AddScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  static navigationOptions = {
    header: null
  };

  selectAddType = (type: string) => {
    this.setState({
      formType: type
    });

    switch (type) {
      case 'file':
        this.setState({
          filePickerButtonText: 'Pick a different file',
          mediaTypeHeader: 'Upload a file'
        });
        this.pickDocument();
        break;
      case 'journal':
        this.setState({
          webservice: 'module_mobileapi_upload_blog_post',
          mediaTypeHeader: 'Add a journal entry'
        });
        break;
      case 'photo':
        this.setState({
          mediaTypeHeader: 'Upload your photo'
        });
        break;
      case 'audio':
        this.setState({
          mediaTypeHeader: 'Upload your recording'
        });
        break;
    }
  };

  resetForm = () => {
    this.setState(initialState);
  };

  addTag = (tag: string) => {
    if (tag === 'Add new tag +') {
      this.setState({ showTagInput: true });
    } else if (tag && !this.state.selectedTags.includes(tag)) {
      const selectedTags = [...this.state.selectedTags, tag];
      this.setState({ selectedTags, showTagInput: false });
    }
  };

  removeTag = (tag: string) => {
    const selectedTags = this.state.selectedTags.filter((item) => item != tag);
    this.setState({ selectedTags });
  };

  setTagString = (tags: Array<string>) => {
    const tagsArray: Array<string> = [];

    tags.map(function (tag, index) {
      tagsArray.push(tag + '&tags[' + (index + 1) + ']=');
    });

    const tagsString = tagsArray.join('');
    const string = '&tags[0]=' + tagsString;

    return string;
  };

  pickDocument = async () => {
    // iPhone/Android
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        //error
        console.log('consolelog error:', error);

        // No file picked
        if (!res) {
          Alert.alert('Invalid file', 'Please pick a file', [{ text: 'Okay', style: 'destructive' }]);
          return;
        }

        const pickedFile: MaharaFile = {
          name: res.fileName,
          uri: res.uri,
          type: res.type,
          size: Number(res.fileSize)
        };

        // Android
        this.setState({
          pickedFile: pickedFile
        });
      }
    );
  };

  setFormValue = (fieldName: string, value: string) => {
    const stateObject = () => {
      let returnObj: any = {};
      returnObj[fieldName] = value;
      return returnObj;
    };
    this.setState(stateObject);
  };

  // Add files to uploadList
  handleForm = () => {
    const { selectedTags, pickedFile, pickedFolder, title, description } = this.state;
    const { userFolders, token } = this.props;
    let url = 'https://master.dev.mahara.org/webservice/rest/server.php?alt=json';

    // Upload Journal Entry
    if (this.state.formType === 'journal') {
      const firstBlog = this.props.userBlogs[0].id;
      const journalEntry: JournalEntry = {
        blogid: this.state.pickedBlog ? this.state.pickedBlog : firstBlog,
        wsfunction: 'module_mobileapi_upload_blog_post',
        wstoken: token,
        title: title,
        body: description,
        isdraft: false,
        tags: selectedTags
      };

      const pendingJournalEntry: PendingJournalEntry = {
        id: Math.random() * 10 + journalEntry.title,
        journalEntry: journalEntry,
        url: url
      }

      // add journal entry to pending list 
      this.props.dispatch(addJournalEntryToUploadList(pendingJournalEntry));

    } else {
      // Upload File
      const tagString = selectedTags ? this.setTagString(selectedTags) : '';
      let url = 'https://master.dev.mahara.org/webservice/rest/server.php?alt=json' + tagString;
      const extension = pickedFile.name.match(/\.[0-9a-z]+$/i);
      const filename = title ? title + extension : pickedFile.name;
      const firstFolder = userFolders[0].title;
      const folder = pickedFolder ? pickedFolder : firstFolder; //setting to first folder until we set up default folder functionality
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
        wstoken: token
      }

      const pendingFileData: MaharaPendingFile = {
        id: Math.random() * 10 + '' + fileData.type,
        maharaFormData: maharaFormData,
        url: url
      }
      this.props.dispatch(addFileToUploadList(pendingFileData));
    }
  };

  render() {
    return (
      <ScrollView>
        <Header navigation={this.props.navigation} />
        <View style={styles.view}>
          {this.state.mediaTypeHeader ? (
            // TODO: temporary styling, add in header styles from diffent branch
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
              {this.state.mediaTypeHeader}
            </Text>
          ) : null}
          {this.state.pickedFile.name ? (
            <View style={styles.imageWrap}>
              <Image source={{ uri: this.state.pickedFile.uri }} style={styles.image} />
            </View>
          ) : null}
          <SelectMediaType
            selectAddType={this.selectAddType}
            formType={this.state.formType}
            filePickerButtonText={this.state.filePickerButtonText}
          />
          {this.state.formType ? (
            <View>
              <UploadForm
                pickedFile={this.state.pickedFile}
                handleForm={this.handleForm}
                setFormValue={this.setFormValue}
                addTag={this.addTag}
                removeTag={this.removeTag}
                userFolders={this.props.userFolders}
                userTags={this.props.userTags}
                selectedTags={this.state.selectedTags}
                showTagInput={this.state.showTagInput}
                userBlogs={this.props.userBlogs}
                formType={this.state.formType}
              />
              <TouchableOpacity onPress={() => this.resetForm()}>
                <Text style={buttons.sm}>Back</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: MaharaStore) => {
  return {
    token: state.app.token,
    userTags: state.app.userTags,
    userFolders: state.app.userFolders,
    userBlogs: state.app.userBlogs,
    uploadList: state.app.uploadList
  };
};

export default connect(mapStateToProps)(AddScreen);
