import {MessageDescriptor} from '@lingui/core';
import {I18n} from '@lingui/react';
import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import menuItemStyles from './MenuItem.style';

type MenuItemProps = {
  title: MessageDescriptor;
  path: () => void;
  style: any;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <TouchableHighlight
      onPress={props.path}
      underlayColor="#3E5027"
      style={props.style}>
      <I18n>
        {({i18n}) => (
          <Text style={menuItemStyles.listItemText}>{i18n._(props.title)}</Text>
        )}
      </I18n>
    </TouchableHighlight>
  );
};

export default MenuItem;
