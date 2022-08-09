import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import menuItemStyles from './MenuItem.style';

type MenuItemProps = {
  title: string;
  path: () => void;
  style: any;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <TouchableHighlight
      onPress={props.path}
      underlayColor="#3E5027"
      style={props.style}>
      <Text style={menuItemStyles.listItemText}>{props.title}</Text>
    </TouchableHighlight>
  );
};

export default MenuItem;
