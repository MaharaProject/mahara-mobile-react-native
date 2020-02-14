import React from 'react';
import { View } from 'react-native';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import LogoSvg from '../../../assets/images/Logo';

type Props = {
  navData: any;
};

const HeaderMenuButton = (props: Props) => (
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
