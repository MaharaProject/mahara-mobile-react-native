import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, Image, TextInput, Button, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import Form from '../../components/Form/Form';
import styles from './AddScreen.style.ts';
import { forms } from '../../assets/styles/forms.ts';
import { buttons } from '../../assets/styles/buttons.ts';

type Props = {
  userfolders: array,
  usertags: object,
  username: string,
  token: string
};

type State = {
  pickedFile: any, //needs to be replaced with type file 
  uploadFileString: string,
  pickedFolder: string,
  description: string,
  title: string,
  selectedTags: array,
  showTagInput: boolean
};

export class AddScreen extends Component {
  constructor(props) {
    super(props);

    const { userFolders, userTags, navigation } = this.props;

    this.state = {
      pickedFile: '',
      uploadFileString: 'Pick a file',
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

        // Android
        this.setState({
          pickedFile: res,
          uploadFileString: 'Pick a different file'
        });
      }
    );
  }

  addTags = (value: string) => {

    if (value == 'Add new tag +') {
      this.setState({ showTagInput: true });
    } else if (value && !this.state.selectedTags.includes(value)) {
      this.setState(prevState => ({ selectedTags: [...this.state.selectedTags, value] }));
    }
  }

  removeTags = (tag: string) => {
    const selectedTags = this.state.selectedTags;
    const newTagArray = selectedTags.filter(item => item != tag);

    this.setState({ selectedTags: newTagArray });
  }

  addNewTag = (value: string) => {

    this.setState({ showTagInput: false });

    if(!value) {
      return
    }
    const newTag = value;
    this.addTags(newTag);
  }

  setTags = (tags: array) => {
    const tagsarray = [];

    tags.map(function(tag, index) {
      tagsarray.push(tag + '&tags[' + (index + 1) + ']=');
    });

    const tagsString = tagsarray.join('');
    const string = '&tags[0]=' + tagsString;

    return string;
  }

  setFormValue = (type: string, value: string) => {
    // set title etc from value from form component

    this.setState({
      [type]: value
    });
  }

  handleForm = () => {

    // upload document temporarily here, needs to be moved to pending
    // this will then need to be replaced with dispatches
    this.uploadDocument();
  }

  uploadDocument = async () => {
    const tags = this.state.selectedTags;
    const tagString = tags ? this.setTags(tags) : '';
    const token = this.props.token;
    const first = this.props.userFolders[0].title;
    const folder = this.state.pickedFolder ? this.state.pickedFolder : first; //setting to first folder until we set up default folder functionality
    const webservice = 'module_mobileapi_upload_file';
    const url = 'https://master.dev.mahara.org/webservice/rest/server.php?alt=json' + tagString;
    const file = this.state.pickedFile;
    const extension = file.fileName.match(/\.[0-9a-z]+$/i)[0];
    const filename = this.state.title ? this.state.title + extension : file.fileName;

    const formData = new FormData();
    formData.append('wsfunction', webservice);
    formData.append('wstoken', token);
    formData.append('foldername', folder);
    formData.append('title', filename);
    formData.append('filetoupload', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    formData.append('description', this.state.description);

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
          {this.state.pickedFile ?
            <View style={styles.imageWrap}>
              <Image source={{uri: this.state.pickedFile.uri}} style={styles.image} />
            </View>
          : null}
          <TouchableOpacity onPress={this.pickDocument}>
            <Text style={[buttons.md, styles.button]}>{this.state.uploadFileString}</Text>
          </TouchableOpacity>

          <Form
            pickedFile={this.state.pickedFile}
            handleForm={this.handleForm}
            setFormValue={this.setFormValue}
            addTags={this.addTags}
            removeTags={this.removeTags}
            addNewTag={this.addNewTag}
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
    userName: state.app.userName,
    userTags: state.app.userTags,
    userFolders: state.app.userFolders
  }
}

export default connect(mapStateToProps)(AddScreen);
