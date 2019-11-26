import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import styles from './UploadForm.style';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';
import { UserFolder, MaharaFile, UserTag, UserBlog } from '../../models/models';

type Props = {
  pickedFile: MaharaFile;
  handleForm: Function;
  setFormValue: any;
  addTag: Function;
  removeTag: Function;
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
  selectedTags: Array<string>;
  showTagInput: boolean;
  formType: string;
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
    const multiLine = this.props.formType !== 'journal' ? forms.multiLine : [forms.multiLine,styles.description];
    const placeholder = this.props.formType !== 'journal' ? 'Enter a description' : 'Enter detail';

    return (
      <View>
        <TextInput
          style={forms.textInput}
          placeholder={'Enter a title'}
          onChangeText={(text) => {this.props.setFormValue('title', text)}}
        />
        <TextInput
          style={multiLine}
          placeholder={placeholder}
          onChangeText={(text) => {this.props.setFormValue('description', text)}}
        />
        {this.props.formType !== 'journal' ?
          <View style={forms.pickerWrapper}>
            <Picker style={forms.picker} onValueChange={(itemValue) => {this.props.setFormValue('pickedFolder', itemValue)}}>
              {this.props.userFolders && this.props.userFolders.map((folder: UserFolder, index: number) => (
                <Picker.Item label={folder.title} value={folder.title} key={index} />
              ))}
            </Picker>
          </View>
        : null}

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Tags:</Text>
        {props.showTagInput ?
          <View style={styles.tagsInputContainer}>
            <TextInput
              style={[forms.textInput, styles.tagsTextInput]}
              placeholder={'New tag...'}
              onChangeText={(text) => setNewTag(text)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => props.addTag(newTag)}
            >
              <Text style={styles.addButtonText}>
                Add
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={forms.pickerWrapper}>
        <Picker
          style={forms.picker}
          onValueChange={(itemValue) => {
            props.addTag(itemValue)
            console.log('added tag?')
          }}
        >
          <Picker.Item label='...' value='' color={'#556d32'} />
          {props.userTags && props.userTags.map((value: UserTag, index: number) => (
            <Picker.Item label={value.tag} value={value.tag} key={index} />
          ))}
          <Picker.Item label='Add new tag +' value='Add new tag +' color={'#556d32'} />

        </Picker>
      </View>
      {props.pickedFile ?
        <TouchableOpacity onPress={() => { props.handleForm() }}>
          <Text style={buttons.lg}>Add file to Pending</Text>
        </TouchableOpacity>
        : null}
      </View>
    )
  }
}