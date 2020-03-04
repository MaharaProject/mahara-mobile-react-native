import {
  faBars,
  faHistory,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React from 'react';
import {Platform} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import styles from '../assets/styles/variables';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import AddItemScreen from '../screens/AddItemScreen/AddItemScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import EditItemScreen from '../screens/EditItemScreen/EditItemScreen';
import HelpScreen from '../screens/HelpScreen/HelpScreen';
import LegalScreen from '../screens/LegalScreen/LegalScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';
import PendingScreen from '../screens/PendingScreen/PendingScreen';
import PreferencesScreen from '../screens/PreferencesScreen/PreferencesScreen';
import SelectMediaScreen from '../screens/SelectMediaScreen/SelectMediaScreen';
import SiteCheckScreen from '../screens/SiteCheckScreen/SiteCheckScreen';
import VersionScreen from '../screens/VersionScreen/VersionScreen';

import NavUploadSVG from '../assets/images/nav-upload';
import NavUploadActiveSVG from '../assets/images/nav-upload-active';
import NavAddSVG from '../assets/images/nav-add';
import NavAddActiveSVG from '../assets/images/nav-add-active';
import NavMenuSVG from '../assets/images/nav-menu';
import NavMenuActiveSVG from '../assets/images/nav-menu-active';

type Props = {
  i18n: I18n;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const AppNavigator = (props: Props) => {
  const navigatorStrings = {
    PROFILE: props.i18n._(t`Profile`),
    PENDING: props.i18n._(t`Upload queue`),
    ADD: props.i18n._(t`Add`),
    PROFILE_ACCESSIBILITY_LABEL: props.i18n._(t`Profile page`),
    ADD_ACCESSIBILITY_LABEL: props.i18n._(t`Add an item`),
    PENDING_ACCESSIBILITY_LABEL: props.i18n._(t`Upload queue page`),
    PREFERENCES: props.i18n._(t`Preferences`),
    ABOUT: props.i18n._(t`About`),
    MENU: props.i18n._(t`Menu`)
  };

  // Home page navigator, all other pages get attached to this  navigation stack.
  const AddItemsTabNavigator = createStackNavigator({
    Add: {
      screen: SelectMediaScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.ADD
      }
    },
    AddItem: AddItemScreen
  });

  const PendingItemsTabNavigator = createStackNavigator({
    Pending: {
      screen: PendingScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.PENDING
      }
    },
    EditItem: {
      screen: EditItemScreen
    }
  });

  const MenuTabNavigator = createStackNavigator({
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.MENU
      }
    },
    About: AboutScreen,
    Preferences: PreferencesScreen,
    Legal: LegalScreen,
    Help: HelpScreen,
    Version: VersionScreen
  });

  const tabScreenConfig = {
    PendingScreen: {
      screen: PendingItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.PENDING,
        tabBarIcon: ({tintColor}) => (
          <NavUploadSVG />
        ),
        tabBarAccessibilityLabel: navigatorStrings.PENDING_ACCESSIBILITY_LABEL
      }
    },
    Add: {
      screen: AddItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.ADD,
        tabBarIcon: ({tintColor}) => (
          <NavAddSVG />
        ),
        tabBarAccessibilityLabel: navigatorStrings.ADD_ACCESSIBILITY_LABEL
      }
    },
    Menu: {
      screen: MenuTabNavigator,
      navigationOptions: {
        tabBarIcon: () => (
          <NavMenuSVG />
        ),
        tabBarTestID: 'tabBar',
        tabBarAccessibilityLabel: navigatorStrings.MENU
      }
    }
  };

  const androidTabConfig = createMaterialBottomTabNavigator(tabScreenConfig, {
    initialRouteName: 'Add',
    activeColor: styles.colors.light,
    inactiveColor: '#3e2465',
    labeled: false,
    barStyle: {
      backgroundColor: styles.colors.light2
    }
  });

  const iOSTabConfig = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeBackgroundColor: styles.colors.secondary,
      activeTintColor: styles.colors.light
    }
  });

  const AppTabNavigator =
    Platform.OS === 'android' ? androidTabConfig : iOSTabConfig;
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

  const Navigation = createAppContainer(SwitchNavigator);

  return <Navigation />;
};

export default withI18n()(AppNavigator);
