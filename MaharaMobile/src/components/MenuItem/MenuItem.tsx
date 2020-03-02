import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import menuItemStyles from './MenuItem.style';

const MenuItem = props => {
  return (
    <TouchableHighlight onPress={props.path} underlayColor="#3E5027">
      <View style={menuItemStyles.listItem}>
        <Text style={menuItemStyles.listItemText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuItem;
