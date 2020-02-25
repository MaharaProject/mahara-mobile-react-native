import React from 'react';
import {View} from 'react-native';
import {
  HeaderButton,
  HeaderButtons,
  Item
} from 'react-navigation-header-buttons';
import LogoSvg from '../../../assets/images/Logo';

const HeaderMenuButton = () => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      ButtonElement={
        <View>
          <LogoSvg />
        </View>
      }
    />
  </HeaderButtons>
);

export default HeaderMenuButton;
