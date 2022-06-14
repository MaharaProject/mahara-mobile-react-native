// import {MessageDescriptor} from '@lingui/core';
import { t } from '@lingui/macro';
// import {withI18n} from '@lingui/react';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import MenuItem from '../../components/MenuItem/MenuItem';
import menuItemStyles from '../../components/MenuItem/MenuItem.style';
import { signOutAsync } from '../../utils/authHelperFunctions';
import menuScreenStyles from './MenuScreen.style';

type MenuItemObject = {
  // name: MessageDescriptor;
  name: any;
  path: () => void;
};

type Props = {
  navigation: any;
};

const MenuScreen = (props: Props) => {
  const dispatch = useDispatch();

  const menuStrings = {
    preferences: t`Preferences`,
    help: t`Help`,
    about: t`About`,
    version: t`App version`,
    terms: t`Terms and conditions`,
    privacy: t`Privacy statement`,
    logout: t`Logout`,
    //   preferences: 'Preferences',
    //   help: 'Help',
    //   about: 'About',
    //   version: 'App version',
    //   terms: 'Terms and conditions',
    //   privacy: 'Privacy statement',
    //   logout: 'Logout',
  };

  /**
   * Create instance of Menu Item
   * @param name name to display on Menu Screen
   * @param path path to navigate to onPressing the item
   */
  const createMenuItem = (
    // name: MessageDescriptor,
    name: any,
    path: () => void
  ): MenuItemObject => {
    return { name, path };
  };

  const navigateTo = (key: string) => () => props.navigation.navigate(key);

  const menuItems: Array<MenuItemObject> = [
    createMenuItem(menuStrings.preferences, navigateTo('Preferences')),
    createMenuItem(menuStrings.help, navigateTo('Help')),
    createMenuItem(menuStrings.about, navigateTo('About')),
    createMenuItem(menuStrings.terms, navigateTo('Terms')),
    createMenuItem(menuStrings.privacy, navigateTo('Privacy')),
    createMenuItem(menuStrings.version, navigateTo('Version')),
    createMenuItem(menuStrings.logout, () =>
      signOutAsync(props.navigation, dispatch)
    ),
  ];

  return (
    <View style={menuScreenStyles.view}>
      {menuItems.map((item: MenuItemObject, index: number) => (
        <MenuItem
        style={menuItemStyles.listItem}
        title={item.name}
        path={item.path}
        key={item[index]}
        />
      ))}
    </View>
  );
};

// export default withI18n()(MenuScreen);
export default MenuScreen;
