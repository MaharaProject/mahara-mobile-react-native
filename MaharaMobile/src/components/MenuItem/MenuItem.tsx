import React from 'react';
import { Text } from 'native-base';
import { TouchableHighlight } from 'react-native';
import menuItemStyles from './MenuItem.style';

type MenuItemProps = {
  title: string;
  path: () => void;
  style: any;
};

function MenuItem(props: MenuItemProps) {
  return (
    <TouchableHighlight onPress={props.path} underlayColor="#3E5027" style={props.style}>
      <Text style={menuItemStyles.listItemText}>{props.title}</Text>
    </TouchableHighlight>
  );
}

export default MenuItem;
