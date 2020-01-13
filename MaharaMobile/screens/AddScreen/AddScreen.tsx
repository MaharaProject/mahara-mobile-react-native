import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import generic from '../../assets/styles/generic';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';

type Props = {
  navigation: any;
}

const AddScreen = (props: Props) => {
  const selectMediaType = (type: string) => {
    props.navigation.navigate({routeName: 'AddFile', params: { formType: type }});
  };

  return (
    <ScrollView>
      <View style={generic.wrap}>
        <SelectMediaType selectMediaType={selectMediaType} />
      </View>
    </ScrollView>
  );
}

AddScreen.navigationOptions = {
  headerTitle: 'Add items'
};

export default AddScreen;
