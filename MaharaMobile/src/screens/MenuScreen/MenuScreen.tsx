import {i18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {useDispatch} from 'react-redux';
import styles from '../../assets/styles/variables';
import MenuItem from '../../components/MenuItem/MenuItem';
import {signOutAsync} from '../../utils/authHelperFunctions';
import menuScreenStyles from './MenuScreen.style';

type MenuItem = {
  name: string;
  path: () => void;
};

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const MenuScreen = (props: Props) => {
  const dispatch = useDispatch();

  const menuStrings = {
    preferences: i18n._(t`Preferences`),
    legal: i18n._(t`Legal`),
    contact: i18n._(t`Contact us`),
    help: i18n._(t`Help`),
    version: i18n._(t`App version`),
    logout: i18n._(t`Logout`)
  };

  /**
   * Create instance of Menu Item
   * @param name nane to display on Menu Screen
   * @param path path to navigate to onPressing the item
   */
  const createMenuItem = (name: string, path: () => void): MenuItem => {
    return {name, path};
  };

  const nav = props.navigation;

  const menuItems: Array<MenuItem> = [
    createMenuItem(menuStrings.contact, () => nav.navigate('Contact')),
    createMenuItem(menuStrings.preferences, () => nav.navigate('Preferences')),
    createMenuItem(menuStrings.legal, () => nav.navigate('Legal')),
    createMenuItem(menuStrings.help, () => nav.navigate('Help')),
    createMenuItem(menuStrings.version, () => nav.navigate('Version')),
    createMenuItem(menuStrings.logout, () => signOutAsync(nav, dispatch))
  ];

  return (
    <View style={menuScreenStyles.view}>
      {menuItems.map(item => (
        <MenuItem key={item.name} title={item.name} path={item.path} />
      ))}
    </View>
  );
};

MenuScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light,
  headerTitle: i18n._(t`Menu`)
});

export default withI18n()(MenuScreen);
