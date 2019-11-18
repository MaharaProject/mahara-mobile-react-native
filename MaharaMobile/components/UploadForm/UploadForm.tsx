import React, { Component, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import styles from './UploadForm.style';
import { forms } from '../../assets/styles/forms';
import { buttons } from '../../assets/styles/buttons';
import { UserFolder, MaharaFile, UserTag, UserBlog, MaharaPendingFile } from '../../models/models';

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

export const UploadForm = (props: any) => {
  const [newTag, setNewTag] = useState('');

  const multiLine = props.formType !== 'journal' ? forms.multiLine : [forms.multiLine, styles.description];
  const placeholder = props.formType !== 'journal' ? 'Enter a description' : 'Enter detail';

  return (
    <View>
      <TextInput
        style={forms.textInput}
        placeholder={'Enter a title'}
        onChangeText={(text) => { props.setFormValue('title', text) }}
      />
      <TextInput
        style={multiLine}
        placeholder={placeholder}
        onChangeText={(text) => { props.setFormValue('description', text) }}
      />
      {props.formType !== 'journal' ?
        <View style={forms.pickerWrapper}>
          <Picker style={forms.picker} onValueChange={(itemValue) => { props.setFormValue('pickedFolder', itemValue) }}>
            {props.userFolders && props.userFolders.map((folder: UserFolder, index: number) => (
              <Picker.Item label={folder.title} value={folder.title} key={index} />
            ))}
          </Picker>
        </View>
        : null}
      {(props.formType === 'journal' && props.userBlogs.length > 1) ?
        <View>
          <Text style={styles.formTitle}>Blog:</Text>
          <View style={forms.pickerWrapper}>
            <Picker style={forms.picker} onValueChange={(itemValue) => { props.setFormValue('pickedBlog', itemValue) }}>
              {props.userBlogs && props.userBlogs.map((blog: UserBlog, index: number) => (
                <Picker.Item label={blog.title} value={blog.id} key={index} />
              ))}
            </Picker>
          </View>
        </View>
        : null}
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Tags:</Text>
        {props.showTagInput ?
          <View style={styles.tagsInputContainer}>
            <TextInput
              style={[forms.textInput, styles.tagsTextInput]}
              placeholder={'New tag...'}
              onChangeText={(text) => setNewTag(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => props.addTag(newTag)}>
              <Text style={styles.addButtonText}>
                Add
                </Text>
            </TouchableOpacity>
          </View>
          : null}
        {props.selectedTags && props.selectedTags.map((value: string, index: number) => (
          <TouchableOpacity key={index} onPress={() => props.removeTag(value)}>
            <View style={forms.tag}>
              <Text style={forms.tagText}>{value}</Text>
              <Text style={forms.tagClose}>x</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={forms.pickerWrapper}>
        <Picker style={forms.picker} onValueChange={(itemValue) => { props.addTag(itemValue) }}>
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