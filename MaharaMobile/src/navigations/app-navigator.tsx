import React, { Props } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
  faUser,
  faPlusCircle,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { I18n } from '@lingui/core';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SelectMediaScreen from '../screens/SelectMediaScreen/SelectMediaScreen';
import AddItemScreen from '../screens/AddItemScreen/AddItemScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import styles from '../assets/styles/variables';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen/ProfileSettingsScreen';

type Props = {
  i18n: I18n;
};

const AppNavigator = (props: Props) => {
  const navigatorStrings = {
    PROFILE_SETTINGS: props.i18n._(t`Profile Settings`),
    PENDING: props.i18n._(t`Pending`),
    ADD: props.i18n._(t`Add`)
  };

  const AddItemsTabNavigator = createStackNavigator({
    Add: SelectMediaScreen,
    AddItem: AddItemScreen,
    ProfileSettings: ProfileSettingsScreen
  });

  const PendingItemsTabNavigator = createStackNavigator({
    Pending: PendingScreen
  });

  const tabScreenConfig = {
    Add: {
      screen: AddItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.ADD,
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faPlusCircle} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Add item to Mahara'
      }
    },
    PendingScreen: {
      screen: PendingItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.PENDING,
        tabBarIcon: () => (
          <FontAwesomeIcon icon={faHistory} color={styles.colors.light} />
        ),
        tabBarAccessibilityLabel: 'Pending uploads page'
      }
    }
  };

  const androidTabConfig = createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: styles.colors.light,
    barStyle: {
      backgroundColor: styles.colors.secondary
    }
  });

  const iOSTabConfig = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeBackgroundColor: styles.colors.secondary,
      activeTintColor: styles.colors.light
    }
  });

  const AppTabNavigator = Platform.OS === 'android' ? androidTabConfig : iOSTabConfig;
  // Navigator with only Authentication screens
  const AuthNavigator = createStackNavigator({
    SiteCheck: SiteCheckScreen,
    Login: LoginScreen
  });

  // Main navigator, with route to AppNavigator once authenticated
  const SwitchNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthNavigator,
      App: AppTabNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  );

  const DrawerNavigator = createDrawerNavigator({
    MaharaMobile: SwitchNavigator,
    ProfileSettings: {
      screen: ProfileSettingsScreen,
      navigationOptions: {
        drawerLabel: 'Profile Settings',
        drawerIcon: ({tintColor}) => <FontAwesome5 name="user" size={20} />
      }
    },
    Add: {
      navigationOptions: {
        drawerLabel: 'Add Item'
      },
      screen: AddItemsTabNavigator
    },
    Pending: PendingItemsTabNavigator
  });

  const Navigation = createAppContainer(DrawerNavigator);

  return <Navigation />;
};

export default withI18n()(AppNavigator);
