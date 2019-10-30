import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, Image, TextInput, Button, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import styles from './AddScreen.style.ts';
import { forms } from '../../assets/styles/forms.ts';
import { buttons } from '../../assets/styles/buttons.ts';

type Props = {
  userfolders: Array<any>,
  usertags: any,
  username: string,
  token: string
};

type State = {
  pickedFile: string,
  uploadFileString: string,
  pickedFolder: string,
  description: string,
  title: string,
  userTagsArray: Array<any>,
  selectedTags: Array<any>,
  newTag: string,
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
      userTagsArray: this.props.userTags,
      selectedTags: [],
      newTag: '',
      showTagInput: false
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
          pickedFile: res,
          uploadFileString: 'Pick a different file'
        });
      }
    );
  }

  addTags = (value) => {

    if (value == 'Add new tag +') {
      this.setState({ showTagInput: true });
    } else if (value && !this.state.selectedTags.includes(value)) {
      this.setState(prevState => ({ selectedTags: [...this.state.selectedTags, value] }));
    }
  }

  removeTags = (tag) => {
    const selectedTags = this.state.selectedTags;
    const newTagArray = selectedTags.filter(item => item != tag);

    this.setState({ selectedTags: newTagArray });
  }

  addNewTag = () => {
    this.setState({ showTagInput: false });

    if(!this.state.newTag) {
      return
    }
    const newTag = this.state.newTag;
    this.addTags(newTag);
  }

  setTags = () => {
    const tagsarray = [];

    this.state.selectedTags.map(function(tag, index) {
      tagsarray.push(tag + '&tags[' + (index + 1) + ']=');
    });

    const tagsString = tagsarray.join('');
    const string = '&tags[0]=' + tagsString;

    return string;
  }

  handleForm = () => {
    this.uploadDocument();
  }

  uploadDocument = async () => {
    const tags = this.state.selectedTags;
    const tagString = tags ? this.setTags() : '';
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

          <TextInput
            style={forms.textInput}
            placeholder={'Enter a title'}
            onChangeText={(text) => this.setState({title: text})}
          />

          <TextInput
            style={forms.multiLine}
            placeholder={'Enter a description'}
            onChangeText={(text) => this.setState({description: text})}
          />

          <View style={forms.pickerWrapper}>
            <Picker style={forms.picker} onValueChange={(itemValue) => this.setState({pickedFolder: itemValue})}>
              {this.props.userFolders && this.props.userFolders.map((value, index) => (
                <Picker.Item label={value.title} value={value.title} key={index} />
              ))}
            </Picker>
          </View>

          <View>
            <View style={styles.tagsContainer}>
              <Text style={{marginRight: 10}}>Tags:</Text>
              {this.state.showTagInput ?
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
              {this.state.selectedTags.map((value, index) => (
                <TouchableOpacity key={index} onPress={() => this.removeTags(value)}>
                  <Text style={forms.tag}>{value}
                </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={forms.pickerWrapper}>
            <Picker style={forms.picker} onValueChange={(itemValue) => {this.addTags(itemValue)}}>
              {this.state.userTagsArray && this.state.userTagsArray.map((value, index) => (
                <Picker.Item label={value.tag} value={value.tag} key={index} />
              ))}
              <Picker.Item label='Add new tag +' value='Add new tag +' color={'#556d32'} />
            </Picker>
          </View>

          {this.state.pickedFile ?
            <TouchableOpacity onPress={this.handleForm}>
              <Text style={buttons.large}>Upload file</Text>
            </TouchableOpacity>
          : null}
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
