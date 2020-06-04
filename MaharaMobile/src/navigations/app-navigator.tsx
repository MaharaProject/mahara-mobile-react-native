import {t} from '@lingui/macro';
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
import NavAddSVG from '../assets/images/nav-add';
import NavAddActiveSVG from '../assets/images/nav-add-active';
import NavMenuSVG from '../assets/images/nav-menu';
import NavMenuActiveSVG from '../assets/images/nav-menu-active';
import NavUploadSVG from '../assets/images/nav-upload';
import NavUploadActiveSVG from '../assets/images/nav-upload-active';
import styles from '../assets/styles/variables';
import i18n from '../i18n';
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

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

const AppNavigator = () => {
  const navigatorStrings = {
    PENDING: i18n._(t`Upload queue`),
    ADD: i18n._(t`Add`),
    PROFILE_ACCESSIBILITY_LABEL: i18n._(t`Profile page`),
    ADD_ACCESSIBILITY_LABEL: i18n._(t`Add an item`),
    PENDING_ACCESSIBILITY_LABEL: i18n._(t`Upload queue page`),
    PREFERENCES: i18n._(t`Preferences`),
    ABOUT: i18n._(t`About`),
    MENU: i18n._(t`Menu`),
    LEGAL: i18n._(t`Legal`),
    HELP: i18n._(t`Help`),
    VERSION: i18n._(t`Version`)
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
    About: {
      screen: AboutScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.ABOUT
      }
    },
    Preferences: {
      screen: PreferencesScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.PREFERENCES
      }
    },
    Legal: {
      screen: LegalScreen,
      navigationOptions: {
        headerTitle: navigatorStrings.LEGAL
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {headerTitle: navigatorStrings.HELP}
    },
    Version: {
      screen: VersionScreen,
      navigationOptions: {headerTitle: navigatorStrings.VERSION}
    }
  });

  const tabScreenConfig = {
    PendingScreen: {
      screen: PendingItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.PENDING,
        tabBarIcon: ({tintColor}) => {
          if (tintColor === styles.colors.tertiary) {
            return <NavUploadSVG />;
          }
          return <NavUploadActiveSVG />;
        },
        tabBarAccessibilityLabel: navigatorStrings.PENDING_ACCESSIBILITY_LABEL
      }
    },
    Add: {
      screen: AddItemsTabNavigator,
      navigationOptions: {
        tabBarLabel: navigatorStrings.ADD,
        tabBarIcon: ({tintColor}) => {
          if (tintColor === styles.colors.tertiary) {
            return <NavAddSVG />;
          }
          return <NavAddActiveSVG />;
        },
        tabBarAccessibilityLabel: navigatorStrings.ADD_ACCESSIBILITY_LABEL
      }
    },
    Menu: {
      screen: MenuTabNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          if (tintColor === styles.colors.tertiary) {
            return <NavMenuSVG />;
          }
          return <NavMenuActiveSVG />;
        },
        tabBarTestID: 'tabBar',
        tabBarAccessibilityLabel: navigatorStrings.MENU
      }
    }
  };

  const androidTabConfig = createMaterialBottomTabNavigator(tabScreenConfig, {
    initialRouteName: 'Add',
    activeColor: styles.colors.light,
    inactiveColor: styles.colors.tertiary,
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

export default AppNavigator;
