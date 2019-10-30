import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Picker } from 'react-native';
import styles from './Form.style.ts';
import { forms } from '../../assets/styles/forms.ts';
import { buttons } from '../../assets/styles/buttons.ts';

type Props = {
  pickedFile: object,
  handleForm: Function,
  setFormValue: Function,
  addTags: Function,
  removeTags: Function,
  addNewTag: Function,
  userFolders: array,
  userTags: array,
  selectedTags: array,
  showTagInput: boolean
}

type State = {
  newTag: string
}

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTag: ''
    }
  }

  setFormValue = (type: string, value: string) => {
    this.props.setFormValue(type, value);
  }

  addNewTag = () => {
    this.props.addNewTag(this.state.newTag);
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
            {this.props.userFolders && this.props.userFolders.map((value, index) => (
              <Picker.Item label={value.title} value={value.title} key={index} />
            ))}
          </Picker>
        </View>
        <View>
          <View style={styles.tagsContainer}>
            <Text style={{marginRight: 10}}>Tags:</Text>
            {this.props.showTagInput ?
              <View style={{alignSelf: 'center', alignItems: 'center', flexDirection: 'row', padding: 0, margin: 0}}>
                <TextInput
                style={[forms.textInput, styles.tagsTextInput]}
                placeholder={'New tag...'}
                onChangeText={(text) => this.setState({newTag: text})}
                />
                <TouchableOpacity style={styles.addButton} onPress={this.addNewTag}>
                  <Text style={styles.addButtonText}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            : null}
            {this.props.selectedTags && this.props.selectedTags.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => this.props.removeTags(value)}>
                <Text style={forms.tag}>{value}
              </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={forms.pickerWrapper}>
          <Picker style={forms.picker} onValueChange={(itemValue) => {this.props.addTags(itemValue)}}>
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
