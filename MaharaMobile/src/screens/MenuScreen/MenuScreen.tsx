import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {useDispatch} from 'react-redux';
import styles from '../../assets/styles/variables';
import MenuItem from '../../components/MenuItem/MenuItem';
import menuItemStyles from '../../components/MenuItem/MenuItem.style';
import HeaderMenuButton from '../../components/UI/HeaderMenuButton/HeaderMenuButton';
import i18n from '../../i18n';
import {MessageDescriptor} from '../../models/models';
import {signOutAsync} from '../../utils/authHelperFunctions';
import menuScreenStyles from './MenuScreen.style';

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
    preferences: t`Preferences`,
    help: t`Help`,
    about: t`About`,
    version: t`App version`,
    terms: t`Terms and conditions (unfinished)`, // TODO: REMOVE
    privacy: t`Privacy statement`,
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
    )
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
