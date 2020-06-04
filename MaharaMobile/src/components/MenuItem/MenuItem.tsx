import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {I18n} from '@lingui/react';
import menuItemStyles from './MenuItem.style';

const MenuItem = props => {
  return (
    <TouchableHighlight onPress={props.path} underlayColor="#3E5027">
      <View style={menuItemStyles.listItem}>
        <I18n>
          {({i18n}) => (
            <Text style={menuItemStyles.listItemText}>
              {i18n._(props.title)}
            </Text>
          )}
        </I18n>
      </View>
    </TouchableHighlight>
  );
};

export default MenuItem;
