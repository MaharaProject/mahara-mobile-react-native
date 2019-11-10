import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { buttons } from '../../assets/styles/buttons';
import styles from './SelectAddType.style';

type Props = {
  selectAddType: Function;
}

type State = {
  uploadButtonText: string;
  addType: string;
}

export default class SelectAddTypes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploadButtonText: 'Pick a file',
      addType: ''
    }
  }

  selectAddType = (type: string) => {
    this.props.selectAddType(type);

    if(type === 'file') {
      this.setState({
        uploadButtonText: 'Pick a different file'
      })
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.selectAddType('file')}>
          <Text style={[buttons.md, styles.button]}>{this.state.uploadButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.selectAddType('photo')}>
          <Text style={[buttons.md, styles.button]}>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.selectAddType('journal')}>
          <Text style={[buttons.md, styles.button]}>Add a journal entry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.selectAddType('record')}>
          <Text style={[buttons.md, styles.button]}>Record audio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.selectAddType('record')}>
          <Text style={buttons.sm}>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
