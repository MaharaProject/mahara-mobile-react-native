import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {useDispatch} from 'react-redux';
import styles from '../../assets/styles/variables';
import MenuItem from '../../components/MenuItem/MenuItem';
import HeaderMenuButton from '../../components/UI/HeaderMenuButton/HeaderMenuButton';
import {signOutAsync} from '../../utils/authHelperFunctions';
import menuScreenStyles from './MenuScreen.style';
import {MessageDescriptor} from '../../models/models';
import menuItemStyles from '../../components/MenuItem/MenuItem.style';

type MenuItemObject = {
  name: MessageDescriptor;
  path: () => void;
};

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const MenuScreen = (props: Props) => {
  const dispatch = useDispatch();

  const menuStrings = {
    about: t`About`,
    preferences: t`Preferences`,
    legal: t`Legal`,
    help: t`Help`,
    version: t`App version`,
    logout: t`Logout`
  };

  /**
   * Create instance of Menu Item
   * @param name name to display on Menu Screen
   * @param path path to navigate to onPressing the item
   */
  const createMenuItem = (
    name: MessageDescriptor,
    path: () => void
  ): MenuItemObject => {
    return {name, path};
  };

  const nav = props.navigation;

  const menuItems: Array<MenuItemObject> = [
    createMenuItem(menuStrings.preferences, () => nav.navigate('Preferences')),
    createMenuItem(menuStrings.legal, () => nav.navigate('Legal')),
    createMenuItem(menuStrings.about, () => nav.navigate('About')),
    createMenuItem(menuStrings.help, () => nav.navigate('Help')),
    createMenuItem(menuStrings.version, () => nav.navigate('Version')),
    createMenuItem(menuStrings.logout, () => signOutAsync(nav, dispatch))
  ];

  return (
    <View style={menuScreenStyles.view}>
      {menuItems.map((item: MenuItemObject) => (
        <MenuItem
          style={menuItemStyles.listItem}
          title={item.name}
          path={item.path}
          key={item.name.id}
        />
      ))}
    </View>
  );
};

MenuScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`Menu`),
  headerLeft: <HeaderMenuButton />
});

export default withI18n()(MenuScreen);
