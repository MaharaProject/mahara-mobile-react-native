import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Picker} from 'react-native';
import { connect } from 'react-redux';
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';

class UploadFileScreen extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    console.log(this.props);

    this.state = {
      pickedFile: ''
    }
  }

  static navigationOptions = {
    title: 'Upload a file',
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
          pickedFile: res
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
    formData.append('foldername', 'Mobile uploads');
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
    const {userfolders} = this.props;

    return (
      <View style={{padding: 10}}>
        <Text>Upload a file</Text>

        <Picker style={{height: 100, width: 100, color: 'black'}}>
          {userfolders.map((value, index) => (
            <Picker.Item label={value.title} value={value.title} key={index} />
          ))}
        </Picker>
        <Button
          title="Pick a file"
          color="#444444"
          onPress={this.pickDocument}
        />
      {this.state.pickedFile ? <Image source={{uri: this.state.pickedFile.uri}} style={{width: 100, height: 100}} />
      : null}
      {this.state.pickedFile ? <Button title="Upload file" color="#000000" onPress={this.uploadDocument} /> : null}
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

export default connect(mapStateToProps)(UploadFileScreen);
