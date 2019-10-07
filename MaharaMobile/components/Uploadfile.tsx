import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';

export default class Uploadfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickedFile: '',
      token: this.props.token
    }
  }

  pickDocument = async () => {

    // iPhone/Android
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.images()],
      },
      (error, res) => {

        // Android
        this.setState({
          pickedFile: res
        });

        // console.log(
        //   res.uri,
        //   res.type, // mime type
        //   res.fileName,
        //   res.fileSize
        // );
      }
    );
  }

  uploadDocument = async () => {
    const webservice = 'module_mobileapi_upload_file';
    const url = 'https://master.dev.mahara.org/webservice/rest/server.php?alt=json';
    const token = this.props.token;
    const image = this.state.pickedFile.uri;

    const formData = new FormData();
    formData.append('wsfunction', webservice);
    formData.append('wstoken', token);
    formData.append('foldername', 'Mobile uploads');
    formData.append('title', 'blah');
    formData.append('filetoupload', image);

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
      <View style={{padding: 10}}>
        <Text>Upload a file</Text>
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
