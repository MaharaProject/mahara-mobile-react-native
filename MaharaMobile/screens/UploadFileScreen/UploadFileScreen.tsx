import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, Image, TextInput, Button} from 'react-native';
import { connect } from 'react-redux';
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';
import styles from './UploadFileScreen.style.ts';
import { forms } from '../../assets/styles/forms.ts';
import { buttons } from '../../assets/styles/buttons.ts';

export class UploadFileScreen extends Component {
  constructor(props) {
    super(props);

    const { userfolders, usertags, navigation } = this.props;

    this.state = {
      pickedFile: '',
      uploadFileString: 'Pick a file',
      pickedFolder: userfolders[0].title //setting to first folder until we set up default folder functionality
    }
  }

  static navigationOptions = {
    title: 'Upload a file',
  };

  pickDocument = async () => {
    console.log(this.state.pickedFolder);

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

  setTags = (tags) => {
    const keys = Object.keys(tags);
    const tagsarray = [];
    keys.map(function(key, index) {
      tagsarray.push(tags[key] + '&tags[' + (index + 1) + ']=');
    });
    const tagsString = tagsarray.join('');
    const string = '&tags[0]=' + tagsString;

    return string;
  }

  handleForm = () => {
    this.uploadDocument();
  }

  uploadDocument = async () => {

    const tags = {
      'tagkey': 'newktag',
      'tagkey2' : 'loot',
      'tagk' : 'another'
    };

    const tagString = this.setTags(tags);

    const webservice = 'module_mobileapi_upload_file';
    const url = 'https://master.dev.mahara.org/webservice/rest/server.php?alt=json' + tagString;

    const token = this.props.token;
    const file = this.state.pickedFile;
    const extension = file.fileName.match(/\.[0-9a-z]+$/i)[0];

    const formData = new FormData();
    formData.append('wsfunction', webservice);
    formData.append('wstoken', token);
    formData.append('foldername', this.state.pickedFolder);
    formData.append('title', 'blah3' + extension);
    formData.append('filetoupload', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    formData.append('description', 'blah blah blah');


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
      <View style={styles.view}>
        {this.state.pickedFile ? <Image source={{uri: this.state.pickedFile.uri}} style={styles.image} />
        : null}
        <View style={forms.pickerWrapper}>
          <Picker style={forms.picker} onValueChange={(itemValue) => {this.setState({pickedFolder: itemValue})}}>
            {this.props.userfolders.map((value, index) => (
              <Picker.Item label={value.title} value={value.title} key={index} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={forms.multiLine}
          value={'Enter a description'}
        />
        <TouchableOpacity onPress={this.pickDocument}>
          <Text style={[buttons.md, styles.button]}>{this.state.uploadFileString}</Text>
        </TouchableOpacity>
      {this.state.pickedFile ?
        <TouchableOpacity onPress={this.handleForm}>
          <Text style={buttons.large}>Upload file</Text>
        </TouchableOpacity>
      : null}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.app.token,
    username: state.app.username,
    usertags: state.app.usertags,
    userfolders: state.app.userfolders
  }
}

UploadFileScreen.defaultProps = {
  userfolders: [],
  usertags: {}
};

export default connect(mapStateToProps)(UploadFileScreen);
