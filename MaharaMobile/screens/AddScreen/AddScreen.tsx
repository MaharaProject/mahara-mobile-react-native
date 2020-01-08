import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import generic from '../../assets/styles/generic';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';

type Props = {
  navigation: any;
}

export default class AddScreen extends Component<Props> {

  selectMediaType = (type: string) => {
    switch (type) {
      case 'file':
        this.props.navigation.navigate('AddFile');
        break;
      case 'journal':
        this.props.navigation.navigate('AddJournal');
        break;
      case 'audio':
        this.props.navigation.navigate('AddAudio');
      default:
        return;
    };
  };

  static navigationOptions = {
    headerTitle: 'Add items'
  };

  render() {
    return (
      <ScrollView>
        <View style={generic.wrap}>
          <SelectMediaType selectMediaType={this.selectMediaType} />
        </View>
      </ScrollView>
    );
  }
}
