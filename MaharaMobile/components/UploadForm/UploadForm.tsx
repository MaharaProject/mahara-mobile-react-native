import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Picker } from 'react-native';
import styles from './UploadForm.style.ts';
import { forms } from '../../assets/styles/forms.ts';
import { buttons } from '../../assets/styles/buttons.ts';

type Props = {
  pickedFile: object,
  handleForm: Function,
  setFormValue: Function,
  addTag: Function,
  removeTag: Function,
  userFolders: array,
  userTags: array,
  selectedTags: array,
  showTagInput: boolean
}

type State = {
  newTag: string
}

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTag: ''
    }
  }

  setFormValue = (type: string, value: string) => {
    this.props.setFormValue(type, value);
  }

  render() {

    return (
      <View>
        <TextInput
          style={forms.textInput}
          placeholder={'Enter a title'}
          onChangeText={(text) => {this.setFormValue('title', text)}}
        />
        <TextInput
          style={forms.multiLine}
          placeholder={'Enter a description'}
          onChangeText={(text) => {this.setFormValue('description', text)}}
        />
        <View style={forms.pickerWrapper}>
          <Picker style={forms.picker} onValueChange={(itemValue) => {this.props.setFormValue('pickedFolder', itemValue)}}>
            {this.props.userFolders && this.props.userFolders.map((folder, index) => (
              <Picker.Item label={folder.title} value={folder.title} key={index} />
            ))}
          </Picker>
        </View>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Tags:</Text>
          {this.props.showTagInput ?
            <View style={styles.tagsInputContainer}>
              <TextInput
              style={[forms.textInput, styles.tagsTextInput]}
              placeholder={'New tag...'}
              onChangeText={(text) => this.setState({newTag: text})}
              />
              <TouchableOpacity style={styles.addButton} onPress={() => this.props.addTag(this.state.newTag) }>
                <Text style={styles.addButtonText}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          : null}
          {this.props.selectedTags && this.props.selectedTags.map((value, index) => (
            <TouchableOpacity key={index} onPress={() => this.props.removeTag(value)}>
              <View style={forms.tag}>
                <Text style={forms.tagText}>{value}</Text>
                <Text style={forms.tagClose}>x</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={forms.pickerWrapper}>
          <Picker style={forms.picker} onValueChange={(itemValue) => {this.props.addTag(itemValue)}}>
            {this.props.userTags && this.props.userTags.map((value, index) => (
              <Picker.Item label={value.tag} value={value.tag} key={index} />
            ))}
            <Picker.Item label='Add new tag +' value='Add new tag +' color={'#556d32'} />
          </Picker>
        </View>
        {this.props.pickedFile ?
          <TouchableOpacity onPress={this.props.handleForm}>
            <Text style={buttons.large}>Upload file</Text>
          </TouchableOpacity>
        : null}
      </View>
    )
  }
}
