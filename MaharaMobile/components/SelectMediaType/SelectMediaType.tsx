import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { buttons } from '../../assets/styles/buttons';
import styles from './SelectMediaType.style';

type Props = {
  selectAddType: Function;
  formType: string;
  filePickerButtonText: string;
}

export default class SelectMediaType extends Component<Props> {
  render() {
    return (
      <View>
        {!this.props.formType || this.props.formType === 'file' ?
          <TouchableOpacity onPress={() => this.props.selectAddType('file')}>
            <Text style={[buttons.md, styles.button]}>{this.props.filePickerButtonText}</Text>
          </TouchableOpacity>
        : null}
        {!this.props.formType ?
          <View>
            <TouchableOpacity onPress={() => this.props.selectAddType('photo')}>
              <Text style={[buttons.md, styles.button]}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.selectAddType('journal')}>
              <Text style={[buttons.md, styles.button]}>Add a journal entry</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.selectAddType('audio')}>
              <Text style={[buttons.md, styles.button]}>Record audio</Text>
            </TouchableOpacity>
          </View>
        : null}
      </View>
    )
  }
}
