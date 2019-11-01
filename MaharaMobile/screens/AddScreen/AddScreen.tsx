import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import UploadForm from '../../components/UploadForm/UploadForm';
import styles from './AddScreen.style';
import { buttons } from '../../assets/styles/buttons';
import { file, userFolders } from '../../models/models';

type Props = {
  userFolders: Array<userFolders>;
  userTags: object;
  userName: string;
  token: string;
  dispatch: () => void;
};

type State = {
  pickedFile: file;
  uploadButtonText: string;
  pickedFolder: string;
  description: string;
  title: string;
  selectedTags: Array<string>;
  showTagInput: boolean;
};

export class AddScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pickedFile: {uri: '', name: '', type: '', size: 0},
      uploadButtonText: 'Pick a file',
      pickedFolder: '',
      description: '',
      title: '',
      selectedTags: [],
      showTagInput: false
    }
  }

  static navigationOptions = {
    title: 'Upload to Mahara',
  };

  pickDocument = async () => {
    // iPhone/Android
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
      },
      (error, res) => {
        //error
        console.log(error);

        const pickedFile: file = {
          name: res.fileName,
          uri: res.uri,
          type: res.type,
          size: Number(res.fileSize)
        };

        // Android
        this.setState({
          pickedFile: pickedFile,
          uploadButtonText: 'Pick a different file'
        });
      }
    );
  }

  addTag = (tag: string) => {
    if (tag == 'Add new tag +') {
      this.setState({ showTagInput: true });
    } else if (tag && !this.state.selectedTags.includes(tag)) {
      const selectedTags = [...this.state.selectedTags, tag];
      this.setState({ selectedTags, showTagInput: false });
    }
  }

  removeTag = (tag: string) => {
    const selectedTags = this.state.selectedTags.filter(item => item != tag);
    this.setState({ selectedTags });
  }

  setTagString = (tags: Array<string>) => {
    const tagsArray: Array<string> = [];

    tags.map(function(tag, index) {
      tagsArray.push(tag + '&tags[' + (index + 1) + ']=');
    });

    const tagsString = tagsArray.join('');
    const string = '&tags[0]=' + tagsString;

    return string;
  }

  setFormValue = (type: string, value: string) => {
    // set title etc from value from form component
    this.setState({
      [type]: value
    });
  }

  handleForm = async () => {
    const { selectedTags, pickedFile, pickedFolder, title, description } = this.state;
    const { userFolders, token } = this.props;
    const tagString = selectedTags ? this.setTagString(selectedTags) : '';
    const firstFolder = userFolders[0].title;
    const folder = pickedFolder ? pickedFolder : firstFolder; //setting to first folder until we set up default folder functionality
    const webservice = 'module_mobileapi_upload_file';
    const url = 'https://master.dev.mahara.org/webservice/rest/server.php?alt=json' + tagString;
    console.log(pickedFile);
    const extension = pickedFile.name.match(/\.[0-9a-z]+$/i);
    const filename = title ? title + extension : pickedFile.name;
    const fileData = {
      uri: pickedFile.uri,
      type: pickedFile.type,
      name: pickedFile.name,
      size: pickedFile.size
    };

    const formData = new FormData();

    formData.append('wsfunction', webservice);
    formData.append('wstoken', token);
    formData.append('foldername', folder);
    formData.append('title', filename);
    formData.append('description', description);
    formData.append('filetoupload', fileData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('Success:', JSON.stringify(result));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.view}>
          {this.state.pickedFile.name ?
            <View style={styles.imageWrap}>
              <Image source={{uri: this.state.pickedFile.uri}} style={styles.image} />
            </View>
          : null}
          <TouchableOpacity onPress={this.pickDocument}>
            <Text style={[buttons.md, styles.button]}>{this.state.uploadButtonText}</Text>
          </TouchableOpacity>
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
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.app.token,
    userTags: state.app.userTags,
    userFolders: state.app.userFolders
  }
}

export default connect(mapStateToProps)(AddScreen);
