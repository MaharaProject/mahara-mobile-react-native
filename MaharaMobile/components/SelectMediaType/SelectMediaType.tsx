import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { buttons } from '../../assets/styles/buttons';
import styles from './SelectMediaType.style';

type Props = {
  selectMediaType: Function;
}

const SelectMediaType = (props: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.selectMediaType('file')}>
        <Text style={[buttons.md, styles.button]}>Pick a file</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.selectMediaType('photo')}>
        <Text style={[buttons.md, styles.button]}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.selectMediaType('journal entry')}>
        <Text style={[buttons.md, styles.button]}>Add a journal entry</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.selectMediaType('audio')}>
        <Text style={[buttons.md, styles.button]}>Record audio</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SelectMediaType;
