// import {MessageDescriptor} from '@lingui/core';
// // import {I18n} from '@lingui/react';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import menuItemStyles from './MenuItem.style';

type MenuItemProps = {
  // title: MessageDescriptor;
  title: any;
  path: () => void;
  style: any;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <TouchableHighlight
      onPress={props.path}
      underlayColor="#3E5027"
      style={props.style}>
      {/* <I18n>
        {({i18n}) => (
          <Text style={menuItemStyles.listItemText}>{i18n._(props.title)}</Text>
        )}
      </I18n> */}
      <Text style={menuItemStyles.listItemText}>{props.title}</Text>
    </TouchableHighlight>
  );
};

export default MenuItem;
