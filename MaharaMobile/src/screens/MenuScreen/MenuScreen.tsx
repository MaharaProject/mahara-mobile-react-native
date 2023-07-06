import React from 'react';
import { t } from '@lingui/macro';
import { ScrollView } from 'native-base';
import { useDispatch } from 'react-redux';
import MenuItem from 'components/MenuItem/MenuItem';
import menuItemStyles from 'components/MenuItem/MenuItem.style';
import { signOutAsync } from 'utils/authHelperFunctions';
import menuScreenStyles from './MenuScreen.style';

type MenuItemObject = {
  name: string;
  path: () => void;
};

type Props = {
  navigation: any;
};

function MenuScreen(props: Props) {
  const dispatch = useDispatch();

  const menuStrings = {
    preferences: t`Preferences`,
    help: t`Help`,
    about: t`About`,
    version: t`App version`,
    terms: t`Terms and conditions`,
    privacy: t`Privacy statement`,
    logout: t`Logout`,
    login: t`Login`
  };

  /**
   * Create instance of Menu Item
   * @param name name to display on Menu Screen
   * @param path path to navigate to onPressing the item
   */
  const createMenuItem = (name: string, path: () => void): MenuItemObject => ({ name, path });

  const navigateTo = (key: string) => () => props.navigation.navigate(key);

  const menuItems: Array<MenuItemObject> = [
    createMenuItem(menuStrings.preferences, navigateTo('Preferences')),
    createMenuItem(menuStrings.help, navigateTo('Help')),
    createMenuItem(menuStrings.about, navigateTo('About')),
    createMenuItem(menuStrings.terms, navigateTo('Terms')),
    createMenuItem(menuStrings.privacy, navigateTo('Privacy')),
    createMenuItem(menuStrings.version, navigateTo('Version')),
    createMenuItem(menuStrings.logout, () => signOutAsync(dispatch))
  ];

  return (
    <ScrollView style={menuScreenStyles.view}>
      {menuItems.map((item: MenuItemObject) => (
        <MenuItem
          style={menuItemStyles.listItem}
          title={item.name}
          path={item.path}
          key={item.name}
        />
      ))}
    </ScrollView>
  );
}

export default MenuScreen;
