import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default class Uploadfile extends Component {

  pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  render() {

    return (
      <View style={{padding: 10}}>
        <Text>Upload a file</Text>
        <Button
          title="Pick a file"
          color="#ffffff"
          onPress={this.pickDocument}
        />
      </View>
    )
  }
}
