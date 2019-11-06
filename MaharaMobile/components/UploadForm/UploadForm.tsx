import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import styles from './UploadForm.style';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';
import { UserFolders } from '../../models/models';

type Props = {
  pickedFile: object;
  handleForm: Function;
  setFormValue: any;
  addTag: Function;
  removeTag: Function;
  userFolders: Array<UserFolders>;
  userTags: Array<any>;
  selectedTags: Array<string>;
  showTagInput: boolean;
}

type State = {
  newTag: string
}

export default class UploadForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      newTag: ''
    }
  }

  render() {

    return (
      <View>
        <TextInput
          style={forms.textInput}
          placeholder={'Enter a title'}
          onChangeText={(text) => {this.props.setFormValue('title', text)}}
        />
        <TextInput
          style={forms.multiLine}
          placeholder={'Enter a description'}
          onChangeText={(text) => {this.props.setFormValue('description', text)}}
        />
        <View style={forms.pickerWrapper}>
          <Picker style={forms.picker} onValueChange={(itemValue) => {this.props.setFormValue('pickedFolder', itemValue)}}>
            {this.props.userFolders && this.props.userFolders.map((folder: any, index: number) => (
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
          {this.props.selectedTags && this.props.selectedTags.map((value: string, index: number) => (
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
            {this.props.userTags && this.props.userTags.map((value: any, index: number) => (
              <Picker.Item label={value.tag} value={value.tag} key={index} />
            ))}
            <Picker.Item label='Add new tag +' value='Add new tag +' color={'#556d32'} />
          </Picker>
        </View>
        {this.props.pickedFile ?
          <TouchableOpacity onPress={()=>{this.props.handleForm()}}>
            <Text style={buttons.large}>Upload file</Text>
          </TouchableOpacity>
        : null}
      </View>
    )
  }
}
